import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCheckAuth, fetchLogin, fetchLogout } from "../api/fetches";
import config from "../config";
import { SESSION_ID_KEY } from "../localStorage";
import { renderError } from "../errorHandlings/renderError";
import { UserContext } from "./userProvider";

export const useAuth = () => {
  const { setUsername } = useContext(UserContext);

  const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading");

  const navigate = useNavigate();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    const sessionID = localStorage.getItem(SESSION_ID_KEY);
    if (!sessionID) {
      console.log("sessionID does NOT exist in localStorage.");
      setStatus("failed");
      return false;
    }

    setUsername("");
    setStatus("loading");

    try {
      const { username: resUsername } = await fetchCheckAuth(sessionID);

      setStatus(() => (resUsername === "" ? "failed" : "ok"));
      return true;
    } catch (e) {
      setStatus("failed");
      renderError(e);
      return false;
    }
  }, [setUsername]);

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setStatus("loading");

      const { sessionID } = await fetchLogin(username, password);

      if (sessionID === "") {
        console.log("login failed.");
        return false;
      }

      localStorage.setItem(SESSION_ID_KEY, sessionID);
      console.log("login succeeded!");
      return true;

      // const result: boolean = await fetch(config.server.ORIGIN + "/login", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     username,
      //     password,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (
      //       typeof data?.sessionID !== "string" ||
      //       typeof data?.authed !== "boolean"
      //     ) {
      //       console.log("response type invalid.");
      //       return false;
      //     }
      //     if (data?.sessionID && data?.authed === true) {
      //       console.log("login succeeded!");
      //       localStorage.setItem(SESSION_ID_KEY, data.sessionID);

      //       return true;
      //     }

      //     console.log("username or password wrong");
      //     return false;
      //   });
      // return result;
    },
    []
  );

  const logout = useCallback(async (): Promise<boolean> => {
    setUsername("");
    const sessionID = localStorage.getItem(SESSION_ID_KEY);
    if (!sessionID) {
      console.log("sessionID does NOT exist in localStorage.");
      return false;
    }

    const { logoutStatus } = await fetchLogout(sessionID);
    return logoutStatus;

    // const result = await fetch(config.server.ORIGIN + "/logout", {
    //   method: "POST",
    //   credentials: "include",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     sessionID,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (typeof data?.logoutStatus !== "boolean") {
    //       console.log("response datatype invalid");
    //       return false;
    //     }
    //     if (data.logoutStatus) {
    //       console.log("logout succeeded.");
    //       return true;
    //     }
    //     console.log("logout failed.");
    //     return false;
    //   });

    // if (result) navigate("/login");
  }, [navigate, setUsername]);

  return {
    status,
    checkAuth,
    login,
    logout,
  };
};
