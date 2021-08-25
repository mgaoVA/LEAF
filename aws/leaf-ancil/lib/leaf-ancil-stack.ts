// Manual imports
import * as cdk from '@aws-cdk/core';
import { Subnet, Volume, Vpc } from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ecs_pats from '@aws-cdk/aws-ecs-patterns';
import * as ssm from '@aws-cdk/aws-ssm';

// Auto imports.
import { CfnParameter } from '@aws-cdk/core';
import { Repository } from '@aws-cdk/aws-ecr';
import { Duration } from '@aws-cdk/aws-iam/node_modules/@aws-cdk/core';
import { ApplicationLoadBalancer } from '@aws-cdk/aws-elasticloadbalancingv2';
import { POINT_CONVERSION_HYBRID } from 'constants';

export class LeafAncilStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const uploadBucketName = new CfnParameter(this, "uploadBucketName", {
      type: "String",
      description: "The name of the Amazon S3 bucket where uploaded files will be stored."});
    console.log("buket: " + uploadBucketName.valueAsString);

    const target_env = "prod";

    // const vpc = Vpc.fromLookup(this, 'external-vpc', {
    //   vpcName: target_vpc.valueAsString,
    // });    

    const vpc = Vpc.fromLookup(this, 'VPC', {
      vpcId: 'vpc-01e40fef11877573b'
    })

    const leaf_efs = new efs.FileSystem(this, 'leaf_filesystem', {
      fileSystemName: 'project-leaf-' + target_env +'-legacy-efs',
      vpc: vpc,
      enableAutomaticBackups: false,
      encrypted: true,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE, 
    });

    leaf_efs.addAccessPoint('app-files', {
      path: '/leaf-app-files/', 
      // posixUser: {
      //   uid: 'www-data', 
      //   gid: 'www-data'
      // }
    });

    leaf_efs.addAccessPoint('sql', {
      path: '/leaf-sql/', 
      // posixUser: {
      //   uid: 'www-data', 
      //   gid: 'www-data'
      // }
    });

    leaf_efs.addAccessPoint('user-files', {
      path: '/leaf-user-files/', 
      // posixUser: {
      //   uid: 'www-data', 
      //   gid: 'www-data'
      // }
    });
    
    // const efs_accessPoints = new efs.AccessPoint(this, 'efs-acc-points', {
    //   path: '/leaf-app-files',
    //   posixUser: {
    //     uid: 'www-data',
    //     gid: 'www-data',
    //     permissions: '777'
    //   }
    // })
    
  }
}