import { useContext } from "react";
import { Link } from "react-router-dom";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormTitle } from "../form/FormTitle";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";
import { CreateAccountTryWindow } from "../popups/CreateAccountTryWindow";
import { CANextButton } from "./CANextButton";
import { CAStep } from "./CAStep";
import {
  CreateAccountContext,
  CreateAccountProvider,
} from "./CreateAccountContext";

const CreateAccount = () => {
  const {
    didSubmitOnce,
    submitMsg,
    isLoading,
    userID,
    setUserID,
    setIsUserIDUnused,
    step,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    adminPassword,
    setAdminPassword,
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
          </CAStep>

          {step === 1 ? (
            <CANextButton
              disable={Validate.isNotValidUserID(userID) || !isUserIDUnused}
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
              <FloatingLabelInput
                label="Admin Password"
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.currentTarget.value)}
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
                adminPassword === password
              }
            />
          )}
        </div>

        {/* {password !== confirmPassword ||
        Validate.isNotValidUserID(userID) ||
        Validate.isNotValidPassword(password) ||
        !isUserIDUnused ? (
          <button
            className="px-4 py-2 rounded bg-gray-300 text-white font-semibold text-center block w-full cursor-not-allowed"
            disabled
          >
            CREATE
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
            onClick={() => handleSubmit()}
          >
            CREATE
          </button>
        )} */}

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
