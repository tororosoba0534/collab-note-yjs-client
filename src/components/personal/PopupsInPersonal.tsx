import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { ChangeAdminPasswordOKWindow } from "../popups/ChangeAdminPasswordOKWindow";
import { ChangeAdminPasswordTryWindow } from "../popups/ChangeAdminPasswordTryWindow";
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
  provider: CustomWSProvider;
  popupStatus: PopupStatus;
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
  userID: string;
}) => {
  switch (props.popupStatus) {
    case null:
      return null;
    case "test":
      return <TestWindow setPopupStatus={props.setPopupStatus} />;
    case "logout":
      return (
        <LogoutWindow
          provider={props.provider}
          setPopupStatus={props.setPopupStatus}
        />
      );
    case "deleteAccountTry":
      return (
        <DeleteAccountTryWindow
          setPopupStatus={props.setPopupStatus}
          realUserID={props.userID}
        />
      );
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
    case "changeAdminPasswordTry":
      return (
        <ChangeAdminPasswordTryWindow setPopupStatus={props.setPopupStatus} />
      );
    case "changeAdminPasswordOK":
      return <ChangeAdminPasswordOKWindow />;

    default:
      return null;
  }
};
