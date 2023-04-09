import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Function, Code, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Table, AttributeType} from 'aws-cdk-lib/aws-dynamodb';
import { Schedule, Rule } from 'aws-cdk-lib/aws-events'
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import  {Construct} from 'constructs'
import * as ec2 from 'aws-cdk-lib/aws-ec2';



export class EventcdkStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const eventLambda = new Function(this, 'eventLambda8686', {
        runtime: Runtime.NODEJS_16_X, 
        code: Code.fromAsset('lambdas'), 
        handler: 'lambda.handler', 
    });

    const Vpc = ec2.Vpc.fromLookup(this, 'ImportVPC',{
        vpcId: "vpc-01460b36719a5fb1d",
        vpcName: "TMSBackendNetwork/TMSBackendVPC"
    });
    const schedule = new Rule(this, 'schedule', {
        schedule: Schedule.expression('cron(0 4 * * *)'),
    });

    schedule.addTarget(new LambdaFunction(eventLambda));

    }
}



