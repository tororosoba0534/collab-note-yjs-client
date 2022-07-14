import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsCheckUserID = 200 | 400 | 409 | 500;
export type ReturnCheckUserID = ReturnBaseFetch<NumsCheckUserID>;
export const fetchCheckUserID = async (
  userID: string
): Promise<ReturnCheckUserID> => {
  const { status } = await baseFetch("/check-userid", {
    userID,
  });

  if (isThrownErr(status)) return { status };

  if (status !== 200 && status !== 400 && status !== 409 && status !== 500)
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
