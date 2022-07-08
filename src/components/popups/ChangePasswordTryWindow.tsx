import { useContext, useState } from "react";
import { useChangePassword } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import ErrorPage from "../errorPages/ErrorPage";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const ChangePasswordTryWindow = () => {
  const { changePassword, status } = useChangePassword();
  const [loadingStatus, setLoadingStatus] = useState<
    "notYet" | "loading" | "finish"
  >("notYet");

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");

  const { setPopupStatus } = useContext(PersonalContext);

  const handleClickChange = () => {
    if (!password || !confirmPassword || !adminPassword) {
      console.log("Fill in all blanks");
      return;
    }

    if (password !== confirmPassword) {
      console.log("two password NOT matched");
      return;
    }
    if (Validate.isNotValidPassword(password)) {
      console.log("password invalid");

      return;
    }
    if (password === adminPassword) {
      console.log("new password should differ from admin password");
    }

    setLoadingStatus("loading");
    changePassword(password, adminPassword).then(({ status }) => {
      setLoadingStatus("finish");
      if (status === 200) {
        setPopupStatus("changePasswordOK");
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
      </div>
    </PopupTemplate>
  );
};
