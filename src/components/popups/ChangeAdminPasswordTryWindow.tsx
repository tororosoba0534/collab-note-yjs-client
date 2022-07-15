import { useContext, useEffect, useRef, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useChangeAdminPassword } from "../../api/hooks/useChangeAdminPassword";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormFrame } from "../form/FormFrame";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";
import { ScrollPopupInner } from "./ScrollPopupInner";
import { ScrollPopupTemplate } from "./ScrollPopupTemplate";

export const ChangeAdminPasswordTryWindow = () => {
  const { changeAdminPassword } = useChangeAdminPassword();
  const [submitMsg, setSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setPopupStatus } = useContext(PersonalContext);

  const [newAdmin, setNewAdmin] = useState("");
  const [confirmNewAdmin, setConfirmNewAdmin] = useState("");
  const [oldAdmin, setOldAdmin] = useState("");

  // Prevent abusing too many fetches
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [newAdmin, oldAdmin]);

  const handleClickChange = () => {
    if (!newAdmin || !confirmNewAdmin || !oldAdmin) {
      setSubmitMsg("Fill in all the blanks");
      return;
    }

    if (newAdmin !== confirmNewAdmin) {
      setSubmitMsg("two password NOT matched");
      return;
    }
    if (Validate.isNotValidPassword(newAdmin)) {
      setSubmitMsg("password invalid");

      return;
    }
    if (newAdmin === oldAdmin) {
      setSubmitMsg("new admin password doesn't change.");
      return;
    }

    if (!canSubmit.current) return;
    canSubmit.current = false;
    setIsLoading(true);
    changeAdminPassword(oldAdmin, newAdmin).then(({ status }) => {
      setIsLoading(false);
      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
      } else if (status === 200) {
        setPopupStatus("changeAdminPasswordOK");
      } else if (status === 204) {
        setSubmitMsg("new admin password is completely same as old one.");
      } else if (status === 401) {
        setPopupStatus("sessionTimeout");
      } else if (status === 403) {
        setSubmitMsg("admin password is wrong.");
      } else if (status === 409) {
        setSubmitMsg(
          "New admin password should be different from current password."
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
      title="Change Admin Password"
      isLoading={isLoading}
      submitMsg={submitMsg}
      handleClose={() => setPopupStatus(null)}
    >
      <ScrollPopupInner>
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
          label="input again"
        />
      </ScrollPopupInner>

      <ScrollPopupInner>
        <FloatingLabelInput
          label="old admin password"
          type="password"
          value={oldAdmin}
          onChange={(e) => setOldAdmin(e.currentTarget.value)}
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
