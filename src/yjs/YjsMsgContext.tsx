import { createContext, useState } from "react";

export type YjsMsgStatus =
  | null
  | "deleteAccount"
  | "changeUserID"
  | "changePassword"
  | "test";

export const YjsMsgContext = createContext<{
  yjsMsgStatus: YjsMsgStatus;
  setYjsMsgStatus: React.Dispatch<React.SetStateAction<YjsMsgStatus>>;
}>(null!);

export const YjsMsgProvider = ({ children }: any) => {
  const [yjsMsgStatus, setYjsMsgStatus] = useState<YjsMsgStatus>(null);

  return (
    <YjsMsgContext.Provider value={{ yjsMsgStatus, setYjsMsgStatus }}>
      {children}
    </YjsMsgContext.Provider>
  );
};
