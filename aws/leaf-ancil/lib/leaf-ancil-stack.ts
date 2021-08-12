import * as cdk from '@aws-cdk/core';
import { Vpc } from '@aws-cdk/aws-ec2';
import * as efs from '@aws-cdk/aws-efs';

export class LeafAncilStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    let target_vpc = 'leaf-vpc';
    const vpc = Vpc.fromLookup(this, 'external-vpc', {
      vpcName: target_vpc,
    });

    const leaf_efs = new efs.FileSystem(this, 'leaf_filesystem', {
      fileSystemName: 'project-leaf-legacy-efs',
      vpc: vpc,
      enableAutomaticBackups: false,
      encrypted: true,
      lifecyclePolicy: efs.LifecyclePolicy.AFTER_14_DAYS,
      performanceMode: efs.PerformanceMode.GENERAL_PURPOSE,
      
    })
  }
}