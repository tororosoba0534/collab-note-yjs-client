import { useState } from "react";
import { useDeleteAccount } from "../../api/hooks";
import ErrorPage from "../errorPages/ErrorPage";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const DeleteAccountTryWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
  realUserID: string;
}) => {
  const { deleteAccount, status } = useDeleteAccount();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");
  const [confirmUserID, setConfirmUserID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const handleClickDeleteAccount = () => {
    if (!confirmUserID || !adminPassword) {
      console.log("Fill in all blanks");
      return;
    }
    if (confirmUserID !== props.realUserID) {
      console.log("User ID wrong.");
      return;
    }
    setLoadingStatus("loading");
    deleteAccount(adminPassword).then(({ status }) => {
      setLoadingStatus("finish");
      if (status === 200) {
        props.setPopupStatus("deleteAccountOK");
      }
    });
  };

  if (loadingStatus === "finish" && status !== 200) {
    return <ErrorPage status={status} />;
  }

  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div className="">
        <div className="text-center">Delete Account</div>
        <div className="flex flex-col">
          <div>
            This is very dangerous operation. You can NOT recover your account.
            If you'd like to delete this account, please fill in the below blank
            with your user ID.
          </div>
          <input
            className="border-2 border-gray-300 rounded-full px-3 focus:outline-none focus:border-rose-600"
            value={confirmUserID}
            onChange={(e) => setConfirmUserID(e.currentTarget.value)}
          />
        </div>
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
              handleClickDeleteAccount();
            }}
          >
            Delete
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
