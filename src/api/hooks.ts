import { useCallback, useState } from "react";
import config from "../config";
import {
  fetchChangePassword,
  fetchChangeUserID,
  fetchCheckAuth,
  fetchCheckUserID,
  fetchCreateAccount,
  fetchDeleteAccount,
  fetchLogin,
  fetchLogout,
  StatusChangePassword,
  StatusChangeUserID,
  StatusCheckAuth,
  StatusCheckUserID,
  StatusCreateAccount,
  StatusDeleteAccount,
  StatusLogin,
  StatusLogout,
} from "./fetches";

type BaseReturn<Status> = {
  status: Status;
  thrownErr: string;
};

// type Loading = {
//   isLoading: boolean;
//   setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
// };

type ReturnCheckAuth = BaseReturn<StatusCheckAuth> & {
  userID: string;
};
export const useCheckAuth = (): ReturnCheckAuth & {
  checkAuth: () => Promise<ReturnCheckAuth>;
} => {
  const [userID, setUserID] = useState<string>("");
  const [status, setStatus] = useState<StatusCheckAuth>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const checkAuth = useCallback(async (): Promise<ReturnCheckAuth> => {
    setThrownErr("");
    setUserID("");
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      setUserID("");
      return { status: 401, thrownErr: "", userID: "" };
    }
    const { status, userID, thrownErr } = await fetchCheckAuth(sessionID);
    setStatus(status);
    setUserID(userID);
    setThrownErr(thrownErr);
    return { status, userID, thrownErr };
  }, []);

  return {
    checkAuth,
    userID,
    status,
    thrownErr,
  };
};

type ReturnLogin = BaseReturn<StatusLogin>;
export const useLogin = (): ReturnLogin & {
  login: (userID: string, password: string) => Promise<ReturnLogin>;
} => {
  const [status, setStatus] = useState<StatusLogin>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const login = useCallback(
    async (userID: string, password: string): Promise<ReturnLogin> => {
      setThrownErr("");

      const { status, sessionID, thrownErr } = await fetchLogin(
        userID,
        password
      );
      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, sessionID);
      }

      setStatus(status);
      setThrownErr(thrownErr);
      return { status, thrownErr };
    },
    []
  );

  return {
    login,
    status,
    thrownErr,
  };
};

type ReturnLogout = BaseReturn<StatusLogout>;
export const useLogout = (): ReturnLogout & {
  logout: () => Promise<ReturnLogout>;
} => {
  const [status, setStatus] = useState<StatusLogout>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const logout = useCallback(async (): Promise<ReturnLogout> => {
    setThrownErr("");

    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      return { status: 401, thrownErr: "" };
    }

    const { status, thrownErr } = await fetchLogout(sessionID);
    setStatus(status);
    setThrownErr(thrownErr);
    return { status, thrownErr };
  }, []);

  return {
    logout,
    status,
    thrownErr,
  };
};

type ReturnCreateAccount = BaseReturn<StatusCreateAccount>;
export const useCreateAccount = (): ReturnCreateAccount & {
  createAccount: (
    userID: string,
    password: string
  ) => Promise<ReturnCreateAccount>;
} => {
  const [status, setStatus] = useState<StatusCreateAccount>(400);
  const [thrownErr, setThrownErr] = useState<string>("");

  const createAccount = useCallback(
    async (userID: string, password: string): Promise<ReturnCreateAccount> => {
      setThrownErr("");

      const { status, thrownErr } = await fetchCreateAccount(userID, password);

      setStatus(status);
      setThrownErr(thrownErr);
      return { status, thrownErr };
    },
    []
  );

  return {
    createAccount,
    status,
    thrownErr,
  };
};

type ReturnCheckUserID = BaseReturn<StatusCheckUserID> & {
  isUnused: boolean;
};
export const useCheckUserID = (): ReturnCheckUserID & {
  checkUserID: (userID: string) => Promise<ReturnCheckUserID>;
} => {
  const [status, setStatus] = useState<StatusCheckUserID>(400);
  const [thrownErr, setThrownErr] = useState<string>("");
  const [isUnused, setIsUnused] = useState(true);

  const checkUserID = useCallback(
    async (userID: string): Promise<ReturnCheckUserID> => {
      setThrownErr("");
      const { status, thrownErr, isUnused } = await fetchCheckUserID(userID);

      setStatus(status);
      setThrownErr(thrownErr);
      setIsUnused(isUnused);
      return {
        status,
        thrownErr,
        isUnused,
      };
    },
    []
  );

  return {
    checkUserID,
    status,
    isUnused,
    thrownErr,
  };
};

type ReturnDeleteAccount = BaseReturn<StatusDeleteAccount>;
export const useDeleteAccount = (): ReturnDeleteAccount & {
  deleteAccount: () => Promise<ReturnDeleteAccount>;
} => {
  const [status, setStatus] = useState<StatusDeleteAccount>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const deleteAccount = useCallback(async (): Promise<ReturnDeleteAccount> => {
    setThrownErr("");

    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      return { status: 401, thrownErr: "" };
    }
    const { status, thrownErr } = await fetchDeleteAccount(sessionID);
    setStatus(status);
    setThrownErr(thrownErr);
    return { status, thrownErr };
  }, []);

  return {
    deleteAccount,
    status,
    thrownErr,
  };
};

type ReturnChangeUserID = BaseReturn<StatusChangeUserID>;
export const useChangeUserID = (): ReturnChangeUserID & {
  changeUserID: (newUserID: string) => Promise<ReturnChangeUserID>;
} => {
  const [status, setStatus] = useState<StatusChangeUserID>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const changeUserID = useCallback(
    async (newUserID: string): Promise<ReturnChangeUserID> => {
      setThrownErr("");

      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401, thrownErr: "" };
      }

      const { status, newSessionID, thrownErr } = await fetchChangeUserID(
        sessionID,
        newUserID
      );

      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(status);
      setThrownErr(thrownErr);
      return { status, thrownErr };
    },
    []
  );

  return {
    changeUserID,
    status,
    thrownErr,
  };
};

type ReturnChangePassword = BaseReturn<StatusChangePassword>;
export const useChangePassword = (): ReturnChangePassword & {
  changePassword: (newPassword: string) => Promise<ReturnChangePassword>;
} => {
  const [status, setStatus] = useState<StatusChangePassword>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const changePassword = useCallback(
    async (newPassword: string): Promise<ReturnChangePassword> => {
      setThrownErr("");

      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401, thrownErr: "" };
      }

      const { status, newSessionID, thrownErr } = await fetchChangePassword(
        sessionID,
        newPassword
      );

      if (status === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(status);
      setThrownErr(thrownErr);
      return { status, thrownErr };
    },
    []
  );

  return {
    changePassword,
    status,
    thrownErr,
  };
};
