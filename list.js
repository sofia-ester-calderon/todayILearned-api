import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  let startKey = null;
  if (event.queryStringParameters && event.queryStringParameters.lastKey) {
    startKey = { blogId: event.queryStringParameters.lastKey };
  }

  const params = {
    TableName: process.env.tableName,
    Limit: 2,
    ExclusiveStartKey: startKey,
  };

  console.log("Scanning Candidate table.");
  const onScan = (err, data) => {
    if (err) {
      return err;
    } else {
      console.log("items found", data.Items);
      console.log(data.LastEvaluatedKey);
      return {
        statusCode: 200,
        body: JSON.stringify({
          candidates: data.Items,
        }),
      };
    }
  };
  const result = await dynamoDb.scan(params, onScan);
  return result.Items;

  // const params = {
  //   TableName: process.env.tableName,
  //   IndexName: "blogDate-index",
  //   KeyConditionExpression: "blogDate = :blogDate",

  //   ExpressionAttributeValues: {
  //     ":blogDate": "2021-01-01",
  //   },
  // };

  // const result = await dynamoDb.query(params);

  // return result.Items;
});
