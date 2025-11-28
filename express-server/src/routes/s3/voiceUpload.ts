import express from 'express'
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { S3 } from '../../utils/s3Client';
export const voiceUploadS3: express.Router = express.Router()

voiceUploadS3.post("/upload-voice-note", async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is Missing",
      });
    }
    const Key = `${userId}/voice-notes/${Date.now()}.webm`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
      ContentType: "audio/webm",
    });

    const preSignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360,
    });
    const bucket = process.env.S3_BUCKET_NAME!;
    const permanentUrl = `https://${bucket}.fly.storage.tigris.dev/${Key}`;

    return res.status(200).json({
      success: true,
      message: "Pre-signed URL generated successfully",
      permanentUrl,
      preSignedUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating the pre-signed URL",
    });
  }
});
