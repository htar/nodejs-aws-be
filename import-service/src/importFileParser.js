
import { S3 } from "aws-sdk";
import { generateResponse } from "./utils";
import { REGION, BUCKET_NAME, UPLOAD_FOLDER_NAME, PARSED_FOLDER_NAME } from "./config";

export const importFileParser = async (event) => {
    console.log("event log", event);
    try {
        const { Records } = event;

        const s3 = new S3({
            region: REGION,
            signatureVersion: "v4",
        });

        for (const record of Records) {
            const { object } = record.s3;
            await s3
                .copyObject({
                    Bucket: BUCKET_NAME,
                    CopySource: `${BUCKET_NAME}/${object.key}`,
                    Key: object.key.replace(UPLOAD_FOLDER_NAME, PARSED_FOLDER_NAME),
                })
                .promise();

            await s3
                .deleteObject({
                    Bucket: BUCKET_NAME,
                    Key: object.key,
                })
                .promise();
        }

				return generateResponse({
					statusCode: 202,
					body: {"message": "Created"},
				});
    } catch (error) {
        return generateResponse({
            statusCode: 500,
            body: {
                error: "Something went wrong: Internal server error.",
            },
        });
    }
};