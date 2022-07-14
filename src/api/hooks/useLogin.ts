import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import { ReturnLogin, NumsLogin, fetchLogin } from "../fetches/fetchLogin";

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
