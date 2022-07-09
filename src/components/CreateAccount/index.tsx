import { useContext } from "react";
import { Link } from "react-router-dom";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { ExclamationSvg } from "../form/ExclamationSvg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormTitle } from "../form/FormTitle";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { ValMsgBox } from "../form/ValMsgBox";
import { CreateAccountTryWindow } from "../popups/CreateAccountTryWindow";
import { CANextButton } from "./CANextButton";
import { CAStep } from "./CAStep";
import { CreateAccountContext } from "./CreateAccountContext";

const CreateAccount = () => {
  const {
    didSubmitOnce,
    submitMsg,
    isLoading,
    userID,
    setUserID,
    confirmUserID,
    setConfirmUserID,
    setIsUserIDUnused,
    step,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    adminPassword,
    setAdminPassword,
    confirmAdmin,
    setConfirmAdmin,
    isUserIDUnused,
  } = useContext(CreateAccountContext);
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center gap-8 py-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-gray-100 mt-10 mb-10">
        <FormTitle
          title="Create new account"
          didSubmitOnce={didSubmitOnce}
          submitMsg={submitMsg}
          isLoading={isLoading}
          redirectLabel="login page"
          redirectRoute="/login"
        />
        <div className="w-full">
          <CAStep step={1}>
            <UserIDInputWithMsg
              label="UserID"
              userID={userID}
              setUserID={setUserID}
              setIsUserIDAvailable={setIsUserIDUnused}
            />
            <ConfirmInputWithMsg
              label={"input UserID again"}
              type="text"
              confirm={confirmUserID}
              setConfirm={setConfirmUserID}
              original={userID}
            />
          </CAStep>

          {step === 1 ? (
            <CANextButton
              disable={
                Validate.isNotValidUserID(userID) ||
                !isUserIDUnused ||
                userID !== confirmUserID
              }
            />
          ) : (
            <CAStep step={2}>
              <PasswordInputWithMsg
                label="Password"
                password={password}
                setPassword={setPassword}
              />

              <ConfirmInputWithMsg
                label="Input password again"
                type="password"
                original={password}
                confirm={confirmPassword}
                setConfirm={setConfirmPassword}
              />
            </CAStep>
          )}

          {step === 1 ? null : step === 2 ? (
            <CANextButton
              disable={
                Validate.isNotValidUserID(userID) ||
                !isUserIDUnused ||
                Validate.isNotValidPassword(password) ||
                password !== confirmPassword
              }
            />
          ) : (
            <CAStep step={3}>
              <PasswordInputWithMsg
                label="Admin Password"
                password={adminPassword}
                setPassword={setAdminPassword}
              >
                <ValMsgBox
                  label="NOT same as password?"
                  errStatus={
                    Validate.isNotValidPassword(adminPassword)
                      ? "disabled"
                      : adminPassword === password
                      ? "NG"
                      : "OK"
                  }
                  errMsg={ExclamationSvg()}
                />
              </PasswordInputWithMsg>

              <ConfirmInputWithMsg
                confirm={confirmAdmin}
                setConfirm={setConfirmAdmin}
                original={adminPassword}
                type="password"
                label="input Admin Password again"
              />
            </CAStep>
          )}

          {step < 3 ? null : (
            <CANextButton
              label="Confirm"
              disableLabel="NEXT"
              disable={
                password !== confirmPassword ||
                Validate.isNotValidUserID(userID) ||
                Validate.isNotValidPassword(password) ||
                !isUserIDUnused ||
                Validate.isNotValidPassword(adminPassword) ||
                adminPassword === password ||
                adminPassword !== confirmAdmin
              }
            />
          )}
        </div>

        <div className="p-5 pt-0">
          ... or already have an account?{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to="/login"
          >
            LOGIN
          </Link>
        </div>

        {step !== 4 ? null : <CreateAccountTryWindow />}
      </div>
    </div>
  );
};

export default CreateAccount;
