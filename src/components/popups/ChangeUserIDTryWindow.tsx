import { useState } from "react";
import { useChangeUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import ErrorPage from "../errorPages/ErrorPage";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const ChangeUserIDTryWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  const { changeUserID, status } = useChangeUserID();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const [newUserID, setNewUserID] = useState<string>("");
  const [confirmUserID, setConfirmUserID] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const handleClickChange = () => {
    if (!newUserID || !confirmUserID || !adminPassword) {
      console.log("Fill in all blanks");
      return;
    }

    if (newUserID !== confirmUserID) {
      console.log("two user ID NOT matched");
    }
    if (Validate.isNotValidUserID(newUserID)) {
      console.log("userID invalid");

      return;
    }

    setLoadingStatus("loading");
    changeUserID(newUserID, adminPassword).then(({ status }) => {
      setLoadingStatus("finish");
      if (status === 200) {
        console.log("change userID succeeded!");
        props.setPopupStatus("changeUserIDOK");
      }
    });
  };

  if (loadingStatus === "finish" && status !== 200) {
    return <ErrorPage status={status} />;
  }

  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div className="flex flex-col justify-around gap-10">
        <div className="text-center">Change User ID</div>

        <UserIDInputWithMsg
          label="New User ID"
          userID={newUserID}
          setUserID={setNewUserID}
        />

        <ConfirmInputWithMsg
          label="Confirm new UserID"
          type="text"
          confirm={confirmUserID}
          setConfirm={setConfirmUserID}
          original={newUserID}
        />

        <FloatingLabelInput
          label="Admin Password"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.currentTarget.value)}
        />

        <div className="flex items-center justify-around h-20">
          <button
            className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
            onClick={() => {
              handleClickChange();
            }}
          >
            Change
          </button>
          <button
            className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
            onClick={() => props.setPopupStatus(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupTemplate>
  );
};
