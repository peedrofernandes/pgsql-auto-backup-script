import type { CredentialsType } from "../types";
import axios from "axios";

export async function getAccessToken(credentials: CredentialsType) {
  const {
    client_id,
    client_secret,
    refresh_token,
    redirect_uri,
    token_uri
  } = credentials;

  try {
    if (
      client_id === ""
      || client_secret === ""
      || refresh_token === ""
      || redirect_uri === ""
      || token_uri === ""
    ) {
      throw new Error("One or more credentials are not available!");
    }

    const response = await axios.post(token_uri, {
      client_id,
      client_secret,
      grant_type: "refresh_token",
      refresh_token,
      redirect_uri
    });

    return response;
  } catch (error) {
    console.error(`It was not possible to get the access token using the refresh token! ${error}`);
  }
}

