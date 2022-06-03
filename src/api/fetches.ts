import config from "../config";

export type Status = number;
type BaseResType = {
  status: Status;
};
type ResJSON = any;

const baseFetch = async (
  route: string,
  reqJSON: any
): Promise<BaseResType & { resJSON: ResJSON }> => {
  let realRoute = route;
  if (realRoute[0] !== "/") {
    realRoute = "/" + realRoute;
  }
  try {
    const { status, resJSON } = await fetch(config.server.ORIGIN + realRoute, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqJSON),
    }).then(async (response) => {
      const status = response.status;
      const resJSON = await response.json();
      return { status, resJSON };
    });

    return { status, resJSON };
  } catch (e) {
    throw e;
    // return { status: "clientError", resJSON: null, error: e };
  }
};

const throwIfTypeNot = (param: any, type: "string" | "boolean") => {
  if (typeof param !== type) {
    throw new Error(
      `Invalid response type: typeof username === "${typeof param}"`
    );
  }
};

type ResCheckAuth = BaseResType & {
  username: string;
};
export const fetchCheckAuth = async (
  sessionID: string
): Promise<ResCheckAuth> => {
  const route = "/personal/check-auth";

  const {
    status,
    resJSON: { username },
  } = await baseFetch(route, { sessionID });

  throwIfTypeNot(username, "string");

  return { username, status };
};

type ResLogin = BaseResType & {
  sessionID: string;
};
export const fetchLogin = async (
  username: string,
  password: string
): Promise<ResLogin> => {
  const route = "/login";
  const {
    status,
    resJSON: { sessionID },
  } = await baseFetch(route, { username, password });

  throwIfTypeNot(sessionID, "string");

  return { status, sessionID };
};

type ResLogout = BaseResType;
export const fetchLogout = async (sessionID: string): Promise<ResLogout> => {
  const { status } = await baseFetch("/personal/logout", { sessionID });

  return { status };
};

type ResCreateAccount = BaseResType;
export const fetchCreateAccount = async (
  username: string,
  password: string
): Promise<ResCreateAccount> => {
  const { status } = await baseFetch("/createAccount", {
    username,
    password,
  });

  return { status };
};

type ResCheckUsername = BaseResType;
export const fetchCheckUsername = async (
  username: string
): Promise<ResCheckUsername> => {
  const { status } = await baseFetch("/check-username", { username });

  return { status };
};

type ResDeleteAccount = BaseResType;
export const fetchDeleteAccount = async (
  sessionID: string
): Promise<ResDeleteAccount> => {
  const { status } = await baseFetch("/personal/delete-account", {
    sessionID,
  });

  return { status };
};

type ResChangeUsername = BaseResType & {
  newSessionID: string;
};
export const changeUsername = async (
  sessionID: string,
  newUsername: string
): Promise<ResChangeUsername> => {
  const {
    status,
    resJSON: { newSessionID },
  } = await baseFetch("/personal/change-username", {
    sessionID,
    newUsername,
  });

  throwIfTypeNot(newSessionID, "string");

  return { status, newSessionID };
};

type ResChangePassword = BaseResType & {
  newSessionID: string;
};
export const changePassword = async (
  sessionID: string,
  newPassword: string
): Promise<ResChangePassword> => {
  const {
    status,
    resJSON: { newSessionID },
  } = await baseFetch("/personal/change-password", {
    sessionID,
    newPassword,
  });

  throwIfTypeNot(newSessionID, "string");

  return { status, newSessionID };
};
