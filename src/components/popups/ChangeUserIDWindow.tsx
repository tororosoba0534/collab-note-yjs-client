import { PopupTemplate } from "./PopupTemplate";

export const ChangeUserIDWindow = (props: {
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div>Change User ID</div>
    </PopupTemplate>
  );
};
