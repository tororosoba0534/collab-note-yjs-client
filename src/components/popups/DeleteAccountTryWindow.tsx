import { useState } from "react";
import { useDeleteAccount } from "../../api/hooks";
import ErrorPage from "../errorPages/ErrorPage";
import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const DeleteAccountTryWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  const { deleteAccount, status } = useDeleteAccount();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const handleClickDeleteAccount = () => {
    setLoadingStatus("loading");
    deleteAccount().then(({ status }) => {
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
      <div className="text-center">Delete Account</div>

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
    </PopupTemplate>
  );
};
