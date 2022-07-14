import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsLogout = 200 | 401 | 500;
export type ReturnLogout = ReturnBaseFetch<NumsLogout>;
export const fetchLogout = async (sessionID: string): Promise<ReturnLogout> => {
  const { status } = await baseFetch("/personal/logout", {
    sessionID,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};

export type NumsCreateAccount = 200 | 400 | 409 | 500;
export type ReturnCreateAccount = ReturnBaseFetch<NumsCreateAccount>;
export const fetchCreateAccount = async (
  userID: string,
  password: string,
  adminPassword: string
): Promise<ReturnCreateAccount> => {
  const { status } = await baseFetch("/create-account", {
    userID,
    password,
    adminPassword,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 409 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
