import { createContext, ReactNode, useState } from "react";

export type PopupStatus =
  | null
  | "logout"
  | "test"
  | "deleteAccountTry"
  | "deleteAccountOK"
  | "changeUserIDTry"
  | "changeUserIDOK"
  | "changePasswordTry"
  | "changePasswordOK"
  | "changeAdminPasswordTry"
  | "changeAdminPasswordOK";

export const PersonalContext = createContext<{
  popupStatus: PopupStatus;
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}>(null!);

export const PersonalProvider = (props: { children: ReactNode }) => {
  const [popupStatus, setPopupStatus] = useState<PopupStatus>(null);

  return (
    <PersonalContext.Provider value={{ popupStatus, setPopupStatus }}>
      {props.children}
    </PersonalContext.Provider>
  );
};
