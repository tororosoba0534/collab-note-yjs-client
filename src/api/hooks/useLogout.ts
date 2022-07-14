import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import { ReturnLogout, NumsLogout, fetchLogout } from "../fetches/fetchLogout";

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
