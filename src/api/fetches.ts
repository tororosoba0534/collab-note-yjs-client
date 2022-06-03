import config from "../config";
import { renderError } from "../utils/errorHandlings";

type ResJSON = any;
const baseFetch = async (route: string, reqJSON: any): Promise<ResJSON> => {
  let realRoute = route;
  if (realRoute[0] !== "/") {
    realRoute = "/" + realRoute;
  }
  try {
    const data = await fetch(config.server.ORIGIN + realRoute, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqJSON),
    }).then((response) => response.json());

    return data;
  } catch (e) {
    renderError(e);
    return {};
  }
};

type ResCheckAuth = {
  username: string;
};
export const fetchCheckAuth = async (
  sessionID: string
): Promise<ResCheckAuth> => {
  const route = "/personal/check-auth";

  const { username } = await baseFetch(route, { sessionID });

  if (typeof username !== "string") {
    console.error("Invalid response type.");
    return { username: "" };
  }

  return { username };
};

type ResLogin = {
  sessionID: string;
};
export const fetchLogin = async (
  username: string,
  password: string
): Promise<ResLogin> => {
  const route = "/login";
  const { sessionID } = await baseFetch(route, { username, password });

  if (typeof sessionID !== "string") {
    console.error("Invalid response type");
    return { sessionID: "" };
  }

  return { sessionID };
};

type ResLogout = {
  logoutStatus: boolean;
};
export const fetchLogout = async (sessionID: string): Promise<ResLogout> => {
  const { logoutStatus } = await baseFetch("/personal/logout", { sessionID });

  if (typeof logoutStatus !== "boolean") {
    console.error("Invalid response type");
    return { logoutStatus: false };
  }

  return { logoutStatus };
};

type ResRegister = {
  registerStatus: boolean;
};
export const fetchRegister = async (
  username: string,
  password: string
): Promise<ResRegister> => {
  const { registerStatus } = await baseFetch("/register", {
    username,
    password,
  });

  if (typeof registerStatus !== "boolean") {
    console.error("Invalid response type");
    return { registerStatus: false };
  }

  return { registerStatus };
};

type ResCheckUsername = {
  isValidName: boolean;
};
export const fetchCheckUsername = async (
  username: string
): Promise<ResCheckUsername> => {
  const { isValidName } = await baseFetch("/check-username", { username });

  if (typeof isValidName !== "boolean") {
    console.error("Invalid response type");
    return { isValidName: false };
  }

  return { isValidName };
};

type ResDeleteAccount = {
  deleteAccountStatus: boolean;
};
export const fetchDeleteAccount = async (
  sessionID: string
): Promise<ResDeleteAccount> => {
  const { deleteAccountStatus } = await baseFetch("/personal/delete-account", {
    sessionID,
  });

  if (typeof deleteAccountStatus !== "boolean") {
    console.error("Invalid response type");
    return { deleteAccountStatus: false };
  }

  return { deleteAccountStatus };
};

type ResChangeUsername = {
  newSessionID: string;
};
export const changeUsername = async (
  sessionID: string,
  newUsername: string
): Promise<ResChangeUsername> => {
  const { newSessionID } = await baseFetch("/personal/change-username", {
    sessionID,
    newUsername,
  });

  if (typeof newSessionID !== "string") {
    console.error("Invalid response type");
    return { newSessionID: "" };
  }

  return { newSessionID };
};

type ResChangePassword = {
  newSessionID: string;
};
export const changePassword = async (
  sessionID: string,
  newPassword: string
): Promise<ResChangePassword> => {
  const { newSessionID } = await baseFetch("/personal/change-password", {
    sessionID,
    newPassword,
  });

  if (typeof newSessionID !== "string") {
    console.error("Invalid response type");
    return { newSessionID: "" };
  }

  return { newSessionID };
};
