import type { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import type { CredentialsType } from "./types";
import getAccessToken from "./getAccessToken";

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

export default authorize;