import { useContext, useState } from "react";
import { useChangeAdminPassword } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import ErrorPage from "../errorPages/ErrorPage";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const ChangeAdminPasswordTryWindow = () => {
  const { changeAdminPassword, status } = useChangeAdminPassword();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const { setPopupStatus } = useContext(PersonalContext);

  const [newAdmin, setNewAdmin] = useState("");
  const [confirmNewAdmin, setConfirmNewAdmin] = useState("");
  const [oldAdmin, setOldAdmin] = useState("");

  const handleClickChange = () => {
    if (!newAdmin || !confirmNewAdmin || !oldAdmin) {
      console.log("Fill in all blanks");
      return;
    }

    if (newAdmin !== confirmNewAdmin) {
      console.log("two password NOT matched");
      return;
    }
    if (Validate.isNotValidPassword(newAdmin)) {
      console.log("password invalid");

      return;
    }
    if (newAdmin === oldAdmin) {
      console.log("new admin password doesn't change.");
    }

    setLoadingStatus("loading");
    changeAdminPassword(oldAdmin, newAdmin).then(({ status }) => {
      setLoadingStatus("finish");
      if (status === 200) {
        setPopupStatus("changeAdminPasswordOK");
      }
    });
  };

  if (loadingStatus === "finish" && status !== 200) {
    return <ErrorPage status={status} />;
  }

  return (
    <PopupTemplate handleClose={() => setPopupStatus(null)}>
      <div className="flex flex-col justify-around gap-10">
        <div className="text-center">Change User ID</div>

        <PasswordInputWithMsg
          label="new admin password"
          password={newAdmin}
          setPassword={setNewAdmin}
        />

        <ConfirmInputWithMsg
          confirm={confirmNewAdmin}
          setConfirm={setConfirmNewAdmin}
          original={newAdmin}
          type="password"
          label="new admin password again"
        />

        <FloatingLabelInput
          label="old admin password"
          type="password"
          value={oldAdmin}
          onChange={(e) => setOldAdmin(e.currentTarget.value)}
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
            onClick={() => setPopupStatus(null)}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupTemplate>
  );
};
