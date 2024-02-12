import { Endpoint, S3 } from "aws-sdk";
import fs from "fs";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const uploadFile = async (fileName: string, localFilePath: string) => {
  console.log("called");
  const fileContent = fs.readFileSync(localFilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: "backend-hosting-platform",
      Key: fileName,
    })
    .promise();
  console.log(response);
};
