import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsDeleteAccount = 200 | 401 | 403 | 500;
export type ReturnDeleteAccount = ReturnBaseFetch<NumsDeleteAccount>;
export const fetchDeleteAccount = async (
  sessionID: string,
  adminPassword: string
): Promise<ReturnDeleteAccount> => {
  const { status } = await baseFetch("/personal/delete-account", {
    sessionID,
    adminPassword,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 401 && status !== 403 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
