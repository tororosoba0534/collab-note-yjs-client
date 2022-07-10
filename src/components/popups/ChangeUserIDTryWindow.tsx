import { useContext, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useChangeUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const ChangeUserIDTryWindow = () => {
  const { changeUserID } = useChangeUserID();
  const [submitMsg, setSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newUserID, setNewUserID] = useState<string>("");
  const [confirmUserID, setConfirmUserID] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const { setPopupStatus } = useContext(PersonalContext);

  const handleClickChange = () => {
    if (!newUserID || !confirmUserID || !adminPassword) {
      setSubmitMsg("Fill in all blanks");

      return;
    }

    if (Validate.isNotValidUserID(newUserID)) {
      setSubmitMsg("userID invalid");
      return;
    }

    if (newUserID !== confirmUserID) {
      setSubmitMsg("two user ID NOT matched");
      return;
    }

    setIsLoading(true);
    changeUserID(newUserID, adminPassword).then(({ status }) => {
      setIsLoading(false);
      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
      } else if (status === 200) {
        setPopupStatus("changeUserIDOK");
      } else if (status === 401) {
        setPopupStatus("sessionTimeout");
      } else if (status === 403) {
        setSubmitMsg("admin password is wrong.");
      } else if (status === 409) {
        setSubmitMsg(
          "The same userID has been already used! Please try another id."
        );
      } else if (status === 500) {
        setSubmitMsg(
          "500 Internal Server Error: Please wait for a minutes till the server is recovered."
        );
      } else {
        console.error("unexpected status code.");
      }
    });
  };

  return (
    <PopupTemplate handleClose={() => setPopupStatus(null)}>
      <div className="text-2xl">Change User ID</div>
      {isLoading ? (
        <div>Now waiting response...</div>
      ) : !submitMsg ? null : (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          {submitMsg}
        </div>
      )}

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
          onClick={() => setPopupStatus(null)}
        >
          Cancel
        </button>
      </div>
    </PopupTemplate>
  );
};
