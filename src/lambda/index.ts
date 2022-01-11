import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';


const TABLE_NAME = process.env.TABLE_NAME || '';

const db = new DynamoDB.DocumentClient();

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  const uuid = uuidv4();

  const params = {
    TableName: TABLE_NAME,
    Item: {
      id: uuid
    }
  };

  try {
    await db.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ uuid: uuid })
    }
  } catch(dbError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An unexpected error occurred while trying to save uuid in dynamo" })
    }
  }
  
}