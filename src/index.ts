import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import { OAuth2Client } from "google-auth-library";

import { google } from "googleapis";

type CredentialsType = {
  client_id: string,
  client_secret: string,
  refresh_token: string,
  redirect_uri: string,
  token_uri: string
}

const credentials: CredentialsType = {
  client_id: process.env.CLIENT_ID || "",
  client_secret: process.env.CLIENT_SECRET || "",
  refresh_token: process.env.REFRESH_TOKEN || "",
  redirect_uri: process.env.REDIRECT_URI || "",
  token_uri: process.env.TOKEN_URI || ""
}

// function authorize({ clientId, clientSecret, refreshToken, redirectUri }: credentialsType): OAuth2Client {
//   const oAuth2Client = new google.auth.OAuth2({ clientId, clientSecret, redirectUri });
//   oAuth2Client.setCredentials({ refresh_token: refreshToken });

//   return oAuth2Client;
// }