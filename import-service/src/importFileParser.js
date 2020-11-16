
import { S3 } from "aws-sdk";
import { generateResponse } from "./utils";
import { REGION, BUCKET_NAME, UPLOAD_FOLDER_NAME, PARSED_FOLDER_NAME } from "./config";
import csvParser from "csv-parser";

export const importFileParser = async (event) => {
	console.log("event log", event);
	try {
		const { Records } = event;

		const s3 = new S3({
			region: REGION
		});

		for (const record of Records) {
			const { object } = record.s3;

			const s3ReadStream = await s3.getObject({
				Bucket: BUCKET_NAME,
				Key: object.key,
			})
				.createReadStream();

			await new Promise(((resolve, reject) => {

				s3ReadStream.pipe(csvParser())
				.on("data", (data) => {
					console.log("Data:", data);
				})
				.on("end", async () => {
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

				resolve();
				})
				.on("error", (error) => reject(error));
			}));
				
		}

		return generateResponse({
			statusCode: 202,
			body: { "message": "Created" },
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