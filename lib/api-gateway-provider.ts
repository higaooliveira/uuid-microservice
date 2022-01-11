
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Function } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";

export class ApiGatewayProvider extends Construct {
  constructor(scope: Construct, id: string, lambdaFunction: Function) {
    super(scope, id);

    const functionName = "uuid-microservice";
    
    const apiIntegration = new LambdaIntegration(lambdaFunction, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    })

    const api = new RestApi(this, `${functionName}-api`, {
      restApiName: `${functionName}-api`,
      description: "This api calls lambda function"
    });

    api.root.addMethod("GET", apiIntegration)
  }
}