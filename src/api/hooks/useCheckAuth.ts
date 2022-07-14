import { useState, useCallback } from "react";
import config from "../../config";
import { Status } from "../base";
import {
  ReturnCheckAuth,
  NumsCheckAuth,
  fetchCheckAuth,
} from "../fetches/fetchCheckAuth";

export const useCheckAuth = (): ReturnCheckAuth & {
  checkAuth: () => Promise<ReturnCheckAuth>;
} => {
  const [userID, setUserID] = useState<string>("");
  const [status, setStatus] = useState<Status<NumsCheckAuth>>(401);

  const checkAuth = useCallback(async (): Promise<ReturnCheckAuth> => {
    setUserID("");
    const sessionID = localStorage.getItem(config.SESSION_ID_KEY);
    if (!sessionID) {
      setStatus(401);
      setUserID("");
      return { status: 401, userID: "" };
    }
    const { status, userID } = await fetchCheckAuth(sessionID);
    setStatus(status);
    setUserID(userID);
    return { status, userID };
  }, []);

  return {
    checkAuth,
    userID,
    status,
  };
};
