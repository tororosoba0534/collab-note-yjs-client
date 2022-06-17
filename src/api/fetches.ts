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
      let resJSON;
      try {
        // If API doesn't return JSON body, this line throw an error like:
        // "unexpected token o in json at position 0"
        resJSON = await response.json();
      } catch {
        resJSON = null;
      }

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
  userID: string;
}> => {
  const route = "/personal/check-auth";

  const { status, thrownErr, resJSON } = await baseFetch(route, { sessionID });

  if (thrownErr !== "") return { status: 500, thrownErr, userID: "" };

  if (!resJSON) {
    return {
      status: 500,
      thrownErr: `Response JSON is nullable`,
      userID: "",
    };
  }

  const userID = resJSON.userID;

  if (typeof userID !== "string")
    return {
      status: 500,
      thrownErr: `Invalid response type: "${typeof userID}"`,
      userID: "",
    };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
      userID: "",
    };

  return { userID, status, thrownErr };
};

export type StatusLogin = 200 | 400 | 401 | 500;
export const fetchLogin = async (
  userID: string,
  password: string
): Promise<{
  status: StatusLogin;
  thrownErr: string;
  sessionID: string;
}> => {
  const route = "/login";
  const { status, thrownErr, resJSON } = await baseFetch(route, {
    userID,
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

export type StatusCreateAccount = 200 | 400 | 403 | 500;
export const fetchCreateAccount = async (
  userID: string,
  password: string
): Promise<{
  status: StatusCreateAccount;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/create-account", {
    userID,
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

export type StatusCheckUserID = 200 | 400 | 403 | 500;
export const fetchCheckUserID = async (
  userID: string
): Promise<{
  status: StatusCheckUserID;
  thrownErr: string;
}> => {
  const { status, thrownErr } = await baseFetch("/check-userid", {
    userID,
  });

  if (thrownErr !== "") return { status: 500, thrownErr };

  if (status !== 200 && status !== 400 && status !== 500)
    return {
      status: 500,
      thrownErr: `Unexpected status code: ${status}`,
    };

  return { status, thrownErr };
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

export type StatusChangeUserID = 200 | 400 | 401 | 500;
export const fetchChangeUserID = async (
  sessionID: string,
  newUserID: string
): Promise<{
  status: StatusChangeUserID;
  thrownErr: string;
  newSessionID: string;
}> => {
  const { status, thrownErr, resJSON } = await baseFetch(
    "/personal/change-userid",
    {
      sessionID,
      newUserID,
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
