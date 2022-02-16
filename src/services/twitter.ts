import { generateFastifyError } from "../utils";
import { CallBackResponse, AccountType } from "../types";
import { callBackHandler } from "../lib/twitter";

export const handleCallback = async (
  code: string,
  codeVerifier: string,
): Promise<CallBackResponse["data"]> => {
  const {
    accessToken,
    client,
    expiresIn,
    refreshToken,
  } = await callBackHandler(code, codeVerifier);
  const { data: userInfo, errors } = await client.currentUserV2();
  if (errors && errors.length > 0) {
    throw generateFastifyError(500, errors[0].title, "SOMETHING_WENT_WRONG");
  }
  const user: AccountType = {
    id: userInfo.id,
    refreshToken,
    accessToken,
    expiresIn,
  };
  // eslint-disable-next-line no-console
  console.log(user);
  return {
    username: userInfo.username,
    image: userInfo.profile_image_url,
    name: userInfo.name,
  };
};
