import { useContext, useEffect, useRef, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useChangeUserID } from "../../api/hooks/useChangeUserID";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormFrame } from "../form/FormFrame";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";
import { ScrollPopupInner } from "./ScrollPopupInner";
import { ScrollPopupTemplate } from "./ScrollPopupTemplate";

export const ChangeUserIDTryWindow = () => {
  const { changeUserID } = useChangeUserID();
  const [submitMsg, setSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [newUserID, setNewUserID] = useState<string>("");
  const [confirmUserID, setConfirmUserID] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const { setPopupStatus } = useContext(PersonalContext);

  // Prevent abusing too many fetches
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [newUserID, adminPassword]);

  const handleClickChange = () => {
    if (!newUserID || !confirmUserID || !adminPassword) {
      setSubmitMsg("Fill in all the blanks");

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

    if (!canSubmit.current) return;
    canSubmit.current = false;
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
    <ScrollPopupTemplate
      title="Change User ID"
      isLoading={isLoading}
      submitMsg={submitMsg}
      handleClose={() => setPopupStatus(null)}
    >
      <ScrollPopupInner>
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
      </ScrollPopupInner>

      <ScrollPopupInner>
        <FloatingLabelInput
          label="Admin Password"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.currentTarget.value)}
        />
      </ScrollPopupInner>

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
    </ScrollPopupTemplate>
  );
};
