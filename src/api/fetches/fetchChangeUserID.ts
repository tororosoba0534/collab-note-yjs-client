import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsChangeUserID = 200 | 400 | 401 | 403 | 409 | 500;
export type ReturnChangeUserID = ReturnBaseFetch<NumsChangeUserID>;
export const fetchChangeUserID = async (
  sessionID: string,
  newUserID: string,
  adminPassword: string
): Promise<ReturnChangeUserID> => {
  const { status } = await baseFetch("/personal/change-userid", {
    sessionID,
    newUserID,
    adminPassword,
  });

  if (isThrownErr(status)) return { status };

  if (
    status !== 200 &&
    status !== 400 &&
    status !== 401 &&
    status !== 403 &&
    status !== 409 &&
    status !== 500
  )
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
