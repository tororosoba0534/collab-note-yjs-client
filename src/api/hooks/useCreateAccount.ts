import { useState, useCallback } from "react";
import { Status } from "../base";
import {
  ReturnCreateAccount,
  NumsCreateAccount,
  fetchCreateAccount,
} from "../fetches/fetchLogout";

export const useCreateAccount = (): ReturnCreateAccount & {
  createAccount: (
    userID: string,
    password: string,
    adminPassword: string
  ) => Promise<ReturnCreateAccount>;
} => {
  const [status, setStatus] = useState<Status<NumsCreateAccount>>(400);

  const createAccount = useCallback(
    async (
      userID: string,
      password: string,
      adminPassword: string
    ): Promise<ReturnCreateAccount> => {
      const { status } = await fetchCreateAccount(
        userID,
        password,
        adminPassword
      );

      setStatus(status);
      return { status };
    },
    []
  );

  return {
    createAccount,
    status,
  };
};
