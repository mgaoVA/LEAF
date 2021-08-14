// Manual imports
import * as cdk from '@aws-cdk/core';
import { Volume, Vpc } from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_pats from '@aws-cdk/aws-ecs-patterns';

// Auto imports.
import { CfnParameter } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from '@aws-cdk/aws-iam/node_modules/@aws-cdk/core';
import { ApplicationLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';

export class LeafAncilStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // let target_vpc = 'leaf-vpc';

    const target_vpc = new CfnParameter(this, 'target-vpc', {
      type: 'String',
      description: "This is the vpc that the all items should be created in.",
      default: 'leaf-vpc'
    });

    const target_env = new CfnParameter(this, 'target-env', {
      type: 'String',
      description: "This is the environment being put into: dev, ca, prod.",
      default: 'dev',
      allowedValues: ['dev', 'ca', 'prod'],
    });

    // const vpc = Vpc.fromLookup(this, 'external-vpc', {
    //   vpcName: target_vpc.valueAsString,
    // });    

    const vpc = Vpc.fromLookup(this, 'VPC', {
      vpcId: 'vpc-01e40fef11877573b'
    })

    const leaf_base_image = ecs.ContainerImage.fromEcrRepository(
      Repository.fromRepositoryName(this, 'leaf-monolith', 'leaf-monolith')
    );

    const leaf_efs = new efs.FileSystem(this, 'leaf_filesystem', {
      fileSystemName: 'project-leaf-' + target_env.valueAsString +'-legacy-efs',
      vpc: vpc,
      enableAutomaticBackups: false,
      encrypted: true,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,      
    });

    const leaf_cluster = new ecs.Cluster(this, 'leaf_cluster', {
      vpc: vpc,
      clusterName: 'project-leaf-' + target_env.valueAsString + '-cluster'
    });

    new ecs_pats.ApplicationLoadBalancedFargateService(this, 'leaf-fargate', {
      serviceName: 'leaf-mit-efs',
      cluster: leaf_cluster,
      cpu: 512,
      desiredCount: 1,
      memoryLimitMiB: 512,
      loadBalancer: ApplicationLoadBalancer.fromLookup(this, 'yubyub', {
        loadBalancerArn: 'arn:aws:elasticloadbalancing:us-east-1:456456143286:loadbalancer/app/leaf-prod/afbec84a890a572e'
      }) ,
      loadBalancerName: 'leaf-' + target_env.valueAsString,
      taskImageOptions: {
        image: leaf_base_image,
        containerPort: 443,        
      },
      healthCheckGracePeriod: Duration.seconds(90),
      maxHealthyPercent: 200,
      minHealthyPercent: 100,
      openListener: true,
      listenerPort: 443

    });
    
  }
}