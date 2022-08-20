import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";

import { google } from "googleapis";

type credentialsType = {
  clientId: string,
  clientSecret: string,
  refreshToken: string,
  redirectUri: string
}

const credentials: credentialsType = {
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  refreshToken: process.env.REFRESH_TOKEN || "",
  redirectUri: process.env.REDIRECT_URI || ""
}

function authorize({ clientId, clientSecret, refreshToken, redirectUri }: credentialsType): OAuth2Client {
  const oAuth2Client = new google.auth.OAuth2({ clientId, clientSecret, redirectUri });
  oAuth2Client.setCredentials({ refresh_token: refreshToken });

  return oAuth2Client;
}
