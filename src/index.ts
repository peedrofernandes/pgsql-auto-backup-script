import dotenv from "dotenv";
dotenv.config();
import { CredentialsType } from "./auth/types";
import uploadFile from "./gdrive/uploadFile";
import authorize from "./auth/authorize";
import path from "path";

async function main() {
  const credentials: CredentialsType = {
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    refresh_token: process.env.REFRESH_TOKEN || "",
    redirect_uri: process.env.REDIRECT_URI || "",
    token_uri: process.env.TOKEN_URI || ""
  }

  const auth = await authorize(credentials);

  const filePath = path.join(__dirname, "..", "backups", "newFile.txt");

  uploadFile(auth, filePath, process.env.PARENT_FOLDER_ID || "");
}

main();
