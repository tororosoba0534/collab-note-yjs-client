import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import {
  ReturnChangeAdminPassword,
  NumsChangeAdminPassword,
  fetchChangeAdminPassword,
} from "../fetches/fetchChangeAdminPassword";

export const useChangeAdminPassword = (): ReturnChangeAdminPassword & {
  changeAdminPassword: (
    oldAdminPassword: string,
    newAdminPassword: string
  ) => Promise<ReturnChangeAdminPassword>;
} => {
  const [status, setStatus] = useState<Status<NumsChangeAdminPassword>>(401);

  const changeAdminPassword = useCallback(
    async (
      oldAdminPassword: string,
      newAdminPassword: string
    ): Promise<ReturnChangeAdminPassword> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }

      const { status } = await fetchChangeAdminPassword(
        sessionID,
        oldAdminPassword,
        newAdminPassword
      );

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    changeAdminPassword,
    status,
  };
};
