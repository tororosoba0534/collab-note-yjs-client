import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { isThrownErr } from "../api/base";
import { useLogin } from "../api/hooks/useLogin";
import { IsCmd } from "../utils/IsCmd";
import { Validate } from "../utils/validation";
import { VividButton } from "./buttons/VividButton";
import { FloatingLabelInput } from "./form/FloatingLabelInput";
import { FormBase } from "./form/FormBase";
import { FormFrame } from "./form/FormFrame";
import { LoadingCircleSvg } from "./LoadingCircleSvg";

const Login = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, status } = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  const userIDRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);

  // Needed to prevent abusing too many fetch
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [userID, password]);

  const handleSubmit = () => {
    console.log("submit clicked.");

    if (!userID || !password) {
      setSubmitMsg("Fill in all the blanks.");
      return;
    }

    if (
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password)
    ) {
      setSubmitMsg("userID or password or both are wrong.");
      return;
    }

    if (!canSubmit.current) return;
    canSubmit.current = false;
    console.log("fetching start...");

    setIsLoading(true);
    login(userID, password).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        setSubmitMsg("");
        navigate("/personal");
        return;
      }

      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
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
      <div className="text-4xl">Login</div>
      {status === 200 ? (
        <div>
          <p>Login succeeded!</p>
          <p>Now redirecting...</p>
        </div>
      ) : isLoading ? (
        <div className="flex text-center w-full">
          <span className="w-5 h-5 inline-block">
            <LoadingCircleSvg />
          </span>
          <span>Now waiting response...</span>
        </div>
      ) : !submitMsg ? null : (
        <div className="w-full rounded-md bg-red-400 text-white font-bold">
          {submitMsg}
        </div>
      )}
      <div className="w-full px-5">
        <FormFrame>
          <FloatingLabelInput
            ref={userIDRef}
            label="userID"
            type="text"
            value={userID}
            onChange={(e) => {
              setUserID(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (IsCmd.next(e)) {
                if (!userID || !password) {
                  passwordRef.current?.focus();
                } else {
                  submitRef.current?.focus();
                  // handleSubmit();
                }
              } else if (IsCmd.down(e) || IsCmd.up(e)) {
                passwordRef.current?.focus();
              }
            }}
          />
        </FormFrame>
        <FormFrame>
          <FloatingLabelInput
            ref={passwordRef}
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (IsCmd.next(e)) {
                if (!userID || !password) {
                  userIDRef.current?.focus();
                } else {
                  submitRef.current?.focus();
                  // handleSubmit();
                }
              } else if (IsCmd.down(e) || IsCmd.up(e)) {
                userIDRef.current?.focus();
              }
            }}
          />
        </FormFrame>
      </div>
      <div className="w-full p-5 pb-0 bg-gray-100">
        <VividButton
          ref={submitRef}
          disable={!password || !userID}
          label="LOGIN"
          onClick={() => handleSubmit()}
          onKeyDown={(e) => {
            if (IsCmd.next(e)) {
              // submitRef.current?.focus();

              // Disable submission with enter key when focused.
              // This prevent too many inappropreate submission.
              e.preventDefault();
            } else if (IsCmd.down(e) || IsCmd.up(e)) {
              passwordRef.current?.focus();
            }
          }}
        />
      </div>

      <div className="pt-2">
        ... or{" "}
        <Link
          className="font-bold text-rose-500 hover:text-rose-400"
          to="/create-account"
        >
          CREATE ACCOUNT
        </Link>
        {"?"}
      </div>
      <div className="pb-5  text-center">
        Go back{" "}
        <Link
          className="text-center font-bold text-rose-500 hover:text-rose-400"
          to="/"
        >
          HOME
        </Link>
      </div>
    </FormBase>
  );
};

export default Login;
