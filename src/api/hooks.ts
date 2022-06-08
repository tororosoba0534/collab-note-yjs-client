import { useCallback, useState } from "react";
import config from "../config";
import {
  fetchChangePassword,
  fetchChangeUsername,
  fetchCheckAuth,
  fetchCheckUsername,
  fetchCreateAccount,
  fetchDeleteAccount,
  fetchLogin,
  fetchLogout,
  StatusChangePassword,
  StatusChangeUsername,
  StatusCheckAuth,
  StatusCheckUsername,
  StatusCreateAccount,
  StatusDeleteAccount,
  StatusLogin,
  StatusLogout,
} from "./fetches";

type BaseReturn<Status> = {
  status: Status;
  thrownErr: string;
};

type Loading = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReturnCheckAuth = BaseReturn<StatusCheckAuth> & {
  username: string;
};
export const useCheckAuth = (): ReturnCheckAuth &
  Loading & {
    checkAuth: () => Promise<ReturnCheckAuth>;
  } => {
  const [username, setUsername] = useState<string>("");
  const [status, setStatus] = useState<StatusCheckAuth>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const checkAuth = useCallback(async (): Promise<ReturnCheckAuth> => {
    setThrownErr("");
    setUsername("");
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      setUsername("");
      return { status: 401, thrownErr: "", username: "" };
    }
    const { status, username, thrownErr } = await fetchCheckAuth(sessionID);
    setStatus(status);
    setUsername(username);
    setThrownErr(thrownErr);
    return { status, username, thrownErr };
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    checkAuth,
    username,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnLogin = BaseReturn<StatusLogin>;
export const useLogin = (): ReturnLogin &
  Loading & {
    login: (username: string, password: string) => Promise<ReturnLogin>;
  } => {
  const [status, setStatus] = useState<StatusLogin>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const login = useCallback(
    async (username: string, password: string): Promise<ReturnLogin> => {
      setThrownErr("");

      const { status, sessionID, thrownErr } = await fetchLogin(
        username,
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    login,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnLogout = BaseReturn<StatusLogout>;
export const useLogout = (): ReturnLogout &
  Loading & {
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    logout,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnCreateAccount = BaseReturn<StatusCreateAccount>;
export const useCreateAccount = (): ReturnCreateAccount &
  Loading & {
    createAccount: (
      username: string,
      password: string
    ) => Promise<ReturnCreateAccount>;
  } => {
  const [status, setStatus] = useState<StatusCreateAccount>(400);
  const [thrownErr, setThrownErr] = useState<string>("");

  const createAccount = useCallback(
    async (
      username: string,
      password: string
    ): Promise<ReturnCreateAccount> => {
      setThrownErr("");

      const { status, thrownErr } = await fetchCreateAccount(
        username,
        password
      );

      setStatus(status);
      setThrownErr(thrownErr);
      return { status, thrownErr };
    },
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    createAccount,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnCheckUsername = BaseReturn<StatusCheckUsername> & {
  isUnusedValidUsername: boolean;
};
export const useCheckUsername = (): ReturnCheckUsername &
  Loading & {
    checkUsername: (username: string) => Promise<ReturnCheckUsername>;
  } => {
  const [status, setStatus] = useState<StatusCheckUsername>(400);
  const [thrownErr, setThrownErr] = useState<string>("");
  const [isUnusedValidUsername, setIsUnusedValidUsername] = useState(true);

  const checkUsername = useCallback(
    async (username: string): Promise<ReturnCheckUsername> => {
      setThrownErr("");
      const { status, thrownErr, isUnusedValidUsername } =
        await fetchCheckUsername(username);

      setStatus(status);
      setThrownErr(thrownErr);
      setIsUnusedValidUsername(isUnusedValidUsername);
      return {
        status,
        thrownErr,
        isUnusedValidUsername,
      };
    },
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    checkUsername,
    status,
    isUnusedValidUsername,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnDeleteAccount = BaseReturn<StatusDeleteAccount>;
export const useDeleteAccount = (): ReturnDeleteAccount &
  Loading & {
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    deleteAccount,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnChangeUsername = BaseReturn<StatusChangeUsername>;
export const useChangeUsername = (): ReturnChangeUsername &
  Loading & {
    changeUsername: (newUsername: string) => Promise<ReturnChangeUsername>;
  } => {
  const [status, setStatus] = useState<StatusChangeUsername>(401);
  const [thrownErr, setThrownErr] = useState<string>("");

  const changeUsername = useCallback(
    async (newUsername: string): Promise<ReturnChangeUsername> => {
      setThrownErr("");

      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401, thrownErr: "" };
      }

      const { status, newSessionID, thrownErr } = await fetchChangeUsername(
        sessionID,
        newUsername
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    changeUsername,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};

type ReturnChangePassword = BaseReturn<StatusChangePassword>;
export const useChangePassword = (): ReturnChangePassword &
  Loading & {
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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  return {
    changePassword,
    status,
    thrownErr,
    isLoading,
    setIsLoading,
  };
};
