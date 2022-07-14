import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsCheckAuth = 200 | 401 | 500;
export type ReturnCheckAuth = ReturnBaseFetch<NumsCheckAuth> & {
  userID: string;
};
export const fetchCheckAuth = async (
  sessionID: string
): Promise<ReturnCheckAuth> => {
  const route = "/personal/check-auth";

  const { status, resJSON } = await baseFetch(route, { sessionID });

  if (isThrownErr(status)) return { status, userID: "" };

  if (!resJSON) {
    return {
      status: `Response JSON is nullable`,
      userID: "",
    };
  }

  const userID = resJSON.userID;

  if (typeof userID !== "string")
    return {
      status: `Invalid response type: "${typeof userID}"`,
      userID: "",
    };

  if (status !== 200 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
      userID: "",
    };

  return { userID, status };
};
