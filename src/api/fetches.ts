import config from "../config";
import { error2String } from "../errorHandlings/error2String";

// export type Status = number;
// export type BaseResType = {
//   status: Status;
// };

const baseFetch = async (
  route: string,
  reqJSON: any
): Promise<{
  status: number;
  thrownErr: string;
  resJSON: any;
}> => {
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

    return { status, resJSON, thrownErr: "" };
  } catch (e) {
    return { status: 0, resJSON: null, thrownErr: error2String(e) };
    // return { status: "clientError", resJSON: null, error: e };
  }
};

export const fetchCheckAuth = async (
  sessionID: string
): Promise<{
  status: 0 | 200 | 401 | 500;
  thrownErr: string;
  username: string;
}> => {
  const route = "/personal/check-auth";

  const {
    status,
    thrownErr,
    resJSON: { username },
  } = await baseFetch(route, { sessionID });

  if (thrownErr !== "") return { status: 0, thrownErr, username: "" };

  if (typeof username !== "string")
    return {
      status: 0,
      thrownErr: `Invalid response type: "${typeof username}"`,
      username: "",
    };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
      username: "",
    };

  return { username, status, thrownErr };
};

export const fetchLogin = async (
  username: string,
  password: string
): Promise<{
  status: 0 | 200 | 400 | 401 | 500;
  thrownErr: string;
  sessionID: string;
}> => {
  const route = "/login";
  const {
    status,
    thrownErr,
    resJSON: { sessionID },
  } = await baseFetch(route, { username, password });

  if (thrownErr !== "") return { status: 0, thrownErr, sessionID: "" };

  if (typeof sessionID !== "string")
    return {
      status: 0,
      thrownErr: `Invalid response type: "${typeof sessionID}"`,
      sessionID: "",
    };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
      sessionID: "",
    };

  return { sessionID, status, thrownErr };
};

export const fetchLogout = async (
  sessionID: string
): Promise<{
  status: 0 | 200 | 401 | 500;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/personal/logout", {
    sessionID,
  });

  if (thrownErr !== "") return { status: 0, thrownErr };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export const fetchCreateAccount = async (
  username: string,
  password: string
): Promise<{
  status: 0 | 200 | 400 | 500;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/createAccount", {
    username,
    password,
  });

  if (thrownErr !== "") return { status: 0, thrownErr };

  if (status !== 200 && status !== 400 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export const fetchCheckUsername = async (
  username: string
): Promise<{
  status: 0 | 200 | 400 | 500;
  thrownErr: string;
  isUnusedValidUsername: boolean;
}> => {
  const {
    status,
    thrownErr,
    resJSON: { isUnusedValidUsername },
  } = await baseFetch("/check-username", { username });

  if (thrownErr !== "")
    return { status: 0, thrownErr, isUnusedValidUsername: false };

  if (typeof isUnusedValidUsername !== "boolean") {
    return {
      status: 0,
      thrownErr: `Invalid response type: "${typeof isUnusedValidUsername}"`,
      isUnusedValidUsername: false,
    };
  }

  if (status !== 200 && status !== 400 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
      isUnusedValidUsername: false,
    };

  return { status, thrownErr, isUnusedValidUsername };
};

export const fetchDeleteAccount = async (
  sessionID: string
): Promise<{
  status: 0 | 200 | 401 | 500;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/personal/delete-account", {
    sessionID,
  });

  if (thrownErr !== "") return { status: 0, thrownErr };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export const fetchChangeUsername = async (
  sessionID: string,
  newUsername: string
): Promise<{
  status: 0 | 200 | 400 | 401 | 500;
  thrownErr: string;
  newSessionID: string;
}> => {
  const {
    status,
    thrownErr,
    resJSON: { newSessionID },
  } = await baseFetch("/personal/change-username", {
    sessionID,
    newUsername,
  });

  if (thrownErr !== "") return { status: 0, thrownErr, newSessionID: "" };

  if (typeof newSessionID !== "string") {
    return {
      status: 0,
      thrownErr: `Invalid response type: "${typeof newSessionID}"`,
      newSessionID: "",
    };
  }

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
      newSessionID: "",
    };

  return { status, thrownErr, newSessionID };
};

export const fetchChangePassword = async (
  sessionID: string,
  newPassword: string
): Promise<{
  status: 0 | 200 | 400 | 401 | 500;
  thrownErr: string;
  newSessionID: string;
}> => {
  const {
    status,
    thrownErr,
    resJSON: { newSessionID },
  } = await baseFetch("/personal/change-password", {
    sessionID,
    newPassword,
  });

  if (thrownErr !== "") return { status: 0, thrownErr, newSessionID: "" };

  if (typeof newSessionID !== "string") {
    return {
      status: 0,
      thrownErr: `Invalid response type: "${typeof newSessionID}"`,
      newSessionID: "",
    };
  }

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 0,
      thrownErr: `Unexpected status code: ${status}`,
      newSessionID: "",
    };

  return { status, thrownErr, newSessionID };
};
