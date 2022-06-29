import { useState } from "react";
import { useDeleteAccount } from "../../api/hooks";
import ErrorPage from "../errorPages/ErrorPage";
import { PopupTemplate } from "./PopupTemplate";

export const DeleteAccountWindow = (props: {
  setPopupStatus: React.Dispatch<
    React.SetStateAction<
      "deleteAccount" | "changeUserID" | "changePassword" | "logout" | null
    >
  >;
}) => {
  const { deleteAccount, status } = useDeleteAccount();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const handleClickDeleteAccount = () => {
    setLoadingStatus("loading");
    deleteAccount().then(({ status }) => {
      setLoadingStatus("finish");
    });
  };

  if (loadingStatus === "finish") {
    if (status === 200) {
      return (
        <PopupTemplate handleClose={null}>
          <div>This account has been successfully deleted!</div>
        </PopupTemplate>
      );
    } else {
      return <ErrorPage status={status} />;
    }
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
