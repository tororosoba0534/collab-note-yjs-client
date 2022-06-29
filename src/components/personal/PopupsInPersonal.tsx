import { ChangePasswordOKWindow } from "../popups/ChangePasswordOKWindow";
import { ChangePasswordTryWindow } from "../popups/ChangePasswordTryWindow";
import { ChangeUserIDOKWindow } from "../popups/ChangeUserIDOKWindow";
import { ChangeUserIDTryWindow } from "../popups/ChangeUserIDTryWindow";
import { DeleteAccountOKWindow } from "../popups/DeleteAccountOKWindow";
import { DeleteAccountTryWindow } from "../popups/DeleteAccountTryWindow";
import { LogoutWindow } from "../popups/LogoutWindow";
import { TestWindow } from "../popups/TestWindow";
import { PopupStatus } from "./TiptapEditor";

export const PopupsInPersonal = (props: {
  popupStatus: PopupStatus;
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  switch (props.popupStatus) {
    case null:
      return null;
    case "test":
      return <TestWindow setPopupStatus={props.setPopupStatus} />;
    case "logout":
      return <LogoutWindow setPopupStatus={props.setPopupStatus} />;
    case "deleteAccountTry":
      return <DeleteAccountTryWindow setPopupStatus={props.setPopupStatus} />;
    case "changeUserIDTry":
      return <ChangeUserIDTryWindow setPopupStatus={props.setPopupStatus} />;
    case "changePasswordTry":
      return <ChangePasswordTryWindow setPopupStatus={props.setPopupStatus} />;
    case "deleteAccountOK":
      return <DeleteAccountOKWindow />;
    case "changeUserIDOK":
      return <ChangeUserIDOKWindow />;
    case "changePasswordOK":
      return <ChangePasswordOKWindow />;

    default:
      return null;
  }
};
