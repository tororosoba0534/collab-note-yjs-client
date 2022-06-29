import { useState } from "react";
import { useChangeUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import ErrorPage from "../errorPages/ErrorPage";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { PopupTemplate } from "./PopupTemplate";

export const ChangeUserIDWindow = (props: {
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  const { changeUserID, status } = useChangeUserID();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const [newUserID, setNewUserID] = useState<string>("");
  const [confirmUserID, setConfirmUserID] = useState<string>("");

  const handleClickChange = () => {
    if (!newUserID || !confirmUserID) {
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
    changeUserID(newUserID).then(({ status }) => {
      setLoadingStatus("finish");
    });
  };

  if (loadingStatus === "finish") {
    if (status === 200) {
      return (
        <PopupTemplate handleClose={null}>
          <div>User ID has been successfully changed!</div>
        </PopupTemplate>
      );
    } else {
      return <ErrorPage status={status} />;
    }
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

        {/* <FloatingLabelInput
          label="New User ID"
          type="text"
          value={newUserID}
          onChange={(e) => setNewUserID(e.currentTarget.value)}
        /> */}

        {/* <FloatingLabelInput
          label="Confirm New User ID"
          type="text"
          value={confirmUserID}
          onChange={(e) => setConfirmUserID(e.currentTarget.value)}
        /> */}

        <ConfirmInputWithMsg
          label="Confirm new UserID"
          type="text"
          confirm={confirmUserID}
          setConfirm={setConfirmUserID}
          original={newUserID}
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
