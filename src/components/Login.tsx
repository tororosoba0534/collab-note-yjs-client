import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../api/base";
import { useLogin } from "../api/hooks";
import { Validate } from "../utils/validation";
import { VividButton } from "./buttons/VividButton";
import { FloatingLabelInput } from "./form/FloatingLabelInput";
import { FormBase } from "./form/FormBase";
import { FormFrame } from "./form/FormFrame";
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
    <FormBase>
      <FormTitle
        title="Login"
        didSubmitOnce={didSubmitOnce}
        submitMsg={submitMsg}
        isLoading={isLoading}
        redirectRoute="/personal"
        redirectLabel="editor page"
      />
      <div className="w-full">
        <FormFrame>
          <FloatingLabelInput
            label="userID"
            type="text"
            value={userID}
            onChange={(e) => {
              setUserID(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </FormFrame>
        <FormFrame>
          <FloatingLabelInput
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </FormFrame>
      </div>
      <div className="w-full p-5 pb-0 bg-gray-100">
        <VividButton
          disable={!password || !userID}
          label="LOGIN"
          onClick={() => handleSubmit()}
        />
      </div>

      <div className="p-5 pt-0">
        ... or{" "}
        <Link
          className="font-bold text-rose-500 hover:text-rose-400"
          to="/create-account"
        >
          CREATE ACCOUNT
        </Link>
        {"?"}
      </div>
    </FormBase>
  );
};

export default Login;
