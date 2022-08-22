import { OAuth2Client } from "google-auth-library";
import { drive_v3 } from "googleapis";

async function listFiles(drive: drive_v3.Drive, parentId: string) {
  try {
    const response = await drive.files.list({
      q: `"${parentId}" in parents`,
      orderBy: "name",
      spaces: "drive"
    });

    return response.data.files;
  } catch (error) {
    console.error(`It was not possible to list the files from Google Drive! ${error}`);
  }
}

export default listFiles;