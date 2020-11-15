import { generateResponse } from "./utils";
import { S3 } from "aws-sdk";

const region = "us-east-1";
const bucket = "rssschool-node-import-service-s3";
const uploadFolder = "uploaded";
const getFileUploadPath = (name) => `${uploadFolder}/${name}`;

export const importProductsFile = async (event) => {
  const fileName = event.queryStringParameters.name;

  const params = {
    Bucket: bucket,
    Key: getFileUploadPath(fileName),
    Expires: 60,
    ContentType: "text/csv",
  };

  if (!fileName) {
    return generateResponse({
      code: 400,
      body: {
        message: "Invalid file name",
      },
    });
  }

  try {
    const s3 = new S3({ region });
    const url = await s3.getSignedUrlPromise("putObject", params);

    return withCorsHeaders({
      statusCode: 200,
      body: url,
    });
  } catch (err) {
    return withCorsHeaders({
      statusCode: 500,
      body: { error: "Something went wrong: cannot create signed url" }
    });
  }
};
