import { createContext, useState } from "react";

export type YjsMsgStatus =
  | null
  | "deleteAccount"
  | "changeUserID"
  | "changePassword"
  | "test";

export type IsYjsOriginOf =
  | null
  | "deleteAccount"
  | "changeUserID"
  | "changePassword";

export const YjsMsgContext = createContext<{
  yjsMsgStatus: YjsMsgStatus;
  setYjsMsgStatus: React.Dispatch<React.SetStateAction<YjsMsgStatus>>;
  isYjsOriginOf: IsYjsOriginOf;
  setIsYjsOriginOf: React.Dispatch<React.SetStateAction<IsYjsOriginOf>>;
}>(null!);

export const YjsMsgProvider = ({ children }: any) => {
  const [yjsMsgStatus, setYjsMsgStatus] = useState<YjsMsgStatus>(null);
  const [isYjsOriginOf, setIsYjsOriginOf] = useState<IsYjsOriginOf>(null);

  return (
    <YjsMsgContext.Provider
      value={{ yjsMsgStatus, setYjsMsgStatus, isYjsOriginOf, setIsYjsOriginOf }}
    >
      {children}
    </YjsMsgContext.Provider>
  );
};
