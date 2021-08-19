import * as cdk from '@aws-cdk/core';
import { SecurityGroup, Volume, Vpc } from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_pats from '@aws-cdk/aws-ecs-patterns';
import * as ssm from '@aws-cdk/aws-ssm';

// Auto imports.
import { CfnParameter } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from '@aws-cdk/aws-iam/node_modules/@aws-cdk/core';
import { ApplicationLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Cluster, Ec2Service } from '@aws-cdk/aws-ecs';

export class LeafAppLegacyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Build out the variables going to be used
    const target_env = new CfnParameter(this, 'target-env', {
      type: 'String',
      description: "This is the environment being put into: dev, ca, prod.",
      default: 'dev',
      allowedValues: ['dev', 'ca', 'prod'],
    });
    
    const uploadBucketName = new CfnParameter(this, "uploadBucketName", {
      type: "String",
      description: "The name of the Amazon S3 bucket where uploaded files will be stored."});
    console.log("buket: " + uploadBucketName.valueAsString);

    
    const secretValue = ssm.StringParameter.fromSecureStringParameterAttributes(this, 'db_password', {
      parameterName: '/leaf/prod/db_password',
      version: 1,
    });


    // Build out the AWS handles for objects already existing in AWS
    const vpc = Vpc.fromLookup(this, 'VPC', {
      vpcId: 'vpc-01e40fef11877573b'
    })

    const leaf_initial_image = ecs.ContainerImage.fromEcrRepository(
      Repository.fromRepositoryName(this, 'leaf-monolith-img', 'leaf-monolith:latest')
    );

    const leaf_efs = efs.FileSystem.fromFileSystemAttributes(this, "efs", {
      fileSystemId: 'fs-e4e2bc50',
      securityGroup: SecurityGroup.fromLookup(this, 'efs_sg', 'sg-07a51951e24d3e21b'),
    });

    const leaf_efs_vol_config = {
      name: 'leaf_efs_vol', 
      efsVolumeConfiguration: {fileSystemId: leaf_efs.fileSystemId}
    }

    const leaf_efs_mounts = [
      {
        containerPath: '/vol/www/',
        sourceVolume: leaf_efs_vol_config.name,
        readOnly: 'false'
      }
    ];

    const leaf_alb = ApplicationLoadBalancer.fromLookup(this, 'yubyub', {
      loadBalancerArn: 'arn:aws:elasticloadbalancing:us-east-1:456456143286:loadbalancer/app/leaf-prod/afbec84a890a572e'
    });

    //  Create the LEAF ECS 

    // Cluster
    const leaf_cluster = new ecs.Cluster(this, 'leaf_cluster', {
      vpc: vpc,
      clusterName: 'project-leaf-' + target_env.valueAsString + '-cluster'
    });

    // Task Creation(s)
    const app_task = new ecs.FargateTaskDefinition(this, 'app-task-def', {
      memoryLimitMiB: 512,
      cpu: 256,
      volumes: [leaf_efs_vol_config]
    });

    const app_container = app_task.addContainer('leaf-app-leg', {
      image: leaf_initial_image,
      memoryLimitMiB: 256,
      cpu: 512,
      
    });

    app_container.addPortMappings({
      containerPort: 80,
      hostPort: 80,
      protocol: ecs.Protocol.TCP
    });


    // Service(s) creation
    const app_service = new ecs.FargateService(this, 'leaf-mit-efs', {
      serviceName: 'leaf-mit-efs',
      cluster: leaf_cluster,
      taskDefinition: app_task,
      desiredCount: 1,
      maxHealthyPercent: 200,
      minHealthyPercent: 100,
      assignPublicIp: false,
      healthCheckGracePeriod: Duration.seconds(90),
    });


  }
}
