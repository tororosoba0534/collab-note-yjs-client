import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../../api/base";
import { useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { CAConfirmPasswordInput } from "../form/CAConfirmPasswordInput";
import { CAPasswordInput } from "../form/CAPasswordInput";
import { CAUserIDInput } from "../form/CAUserIDInput";
import { FormTitle } from "../form/FormTitle";

const CreateAccount = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (!userID || !password || !confirmPassword) {
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
      Validate.isNotValidPassword(password)
    ) {
      setSubmitMsg("userID or password or both are invalid");
      setIsLoading(false);
      return;
    }

    createAccount(userID, password).then(({ status }) => {
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
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <FormTitle
          didSubmitOnce={didSubmitOnce}
          submitMsg={submitMsg}
          isLoading={isLoading}
          redirectLabel="login page"
          redirectRoute="/login"
        />

        <CAUserIDInput userID={userID} setUserID={setUserID} />

        <CAPasswordInput password={password} setPassword={setPassword} />

        <CAConfirmPasswordInput
          originalPassword={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />

        <button
          className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => handleSubmit()}
        >
          CREATE
        </button>

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
