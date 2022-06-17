import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../api/base";
import { useLogin } from "../api/hooks";
import { Validate } from "../utils/validation";
import { FloatingLabelInput } from "./form/FloatingLabelInput";
import { FormTitle } from "./form/FormTitle";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, status } = useLogin();
  const [isLoading, setIsLoading] = useState(true);
  const [submitMsg, setSubmitMsg] = useState("");
  const [didSubmitOnce, setDidSubmitOnce] = useState(false);

  const handleSubmit = () => {
    console.log("submit clicked.");
    setDidSubmitOnce(true);
    setIsLoading(true);
    setSubmitMsg;

    if (
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password)
    ) {
      setSubmitMsg("userID or password or both are wrong.");
      setIsLoading(false);
      return;
    }

    login(userID, password).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        navigate("/personal");
        return;
      }

      if (isThrownErr(status)) {
        setSubmitMsg(status);
        return;
      }

      if (status === 400 || status === 401) {
        setSubmitMsg("userID or password or both are wrong.");
        return;
      }

      setSubmitMsg("500 Internal Server Error: Wait a minutes please!");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <FormTitle
          didSubmitOnce={didSubmitOnce}
          submitMsg={submitMsg}
          isLoading={isLoading}
          redirectRoute="/personal"
          redirectLabel="editor page"
        />

        <FloatingLabelInput
          label="userID"
          type="text"
          value={userID}
          onChange={(e) => {
            setUserID(e.currentTarget.value);
          }}
        />

        <FloatingLabelInput
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <button
          className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => handleSubmit()}
        >
          LOGIN
        </button>

        <div>
          ... or{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to="/create-account"
          >
            CREATE ACCOUNT
          </Link>
          {"?"}
        </div>
      </div>
    </div>
  );
};

export default Login;
