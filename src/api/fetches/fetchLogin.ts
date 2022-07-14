import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsLogin = 200 | 400 | 401 | 500;
export type ReturnLogin = ReturnBaseFetch<NumsLogin>;
export const fetchLogin = async (
  userID: string,
  password: string
): Promise<
  ReturnLogin & {
    sessionID: string;
  }
> => {
  const route = "/login";
  const { status, resJSON } = await baseFetch(route, {
    userID,
    password,
  });

  if (isThrownErr(status)) return { status, sessionID: "" };

  if (!resJSON) {
    return {
      status: `Response JSON is nullable`,
      sessionID: "",
    };
  }

  const sessionID = resJSON.sessionID;

  if (typeof sessionID !== "string")
    return {
      status: `Invalid response type: "${typeof sessionID}"`,
      sessionID: "",
    };

  if (status !== 200 && status !== 400 && status !== 401 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
      sessionID: "",
    };

  return { sessionID, status };
};
