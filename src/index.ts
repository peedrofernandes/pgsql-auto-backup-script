import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";

import { google } from "googleapis";
import { CredentialsType } from "./types";
import { getAccessToken } from "./handlers/getAccessToken";

async function authorize(credentials: CredentialsType): Promise<OAuth2Client> {
  const {
    client_id,
    client_secret,
    refresh_token,
    redirect_uri,
    token_uri
  } = credentials;

  const oAuth2Client = new google.auth.OAuth2({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: redirect_uri
  });

  const refreshTokenResponse = await getAccessToken(credentials);

  console.log(`Refresh token response: ${JSON.stringify(refreshTokenResponse?.data, null, 4)}`);
  const { access_token } = refreshTokenResponse?.data;

  oAuth2Client.setCredentials({ access_token });

  return oAuth2Client;
}

async function main() {
  const credentials: CredentialsType = {
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    refresh_token: process.env.REFRESH_TOKEN || "",
    redirect_uri: process.env.REDIRECT_URI || "",
    token_uri: process.env.TOKEN_URI || ""
  }

  const auth = await authorize(credentials);
}

main();
