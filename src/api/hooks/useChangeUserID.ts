import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import {
  ReturnChangeUserID,
  NumsChangeUserID,
  fetchChangeUserID,
} from "../fetches/fetchChangeUserID";

export const useChangeUserID = (): ReturnChangeUserID & {
  changeUserID: (
    newUserID: string,
    adminPassword: string
  ) => Promise<ReturnChangeUserID>;
} => {
  const [status, setStatus] = useState<Status<NumsChangeUserID>>(401);

  const changeUserID = useCallback(
    async (
      newUserID: string,
      adminPassword: string
    ): Promise<ReturnChangeUserID> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }

      const { status } = await fetchChangeUserID(
        sessionID,
        newUserID,
        adminPassword
      );

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
