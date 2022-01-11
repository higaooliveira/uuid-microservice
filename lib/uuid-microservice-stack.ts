import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { ApiGatewayProvider } from './api-gateway-provider';
import { DynamoDbProvider } from './dynamodb-provider';
import { LambdaFunctionProvider } from './lambda-function-provider';

export class UuidMicroserviceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoTable = new DynamoDbProvider(this, "uuid").table;
    const lambdaFunction = new LambdaFunctionProvider(this, "lambda", dynamoTable.tableName).lambdaFunction;

    dynamoTable.grantReadWriteData(lambdaFunction);
    new ApiGatewayProvider(this, "api-gateway", lambdaFunction);

  }
}
