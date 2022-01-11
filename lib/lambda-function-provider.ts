import { Construct } from "constructs";
import { Code, Function, FunctionProps, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from "path";


export class LambdaFunctionProvider extends Construct {
  public readonly lambdaFunction: Function;

  constructor(scope: Construct, id: string, dynamoTable: string) {
    super(scope, id);

    const functionName = "uuid-microservice";
    const functionProps: NodejsFunctionProps = {
      runtime: Runtime.NODEJS_14_X,
      entry: join(__dirname, '../src/lambda', '/index.ts'),
      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },
      environment: {
        TABLE_NAME: dynamoTable
      },
    }
    this.lambdaFunction = new NodejsFunction(this, functionName, functionProps);
  }
}