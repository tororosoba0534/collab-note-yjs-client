import config from "../config";
import { error2String } from "../utils/errorHandlings";

// export type Status = number;
// export type BaseResType = {
//   status: Status;
// };

const baseFetch = async (
  route: string,
  reqJSON: unknown
): Promise<{
  status: number;
  thrownErr: string;
  resJSON: Record<string, unknown> | null | undefined;
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
    return { status: 500, resJSON: null, thrownErr: error2String(e) };
    // return { status: "clientError", resJSON: null, error: e };
  }
};

export type StatusCheckAuth = 200 | 401 | 500;
export const fetchCheckAuth = async (
  sessionID: string
): Promise<{
  status: StatusCheckAuth;
  thrownErr: string;
  username: string;
}> => {
  const route = "/personal/check-auth";

  const { status, thrownErr, resJSON } = await baseFetch(route, { sessionID });

  if (thrownErr !== "") return { status: 500, thrownErr, username: "" };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      username: "",
    };
  }

  const username = resJSON.username;

  if (typeof username !== "string")
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof username}"`,
      username: "",
    };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      username: "",
    };

  return { username, status, thrownErr };
};

export type StatusLogin = 200 | 400 | 401 | 500;
export const fetchLogin = async (
  username: string,
  password: string
): Promise<{
  status: StatusLogin;
  thrownErr: string;
  sessionID: string;
}> => {
  const route = "/login";
  const { status, thrownErr, resJSON } = await baseFetch(route, {
    username,
    password,
  });

  if (thrownErr !== "") return { status: 500, thrownErr, sessionID: "" };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      sessionID: "",
    };
  }

  const sessionID = resJSON.sessionID;

  if (typeof sessionID !== "string")
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof sessionID}"`,
      sessionID: "",
    };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      sessionID: "",
    };

  return { sessionID, status, thrownErr };
};

export type StatusLogout = 200 | 401 | 500;
export const fetchLogout = async (
  sessionID: string
): Promise<{
  status: StatusLogout;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/personal/logout", {
    sessionID,
  });

  if (thrownErr !== "") return { status: 500, thrownErr };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export type StatusCreateAccount = 200 | 400 | 500;
export const fetchCreateAccount = async (
  username: string,
  password: string
): Promise<{
  status: StatusCreateAccount;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/createAccount", {
    username,
    password,
  });

  if (thrownErr !== "") return { status: 500, thrownErr };

  if (status !== 200 && status !== 400 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export type StatusCheckUsername = 200 | 400 | 500;
export const fetchCheckUsername = async (
  username: string
): Promise<{
  status: StatusCheckUsername;
  thrownErr: string;
  isUnused: boolean;
}> => {
  const { status, thrownErr, resJSON } = await baseFetch("/check-username", {
    username,
  });

  if (thrownErr !== "") return { status: 500, thrownErr, isUnused: false };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      isUnused: false,
    };
  }

  const isUnused = resJSON.isUnused;

  if (typeof isUnused !== "boolean") {
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof isUnused}"`,
      isUnused: false,
    };
  }

  if (status !== 200 && status !== 400 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      isUnused: false,
    };

  return { status, thrownErr, isUnused };
};

export type StatusDeleteAccount = 200 | 401 | 500;
export const fetchDeleteAccount = async (
  sessionID: string
): Promise<{
  status: StatusDeleteAccount;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/personal/delete-account", {
    sessionID,
  });

  if (thrownErr !== "") return { status: 500, thrownErr };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
};

export type StatusChangeUsername = 200 | 400 | 401 | 500;
export const fetchChangeUsername = async (
  sessionID: string,
  newUsername: string
): Promise<{
  status: StatusChangeUsername;
  thrownErr: string;
  newSessionID: string;
}> => {
  const { status, thrownErr, resJSON } = await baseFetch(
    "/personal/change-username",
    {
      sessionID,
      newUsername,
    }
  );

  if (thrownErr !== "") return { status: 500, thrownErr, newSessionID: "" };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      newSessionID: "",
    };
  }

  const newSessionID = resJSON.newSessionID;

  if (typeof newSessionID !== "string") {
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof newSessionID}"`,
      newSessionID: "",
    };
  }

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      newSessionID: "",
    };

  return { status, thrownErr, newSessionID };
};

export type StatusChangePassword = 200 | 400 | 401 | 500;
export const fetchChangePassword = async (
  sessionID: string,
  newPassword: string
): Promise<{
  status: StatusChangePassword;
  thrownErr: string;
  newSessionID: string;
}> => {
  const { status, thrownErr, resJSON } = await baseFetch(
    "/personal/change-password",
    {
      sessionID,
      newPassword,
    }
  );

  if (thrownErr !== "") return { status: 500, thrownErr, newSessionID: "" };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      newSessionID: "",
    };
  }

  const newSessionID = resJSON.newSessionID;

  if (typeof newSessionID !== "string") {
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof newSessionID}"`,
      newSessionID: "",
    };
  }

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      newSessionID: "",
    };

  return { status, thrownErr, newSessionID };
};
