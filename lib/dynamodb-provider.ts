import { RemovalPolicy } from "aws-cdk-lib";
import { EnableScalingProps } from "aws-cdk-lib/aws-applicationautoscaling";
import { AttributeType, Table, TableProps } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class DynamoDbProvider extends Construct {

  public readonly table: Table;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const dynamoTableProps: TableProps = {
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING
      },
      removalPolicy: RemovalPolicy.DESTROY,
      readCapacity: 1,
      writeCapacity: 1
    }

    const dynamoTable = new Table(this, 'uuid', dynamoTableProps)

    this.table = dynamoTable
  }
}