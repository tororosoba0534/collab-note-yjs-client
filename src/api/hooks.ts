import { useState } from "react";
import config from "../config";
import { error2String } from "../errorHandlings/error2String";
import {
  fetchChangePassword,
  fetchChangeUsername,
  fetchCheckAuth,
  fetchCheckUsername,
  fetchCreateAccount,
  fetchDeleteAccount,
  fetchLogin,
  fetchLogout,
} from "./fetches";

export const useCheckAuth = (): {
  checkAuth: () => Promise<void>;
  username: string;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [username, setUsername] = useState<string>("");
  const [status, setStatus] = useState<number>(401);
  const [thrownErr, setThrownErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async (): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);
    setUsername("");
    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        setUsername("");
        setIsLoading(false);
        return;
      }
      const { status: resStatus, username: resUsername } = await fetchCheckAuth(
        sessionID
      );
      setStatus(resStatus);
      setUsername(resUsername);
      setIsLoading(false);
      return;
    } catch (e) {
      setThrownErr(error2String(e));
      setUsername("");
      setIsLoading(false);
      return;
    }
  };

  return { checkAuth, username, status, thrownErr, isLoading };
};

export const useLogin = (): {
  login: (username: string, password: string) => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(401);
  const [thrownErr, setThrownErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = async (username: string, password: string): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const { status: resStatus, sessionID: resSessionID } = await fetchLogin(
        username,
        password
      );
      if (resStatus === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, resSessionID);
      }

      setStatus(resStatus);
      setIsLoading(false);
      return;
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
      return;
    }
  };

  return { login, status, thrownErr, isLoading };
};

export const useLogout = (): {
  logout: () => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(401);
  const [thrownErr, setThrownErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = async (): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        setIsLoading(false);
        return;
      }

      const { status: resStatus } = await fetchLogout(sessionID);
      setStatus(resStatus);
      setIsLoading(false);
      return;
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { logout, status, thrownErr, isLoading };
};

export const useCreateAccount = (): {
  createAccount: (username: string, password: string) => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(400);
  const [thrownErr, setThrownErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const createAccount = async (
    username: string,
    password: string
  ): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const { status: resStatus } = await fetchCreateAccount(
        username,
        password
      );

      setStatus(resStatus);
      setIsLoading(false);
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { createAccount, status, thrownErr, isLoading };
};

export const useCheckUsername = (): {
  checkUsername: (username: string) => Promise<void>;
  status: number;
  isUnusedValidUsername: boolean;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(400);
  const [thrownErr, setThrownErr] = useState("");
  const [isUnusedValidUsername, setIsUnusedValidUsername] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkUsername = async (username: string): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);
    try {
      const {
        status: resStatus,
        isUnusedValidUsername: resIsUnusedValidUsername,
      } = await fetchCheckUsername(username);

      setStatus(resStatus);
      setIsUnusedValidUsername(resIsUnusedValidUsername);
      setIsLoading(false);
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { checkUsername, status, isUnusedValidUsername, thrownErr, isLoading };
};

export const useDeleteAccount = (): {
  deleteAccount: () => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(401);
  const [thrownErr, setThrownErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const deleteAccount = async (): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        setIsLoading(false);
        return;
      }
      const { status: resStatus } = await fetchDeleteAccount(sessionID);
      setStatus(resStatus);
      setIsLoading(false);
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { deleteAccount, status, thrownErr, isLoading };
};

export const useChangeUsername = (): {
  changeUsername: (newUsername: string) => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(401);
  const [thrownErr, setThrownErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeUsername = async (newUsername: string): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        setIsLoading(false);
        return;
      }

      const { status: resStatus, newSessionID } = await fetchChangeUsername(
        sessionID,
        newUsername
      );

      if (resStatus === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(resStatus);
      setIsLoading(false);
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { changeUsername, status, thrownErr, isLoading };
};

export const useChangePassword = (): {
  changePassword: (newPassword: string) => Promise<void>;
  status: number;
  thrownErr: string;
  isLoading: boolean;
} => {
  const [status, setStatus] = useState(401);
  const [thrownErr, setThrownErr] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changePassword = async (newPassword: string): Promise<void> => {
    setThrownErr("");
    setIsLoading(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        setIsLoading(false);
        return;
      }

      const { status: resStatus, newSessionID } = await fetchChangePassword(
        sessionID,
        newPassword
      );

      if (resStatus === 200) {
        localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
      }

      setStatus(resStatus);
      setIsLoading(false);
    } catch (e) {
      setThrownErr(error2String(e));
      setIsLoading(false);
    }
  };

  return { changePassword, status, thrownErr, isLoading };
};
