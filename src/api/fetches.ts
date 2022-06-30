import { baseFetch, isThrownErr, ReturnBaseFetch } from "./base";

export type NumsCheckAuth = 200 | 401 | 500;
export type ReturnCheckAuth = ReturnBaseFetch<NumsCheckAuth> & {
  userID: string;
};
export const fetchCheckAuth = async (
  sessionID: string
): Promise<ReturnCheckAuth> => {
  const route = "/personal/check-auth";

  const { status, resJSON } = await baseFetch(route, { sessionID });

  if (isThrownErr(status)) return { status, userID: "" };

  if (!resJSON) {
    return {
      status: `Response JSON is nullable`,
      userID: "",
    };
  }

  const userID = resJSON.userID;

  if (typeof userID !== "string")
    return {
      status: `Invalid response type: "${typeof userID}"`,
      userID: "",
    };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
      userID: "",
    };

  return { userID, status };
};

export type NumsLogin = 200 | 400 | 401 | 500;
export type ReturnLogin = ReturnBaseFetch<NumsLogin>;
export const fetchLogin = async (
  userID: string,
  password: string
): Promise<
  ReturnLogin & {
    sessionID: string;
  }
> => {
  const route = "/login";
  const { status, resJSON } = await baseFetch(route, {
    userID,
    password,
  });

  if (isThrownErr(status)) return { status, sessionID: "" };

  if (!resJSON) {
    return {
      status: `Response JSON is nullable`,
      sessionID: "",
    };
  }

  const sessionID = resJSON.sessionID;

  if (typeof sessionID !== "string")
    return {
      status: `Invalid response type: "${typeof sessionID}"`,
      sessionID: "",
    };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
      sessionID: "",
    };

  return { sessionID, status };
};

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

export type NumsCreateAccount = 200 | 400 | 403 | 500;
export type ReturnCreateAccount = ReturnBaseFetch<NumsCreateAccount>;
export const fetchCreateAccount = async (
  userID: string,
  password: string
): Promise<ReturnCreateAccount> => {
  const { status } = await baseFetch("/create-account", {
    userID,
    password,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 403 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};

export type NumsCheckUserID = 200 | 400 | 403 | 500;
export type ReturnCheckUserID = ReturnBaseFetch<NumsCheckUserID>;
export const fetchCheckUserID = async (
  userID: string
): Promise<ReturnCheckUserID> => {
  const { status } = await baseFetch("/check-userid", {
    userID,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 403 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};

export type NumsDeleteAccount = 200 | 401 | 500;
export type ReturnDeleteAccount = ReturnBaseFetch<NumsDeleteAccount>;
export const fetchDeleteAccount = async (
  sessionID: string
): Promise<ReturnDeleteAccount> => {
  const { status } = await baseFetch("/personal/delete-account", {
    sessionID,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};

export type NumsChangeUserID = 200 | 400 | 401 | 500;
export type ReturnChangeUserID = ReturnBaseFetch<NumsChangeUserID>;
export const fetchChangeUserID = async (
  sessionID: string,
  newUserID: string
): Promise<ReturnChangeUserID> => {
  const { status } = await baseFetch("/personal/change-userid", {
    sessionID,
    newUserID,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};

export type NumsChangePassword = 200 | 400 | 401 | 500;
export type ReturnChangePassword = ReturnBaseFetch<NumsChangePassword>;
export const fetchChangePassword = async (
  sessionID: string,
  newPassword: string
): Promise<ReturnChangePassword> => {
  const { status } = await baseFetch("/personal/change-password", {
    sessionID,
    newPassword,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
