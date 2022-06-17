import { useCallback, useState } from "react";
import config from "../config";
import { Status } from "./base";
import {
  fetchChangePassword,
  fetchChangeUserID,
  fetchCheckAuth,
  fetchCheckUserID,
  fetchCreateAccount,
  fetchDeleteAccount,
  fetchLogin,
  fetchLogout,
  NumsChangePassword,
  NumsChangeUserID,
  NumsCheckAuth,
  NumsCheckUserID,
  NumsCreateAccount,
  NumsDeleteAccount,
  NumsLogin,
  NumsLogout,
  ReturnChangePassword,
  ReturnChangeUserID,
  ReturnCheckAuth,
  ReturnCheckUserID,
  ReturnCreateAccount,
  ReturnDeleteAccount,
  ReturnLogin,
  ReturnLogout,
} from "./fetches";

// type Loading = {
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// };

export const useCheckAuth = (): ReturnCheckAuth & {
  checkAuth: () => Promise<ReturnCheckAuth>;
} => {
  const [userID, setUserID] = useState<string>("");
  const [status, setStatus] = useState<Status<NumsCheckAuth>>(401);

  const checkAuth = useCallback(async (): Promise<ReturnCheckAuth> => {
    setUserID("");
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      setUserID("");
      return { status: 401, userID: "" };
    }
    const { status, userID } = await fetchCheckAuth(sessionID);
    setStatus(status);
    setUserID(userID);
    return { status, userID };
  }, []);

  return {
    checkAuth,
    userID,
    status,
  };
};

export const useLogin = (): ReturnLogin & {
  login: (userID: string, password: string) => Promise<ReturnLogin>;
} => {
  const [status, setStatus] = useState<Status<NumsLogin>>(401);

  const login = useCallback(
    async (userID: string, password: string): Promise<ReturnLogin> => {
      const { status, sessionID } = await fetchLogin(userID, password);
      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, sessionID);
      }

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    login,
    status,
  };
};

export const useLogout = (): ReturnLogout & {
  logout: () => Promise<ReturnLogout>;
} => {
  const [status, setStatus] = useState<Status<NumsLogout>>(401);

  const logout = useCallback(async (): Promise<ReturnLogout> => {
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      return { status: 401 };
    }

    const { status } = await fetchLogout(sessionID);
    setStatus(status);
    return { status };
  }, []);

  return {
    logout,
    status,
  };
};

export const useCreateAccount = (): ReturnCreateAccount & {
  createAccount: (
    userID: string,
    password: string
  ) => Promise<ReturnCreateAccount>;
} => {
  const [status, setStatus] = useState<Status<NumsCreateAccount>>(400);

  const createAccount = useCallback(
    async (userID: string, password: string): Promise<ReturnCreateAccount> => {
      const { status } = await fetchCreateAccount(userID, password);

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    createAccount,
    status,
  };
};

export const useCheckUserID = (): ReturnCheckUserID & {
  checkUserID: (userID: string) => Promise<ReturnCheckUserID>;
} => {
  const [status, setStatus] = useState<Status<NumsCheckUserID>>(400);

  const checkUserID = useCallback(
    async (userID: string): Promise<ReturnCheckUserID> => {
      const { status } = await fetchCheckUserID(userID);

      setStatus(status);
      return {
        status,
      };
    },
    []
  );

  return {
    checkUserID,
    status,
  };
};

export const useDeleteAccount = (): ReturnDeleteAccount & {
  deleteAccount: () => Promise<ReturnDeleteAccount>;
} => {
  const [status, setStatus] = useState<Status<NumsDeleteAccount>>(401);

  const deleteAccount = useCallback(async (): Promise<ReturnDeleteAccount> => {
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      return { status: 401 };
    }
    const { status } = await fetchDeleteAccount(sessionID);
    setStatus(status);
    return { status };
  }, []);

  return {
    deleteAccount,
    status,
  };
};

export const useChangeUserID = (): ReturnChangeUserID & {
  changeUserID: (newUserID: string) => Promise<ReturnChangeUserID>;
} => {
  const [status, setStatus] = useState<Status<NumsChangeUserID>>(401);

  const changeUserID = useCallback(
    async (newUserID: string): Promise<ReturnChangeUserID> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }

      const { status, newSessionID } = await fetchChangeUserID(
        sessionID,
        newUserID
      );

      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    changeUserID,
    status,
  };
};

export const useChangePassword = (): ReturnChangePassword & {
  changePassword: (newPassword: string) => Promise<ReturnChangePassword>;
} => {
  const [status, setStatus] = useState<Status<NumsChangePassword>>(401);

  const changePassword = useCallback(
    async (newPassword: string): Promise<ReturnChangePassword> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }

      const { status, newSessionID } = await fetchChangePassword(
        sessionID,
        newPassword
      );

      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    changePassword,
    status,
  };
};
