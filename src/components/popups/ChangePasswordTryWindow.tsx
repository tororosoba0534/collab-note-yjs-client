import { useContext, useEffect, useRef, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useChangePassword } from "../../api/hooks/useChangePassword";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { PersonalContext } from "../pages/personal/PersonalContext";
import { ScrollPopupTemplate } from "./ScrollPopupTemplate";
import { ScrollPopupInner } from "./ScrollPopupInner";

export const ChangePasswordTryWindow = () => {
  const { changePassword } = useChangePassword();
  const [submitMsg, setSubmitMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const { setPopupStatus } = useContext(PersonalContext);

  const submitBtnElm = useRef<HTMLButtonElement | null>(null);

  // Prevent abusing too many fetches
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [password, adminPassword]);

  const handleClickChange = () => {
    if (!password || !confirmPassword || !adminPassword) {
      setSubmitMsg("Fill in all the blanks");
      return;
    }

    if (password !== confirmPassword) {
      setSubmitMsg("two password NOT matched");
      return;
    }
    if (Validate.isNotValidPassword(password)) {
      setSubmitMsg("password invalid");
      return;
    }
    if (password === adminPassword) {
      setSubmitMsg("new password should differ from admin password");
      return;
    }

    if (!canSubmit.current) return;
    canSubmit.current = false;
    setIsLoading(true);
    changePassword(password, adminPassword).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        setPopupStatus("changePasswordOK");
        return;
      }
      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
        return;
      }
      if (status === 204) {
        setSubmitMsg("new password is completely same as current one.");
        return;
      }
      if (status === 400) {
        setSubmitMsg("contains invalid value.");
        return;
      }
      if (status === 401) {
        setPopupStatus("sessionTimeout");
        return;
      }
      if (status === 403) {
        setSubmitMsg("admin password is wrong.");
        return;
      }
      if (status === 409) {
        setSubmitMsg(
          "New password should be different from current admin password."
        );
        return;
      }
      if (status === 500) {
        setSubmitMsg(
          "500 Internal Server Error: Please wait for a minutes till the server is recovered."
        );
        return;
      }
      console.error("unexpected status code.");
    });
  };

  return (
    <ScrollPopupTemplate
      submitBtnElm={submitBtnElm}
      handleClose={() => setPopupStatus(null)}
      isLoading={isLoading}
      submitMsg={submitMsg}
      title="Change Password"
    >
      <ScrollPopupInner>
        <PasswordInputWithMsg
          label="new password"
          password={password}
          setPassword={setPassword}
        />

        <ConfirmInputWithMsg
          confirm={confirmPassword}
          setConfirm={setConfirmPassword}
          original={password}
          type="password"
          label="Confirm Password"
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
          ref={submitBtnElm}
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
