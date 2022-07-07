import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../../api/base";
import { useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { ConfirmInputWithMsg } from "../form/ConfirmInputWithMsg";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { FormTitle } from "../form/FormTitle";
import { PasswordInputWithMsg } from "../form/PasswordInputWithMsg";
import { UserIDInputWithMsg } from "../form/UserIDInputWithMsg";

const CreateAccount = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [isUserIDUnused, setIsUserIDUnused] = useState(false);

  const [submitMsg, setSubmitMsg] = useState("");
  const [didSubmitOnce, setDidSubmitOnce] = useState(false);

  const { createAccount, status } = useCreateAccount();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("submit clicked");

    setDidSubmitOnce(true);
    setSubmitMsg("");
    setIsLoading(true);

    if (!userID || !password || !confirmPassword || !adminPassword) {
      setSubmitMsg("fill in all the fields.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setSubmitMsg("two passwords are NOT matched.");
      setIsLoading(false);
      return;
    }

    if (
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password) ||
      Validate.isNotValidPassword(adminPassword) ||
      password === adminPassword
    ) {
      setSubmitMsg("contains invalid value");
      setIsLoading(false);
      return;
    }

    createAccount(userID, password, adminPassword).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        navigate("/login");
        return;
        // console.log("create account succeeded!");
        // return;
      }

      setPassword("");
      setConfirmPassword("");

      if (isThrownErr(status)) {
        setSubmitMsg(status);
        return;
      }

      if (status === 403) {
        setSubmitMsg(
          "The same userID is already used! Please use different one."
        );
        return;
      }

      if (status === 400) {
        setSubmitMsg(
          "400 Bad Request: If you see this message, please tell us!"
        );
        return;
      }

      setSubmitMsg("500 Internal Server Error: Wait a minutes, please!");
    });
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center gap-8 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white mt-10 mb-10">
        <FormTitle
          title="Create new account"
          didSubmitOnce={didSubmitOnce}
          submitMsg={submitMsg}
          isLoading={isLoading}
          redirectLabel="login page"
          redirectRoute="/login"
        />

        <UserIDInputWithMsg
          label="UserID"
          userID={userID}
          setUserID={setUserID}
          setIsUserIDAvailable={setIsUserIDUnused}
        />

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

        <FloatingLabelInput
          label="Admin Password"
          type="password"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.currentTarget.value)}
        />

        {password !== confirmPassword ||
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
        )}

        <div>
          ... or already have an account?{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to="/login"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
