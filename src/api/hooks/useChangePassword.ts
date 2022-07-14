import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import {
  ReturnChangePassword,
  NumsChangePassword,
  fetchChangePassword,
} from "../fetches/fetchChangePassword";

export const useChangePassword = (): ReturnChangePassword & {
  changePassword: (
    newPassword: string,
    adminPassword: string
  ) => Promise<ReturnChangePassword>;
} => {
  const [status, setStatus] = useState<Status<NumsChangePassword>>(401);

  const changePassword = useCallback(
    async (
      newPassword: string,
      adminPassword: string
    ): Promise<ReturnChangePassword> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }

      const { status } = await fetchChangePassword(
        sessionID,
        newPassword,
        adminPassword
      );

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
