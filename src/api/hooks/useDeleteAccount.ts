import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import {
  ReturnDeleteAccount,
  NumsDeleteAccount,
  fetchDeleteAccount,
} from "../fetches/fetchDeleteAccount";

export const useDeleteAccount = (): ReturnDeleteAccount & {
  deleteAccount: (adminPassword: string) => Promise<ReturnDeleteAccount>;
} => {
  const [status, setStatus] = useState<Status<NumsDeleteAccount>>(401);

  const deleteAccount = useCallback(
    async (adminPassword: string): Promise<ReturnDeleteAccount> => {
      const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
      if (!sessionID) {
        setStatus(401);
        return { status: 401 };
      }
      const { status } = await fetchDeleteAccount(sessionID, adminPassword);
      setStatus(status);
      return { status };
    },
    []
  );

  return {
    deleteAccount,
    status,
  };
};
