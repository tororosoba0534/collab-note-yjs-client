import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { ExclamationSvg } from "../form/ExclamationSvg";
import { FormBase } from "../form/FormBase";
import { FormFrame } from "../form/FormFrame";
import { FormTitle } from "../form/FormTitle";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { ValMsgBox } from "../form/ValMsgBox";
import { CreateAccountTryWindow } from "../popups/CreateAccountTryWindow";
import { CANextButton } from "./CANextButton";
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

  const userIDRef = useRef<HTMLInputElement | null>(null);
  const confirmUserIDRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
  const adminRef = useRef<HTMLInputElement | null>(null);
  const confirmAdminRef = useRef<HTMLInputElement | null>(null);

  const next1Ref = useRef<HTMLButtonElement | null>(null);
  const next2Ref = useRef<HTMLButtonElement | null>(null);
  const next3Ref = useRef<HTMLButtonElement | null>(null);

  return (
    <FormBase>
      <FormTitle
        title="Create new account"
        didSubmitOnce={didSubmitOnce}
        submitMsg={submitMsg}
        isLoading={isLoading}
        redirectLabel="login page"
        redirectRoute="/login"
      />
      <div className="w-full">
        <FormFrame>
          <UserIDInputWithMsg
            ref={userIDRef}
            label="UserID"
            userID={userID}
            setUserID={setUserID}
            setIsUserIDAvailable={setIsUserIDUnused}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (Validate.isNotValidUserID(userID)) return;
                confirmUserIDRef.current?.focus();
              }
            }}
          />
          <ConfirmInputWithMsg
            ref={confirmUserIDRef}
            label={"input UserID again"}
            type="text"
            confirm={confirmUserID}
            setConfirm={setConfirmUserID}
            original={userID}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (
                  userID !== confirmUserID ||
                  Validate.isNotValidUserID(userID)
                ) {
                  return;
                }
                if (step === 1) {
                  next1Ref.current?.click();
                }
                passwordRef.current?.focus();
              }
            }}
          />
        </FormFrame>

        {step === 1 ? (
          <CANextButton
            ref={next1Ref}
            disable={
              Validate.isNotValidUserID(userID) ||
              !isUserIDUnused ||
              userID !== confirmUserID
            }
            // nextFocusHandler={() => {
            //   passwordRef.current?.focus();
            // }}
          />
        ) : (
          <FormFrame>
            <PasswordInputWithMsg
              ref={passwordRef}
              label="Password"
              password={password}
              setPassword={setPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (Validate.isNotValidPassword(password)) return;
                  confirmPasswordRef.current?.focus();
                }
              }}
              onFirstRender={() => passwordRef.current?.focus()}
            />

            <ConfirmInputWithMsg
              ref={confirmPasswordRef}
              label="Input password again"
              type="password"
              original={password}
              confirm={confirmPassword}
              setConfirm={setConfirmPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    password !== confirmPassword ||
                    Validate.isNotValidPassword(password)
                  )
                    return;
                  if (step === 2) {
                    next2Ref.current?.click();
                  }
                  adminRef.current?.focus();
                }
              }}
            />
          </FormFrame>
        )}

        {step === 1 ? null : step === 2 ? (
          <CANextButton
            ref={next2Ref}
            disable={
              Validate.isNotValidUserID(userID) ||
              !isUserIDUnused ||
              Validate.isNotValidPassword(password) ||
              password !== confirmPassword
            }
            // nextFocusHandler={() => {
            //   adminRef.current?.focus();
            // }}
          />
        ) : (
          <FormFrame>
            <PasswordInputWithMsg
              ref={adminRef}
              label="Admin Password"
              password={adminPassword}
              setPassword={setAdminPassword}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    adminPassword === password ||
                    Validate.isNotValidPassword(adminPassword)
                  )
                    return;
                  confirmAdminRef.current?.focus();
                }
              }}
              onFirstRender={() => adminRef.current?.focus()}
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
              ref={confirmAdminRef}
              confirm={confirmAdmin}
              setConfirm={setConfirmAdmin}
              original={adminPassword}
              type="password"
              label="input Admin Password again"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (
                    adminPassword !== confirmAdmin ||
                    adminPassword === password ||
                    Validate.isNotValidPassword(adminPassword)
                  )
                    return;
                  next3Ref.current?.click();
                }
              }}
            />
          </FormFrame>
        )}

        {step < 3 ? null : (
          <CANextButton
            ref={next3Ref}
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
    </FormBase>
  );
};

export default CreateAccount;
