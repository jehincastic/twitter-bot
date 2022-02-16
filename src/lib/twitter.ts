import TwitterApi from "twitter-api-v2";

import {
  clientId,
  clientSecret,
  callBackUrl,
} from "../config";

// Initialize the Twitter API
const twitter = new TwitterApi({
  clientId,
  clientSecret,
});

// Generate the authorization URL
export const generateAuthUrl = () => {
  const {
    url,
    codeVerifier,
    state,
  } = twitter.generateOAuth2AuthLink(
    callBackUrl,
    {
      scope: [
        "tweet.read",
        "tweet.write",
        "users.read",
        "offline.access",
        "follows.read",
        "follows.write",
        "like.read",
        "like.write",
      ],
    },
  );
  return {
    url,
    codeVerifier,
    state,
  };
};

// Handler function for the OAuth2 callback
export const callBackHandler = async (
  code: string,
  codeVerifier: string,
) => {
  const {
    client: userClient,
    accessToken,
    refreshToken,
    expiresIn,
  } = await twitter.loginWithOAuth2({
    code,
    codeVerifier,
    redirectUri: callBackUrl,
  });
  return {
    client: userClient,
    accessToken,
    refreshToken,
    expiresIn,
  };
};

// Generate new access token from refresh token
export const refreshApiToken = async (refreshToken: string) => {
  const {
    client: userClient,
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn,
  } = await twitter.refreshOAuth2Token(refreshToken);
  return {
    client: userClient,
    accessToken,
    refreshToken: newRefreshToken,
    expiresIn,
  };
};
