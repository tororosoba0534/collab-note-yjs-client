import config from "../config";
import { error2String } from "../utils/errorHandlings";

export type ThrownErr = string;

export const isThrownErr = (status: unknown): status is ThrownErr => {
  return typeof status === "string";
};

export type Status<Nums> = Nums | ThrownErr;

export type ReturnBaseFetch<Nums> = {
  status: Status<Nums>;
};

export const baseFetch = async (
  route: string,
  reqJSON: unknown
): Promise<
  ReturnBaseFetch<number> & {
    resJSON: Record<string, unknown> | null | undefined;
  }
> => {
  let realRoute = route;
  if (realRoute[0] !== "/") {
    realRoute = "/" + realRoute;
  }
  try {
    const { status, resJSON } = await fetch(config.server.ORIGIN + realRoute, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqJSON),
    }).then(async (response) => {
      const status = response.status;
      let resJSON;
      try {
        // If API doesn't return JSON body, this line throw an error like:
        // "unexpected token o in json at position 0"
        resJSON = await response.json();
      } catch {
        resJSON = null;
      }

      return { status, resJSON };
    });

    return { status, resJSON };
  } catch (e) {
    return { status: error2String(e), resJSON: null };
    // return { status: "clientError", resJSON: null, error: e };
  }
};
