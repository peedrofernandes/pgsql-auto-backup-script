import { OAuth2Client } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import fs from "fs";
import path from "path";

async function uploadFile(drive: drive_v3.Drive, filePath: string, parentId: string) {
  try {
    const res = await drive.files.create({
      media: {
        mimeType: "text/plain",
        body: fs.createReadStream(filePath)
      },
      requestBody: {
        name: path.basename(filePath),
        originalFilename: path.basename(filePath),
        parents: [parentId]
      }
    });

    console.log(`File ${res.data.name}, of the type ${res.data.mimeType} succesfully uploaded to Google Drive at the folder ${parentId}`);

  } catch (error) {
    console.error(`It was not possible to upload a file to drive! ${error}`);
  }
}

export default uploadFile;