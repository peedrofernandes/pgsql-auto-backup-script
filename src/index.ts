import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";

import { google } from "googleapis";
import { CredentialsType } from "./types";
import { getAccessToken } from "./handlers/getAccessToken";

const credentials: CredentialsType = {
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || "",
  refresh_token: process.env.REFRESH_TOKEN || "",
  redirect_uri: process.env.REDIRECT_URI || "",
  token_uri: process.env.TOKEN_URI || ""
}

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
  const { access_token } = refreshTokenResponse?.data;

  oAuth2Client.setCredentials({ access_token });

  return oAuth2Client;
}

