import { generateResponse } from "./utils";
import { S3 } from "aws-sdk";
import { REGION, BUCKET, IMPORT_BUCKET_NAME, IMPORT_FILE_PREFIX } from "./config"

const getFileUploadPath = (name) => `${IMPORT_FILE_PREFIX}/${name}`;

export const importProductsFile = async (event) => {
  const fileName = event.queryStringParameters.name;

  const params = {
    Bucket: BUCKET,
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
    const s3 = new S3({ region: REGION });
    const url = await s3.getSignedUrlPromise("putObject", params);

    return withCorsHeaders({
      statusCode: 200,
      body: url,
    });
  } catch (err) {
    return withCorsHeaders({
      statusCode: 500,
      body: { error: "Something went wrong: cannot create signed url" },
    });
  }
};
