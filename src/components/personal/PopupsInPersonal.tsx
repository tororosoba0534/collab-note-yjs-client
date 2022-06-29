import { ChangePasswordWindow } from "../popups/ChangePasswordWindow";
import { ChangeUserIDWindow } from "../popups/ChangeUserIDWindow";
import { DeleteAccountWindow } from "../popups/DeleteAccountWindow";
import { LogoutWindow } from "../popups/LogoutWindow";

export const PopupsInPersonal = (props: {
  popupStatus:
    | "deleteAccount"
    | "changeUserID"
    | "changePassword"
    | "logout"
    | null;
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  switch (props.popupStatus) {
    case "logout":
      return <LogoutWindow setPopupStatus={props.setPopupStatus} />;
    case "deleteAccount":
      return <DeleteAccountWindow setPopupStatus={props.setPopupStatus} />;
    case "changeUserID":
      return <ChangeUserIDWindow setPopupStatus={props.setPopupStatus} />;
    case "changePassword":
      return <ChangePasswordWindow setPopupStatus={props.setPopupStatus} />;
    default:
      return null;
  }
};
