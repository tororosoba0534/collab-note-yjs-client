import { PopupTemplate } from "./PopupTemplate";

export const ChangePasswordWindow = (props: {
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div>Change Password</div>
    </PopupTemplate>
  );
};
