import { useContext } from "react";
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
import { SessionTimeoutWindow } from "../popups/SessionTimeoutWindow";
import { TestWindow } from "../popups/TestWindow";
import { PersonalContext } from "./PersonalContext";

export const PopupsInPersonal = (props: {
  provider: CustomWSProvider;
  userID: string;
}) => {
  const { popupStatus } = useContext(PersonalContext);

  switch (popupStatus) {
    case null:
      return null;
    case "test":
      return <TestWindow />;
    case "sessionTimeout":
      return <SessionTimeoutWindow />;
    case "logout":
      return <LogoutWindow provider={props.provider} />;
    case "deleteAccountTry":
      return <DeleteAccountTryWindow realUserID={props.userID} />;
    case "changeUserIDTry":
      return <ChangeUserIDTryWindow />;
    case "changePasswordTry":
      return <ChangePasswordTryWindow />;
    case "deleteAccountOK":
      return <DeleteAccountOKWindow />;
    case "changeUserIDOK":
      return <ChangeUserIDOKWindow />;
    case "changePasswordOK":
      return <ChangePasswordOKWindow />;
    case "changeAdminPasswordTry":
      return <ChangeAdminPasswordTryWindow />;
    case "changeAdminPasswordOK":
      return <ChangeAdminPasswordOKWindow />;

    default:
      return null;
  }
};
