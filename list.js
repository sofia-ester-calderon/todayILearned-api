import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    IndexName: "blogDate-index",
    KeyConditionExpression: "blogDate = :blogDate",

    ExpressionAttributeValues: {
      ":blogDate": "2021-01-01",
    },
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
