import { useState } from "react";
import { fetchCheckUsername } from "../api/fetches";
import config from "../config";

export const useCheckUsername = () => {
  const [checkUsernameMessage, setCheckUsernameMessage] = useState("");

  const checkUsername = async (username: string) => {
    setCheckUsernameMessage("");

    const { isValidName } = await fetchCheckUsername(username);

    // const result: boolean = await fetch(
    //   config.server.ORIGIN + "/check-username",
    //   {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (typeof data.isValidName !== "boolean") {
    //       console.log("response data type invalid.");

    //       return false;
    //     }

    //     if (data.isValidName) {
    //       return true;
    //     }
    //     return false;
    //   });

    if (isValidName) {
      setCheckUsernameMessage("Valid username. You can use it.");
    } else {
      setCheckUsernameMessage(
        "The same username is already used. You should change it."
      );
    }

    return isValidName;
  };
  return {
    checkUsername,
    checkUsernameMessage,
  };
};
