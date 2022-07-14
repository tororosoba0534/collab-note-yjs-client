import { baseFetch, isThrownErr, ReturnBaseFetch } from "../base";

export type NumsChangeAdminPassword = 200 | 400 | 401 | 403 | 409 | 500;
export type ReturnChangeAdminPassword =
  ReturnBaseFetch<NumsChangeAdminPassword>;
export const fetchChangeAdminPassword = async (
  sessionID: string,
  oldAdminPassword: string,
  newAdminPassword: string
): Promise<ReturnChangeAdminPassword> => {
  const { status } = await baseFetch("/personal/change-admin-password", {
    sessionID,
    oldAdminPassword,
    newAdminPassword,
  });

  if (isThrownErr(status)) return { status };

  if (
    status !== 200 &&
    status !== 400 &&
    status !== 401 &&
    status !== 403 &&
    status !== 409 &&
    status !== 500
  )
    return {
      status: `Unexpected status code: ${status}`,
    };

  return { status };
};
