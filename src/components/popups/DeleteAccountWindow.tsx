import { useDeleteAccount } from "../../api/hooks";
import { PopupTemplate } from "./PopupTemplate";

export const DeleteAccountWindow = (props: {
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div>Delete Account</div>
    </PopupTemplate>
  );
};
