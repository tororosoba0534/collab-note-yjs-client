import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsChangePassword = 200 | 400 | 401 | 403 | 409 | 500;
export type ReturnChangePassword = ReturnBaseFetch<NumsChangePassword>;
export const fetchChangePassword = async (
  sessionID: string,
  newPassword: string,
  adminPassword: string
): Promise<ReturnChangePassword> => {
  const { status } = await baseFetch("/personal/change-password", {
    sessionID,
    newPassword,
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
