import { useCallback, useState } from "react";
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

type BaseReturnType = {
  status: number;
  thrownErr: string;
};

type BaseHooksType = BaseReturnType & {
  isLoading: boolean;
};

export const useCheckAuth = (): BaseHooksType & {
  checkAuth: () => Promise<BaseReturnType & { username: string }>;
  username: string;
} => {
  const [usernameState, setUsernameState] = useState<string>("");
  const [statusState, setStatusState] = useState<number>(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const checkAuth = useCallback(async (): Promise<
    BaseReturnType & { username: string }
  > => {
    setThrownErrState("");
    setIsLoadingState(true);
    setUsernameState("");
    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatusState(401);
        setUsernameState("");
        setIsLoadingState(false);
        return { status: 401, thrownErr: "", username: "" };
      }
      const { status: resStatus, username: resUsername } = await fetchCheckAuth(
        sessionID
      );
      setStatusState(resStatus);
      setUsernameState(resUsername);
      setIsLoadingState(false);
      return { status: resStatus, username: resUsername, thrownErr: "" };
    } catch (e) {
      setThrownErrState(error2String(e));
      setUsernameState("");
      setIsLoadingState(false);
      return { status: 0, username: "", thrownErr: error2String(e) };
    }
  }, []);

  return {
    checkAuth,
    username: usernameState,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useLogin = (): BaseHooksType & {
  login: (username: string, password: string) => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const login = useCallback(
    async (username: string, password: string): Promise<BaseReturnType> => {
      setThrownErrState("");
      setIsLoadingState(true);

      try {
        const { status: resStatus, sessionID: resSessionID } = await fetchLogin(
          username,
          password
        );
        if (resStatus === 200) {
          localStorage.setItem(config.SESSION_ID_KEY, resSessionID);
        }

        setStatusState(resStatus);
        setIsLoadingState(false);
        return { status: resStatus, thrownErr: "" };
      } catch (e) {
        setThrownErrState(error2String(e));
        setIsLoadingState(false);
        return { status: 0, thrownErr: error2String(e) };
      }
    },
    []
  );

  return {
    login,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useLogout = (): BaseHooksType & {
  logout: () => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const logout = useCallback(async (): Promise<BaseReturnType> => {
    setThrownErrState("");
    setIsLoadingState(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatusState(401);
        setIsLoadingState(false);
        return { status: 401, thrownErr: "" };
      }

      const { status: resStatus } = await fetchLogout(sessionID);
      setStatusState(resStatus);
      setIsLoadingState(false);
      return { status: resStatus, thrownErr: "" };
    } catch (e) {
      setThrownErrState(error2String(e));
      setIsLoadingState(false);
      return { status: 0, thrownErr: error2String(e) };
    }
  }, []);

  return {
    logout,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useCreateAccount = (): BaseHooksType & {
  createAccount: (
    username: string,
    password: string
  ) => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(400);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const createAccount = useCallback(
    async (username: string, password: string): Promise<BaseReturnType> => {
      setThrownErrState("");
      setIsLoadingState(true);

      try {
        const { status: resStatus } = await fetchCreateAccount(
          username,
          password
        );

        setStatusState(resStatus);
        setIsLoadingState(false);
        return { status: resStatus, thrownErr: "" };
      } catch (e) {
        setThrownErrState(error2String(e));
        setIsLoadingState(false);
        return { status: 0, thrownErr: error2String(e) };
      }
    },
    []
  );

  return {
    createAccount,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useCheckUsername = (): BaseHooksType & {
  checkUsername: (
    username: string
  ) => Promise<BaseReturnType & { isUnusedValidUsername: boolean }>;
  isUnusedValidUsername: boolean;
} => {
  const [statusState, setStatusState] = useState(400);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);
  const [isUnusedValidUsernameState, setIsUnusedValidUsernameState] =
    useState(true);

  const checkUsername = useCallback(
    async (
      username: string
    ): Promise<BaseReturnType & { isUnusedValidUsername: boolean }> => {
      setThrownErrState("");
      setIsLoadingState(true);
      try {
        const {
          status: resStatus,
          isUnusedValidUsername: resIsUnusedValidUsername,
        } = await fetchCheckUsername(username);

        setStatusState(resStatus);
        setIsUnusedValidUsernameState(resIsUnusedValidUsername);
        setIsLoadingState(false);
        return {
          status: resStatus,
          thrownErr: "",
          isUnusedValidUsername: resIsUnusedValidUsername,
        };
      } catch (e) {
        setThrownErrState(error2String(e));
        setIsLoadingState(false);
        return {
          status: 0,
          thrownErr: error2String(e),
          isUnusedValidUsername: false,
        };
      }
    },
    []
  );

  return {
    checkUsername,
    status: statusState,
    isUnusedValidUsername: isUnusedValidUsernameState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useDeleteAccount = (): BaseHooksType & {
  deleteAccount: () => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const deleteAccount = useCallback(async (): Promise<BaseReturnType> => {
    setThrownErrState("");
    setIsLoadingState(true);

    try {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatusState(401);
        setIsLoadingState(false);
        return { status: 401, thrownErr: "" };
      }
      const { status: resStatus } = await fetchDeleteAccount(sessionID);
      setStatusState(resStatus);
      setIsLoadingState(false);
      return { status: resStatus, thrownErr: "" };
    } catch (e) {
      setThrownErrState(error2String(e));
      setIsLoadingState(false);
      return { status: 0, thrownErr: error2String(e) };
    }
  }, []);

  return {
    deleteAccount,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useChangeUsername = (): BaseHooksType & {
  changeUsername: (newUsername: string) => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const changeUsername = useCallback(
    async (newUsername: string): Promise<BaseReturnType> => {
      setThrownErrState("");
      setIsLoadingState(true);

      try {
        const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
        if (!sessionID) {
          setStatusState(401);
          setIsLoadingState(false);
          return { status: 401, thrownErr: "" };
        }

        const { status: resStatus, newSessionID } = await fetchChangeUsername(
          sessionID,
          newUsername
        );

        if (resStatus === 200) {
          localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
        }

        setStatusState(resStatus);
        setIsLoadingState(false);
        return { status: resStatus, thrownErr: "" };
      } catch (e) {
        setThrownErrState(error2String(e));
        setIsLoadingState(false);
        return { status: 0, thrownErr: error2String(e) };
      }
    },
    []
  );

  return {
    changeUsername,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};

export const useChangePassword = (): BaseHooksType & {
  changePassword: (newPassword: string) => Promise<BaseReturnType>;
} => {
  const [statusState, setStatusState] = useState(401);
  const [thrownErrState, setThrownErrState] = useState<string>("");
  const [isLoadingState, setIsLoadingState] = useState<boolean>(true);

  const changePassword = useCallback(
    async (newPassword: string): Promise<BaseReturnType> => {
      setThrownErrState("");
      setIsLoadingState(true);

      try {
        const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
        if (!sessionID) {
          setStatusState(401);
          setIsLoadingState(false);
          return { status: 401, thrownErr: "" };
        }

        const { status: resStatus, newSessionID } = await fetchChangePassword(
          sessionID,
          newPassword
        );

        if (resStatus === 200) {
          localStorage.setItem(config.SESSION_ID_KEY, newSessionID);
        }

        setStatusState(resStatus);
        setIsLoadingState(false);
        return { status: resStatus, thrownErr: "" };
      } catch (e) {
        setThrownErrState(error2String(e));
        setIsLoadingState(false);
        return { status: 0, thrownErr: error2String(e) };
      }
    },
    []
  );

  return {
    changePassword,
    status: statusState,
    thrownErr: thrownErrState,
    isLoading: isLoadingState,
  };
};
