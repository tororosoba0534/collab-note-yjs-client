import { useState, useCallback } from "react";
import { Status } from "../base";
import {
  ReturnCheckUserID,
  NumsCheckUserID,
  fetchCheckUserID,
} from "../fetches/fetchCheckUserID";

export const useCheckUserID = (): ReturnCheckUserID & {
  checkUserID: (userID: string) => Promise<ReturnCheckUserID>;
} => {
  const [status, setStatus] = useState<Status<NumsCheckUserID>>(400);

  const checkUserID = useCallback(
    async (userID: string): Promise<ReturnCheckUserID> => {
      const { status } = await fetchCheckUserID(userID);

      setStatus(status);
      return {
        status,
      };
    },
    []
  );

  return {
    checkUserID,
    status,
  };
};
