import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/hooks";
import { Validate } from "../utils/validation";
import { FloatingLabelInput } from "./form/FloatingLabelInput";

const Login = () => {
  const [userID, setUserID] = useState("");

  // TODO:
  // 一時的に平文でpasswordを保持してしまう。
  // 扱い方を見直すべき。
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, status, thrownErr } = useLogin();
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = () => {
    console.log("submit clicked.");
    setIsLoading(true);
    // if (
    //   Validate.isNotValidUsername(userID) ||
    //   Validate.isNotValidPassword(password)
    // ) {
    //   console.log("userID or password or both of them are invalid");
    //   return;
    // }

    login(userID, password).then(({ status }) => {
      if (status === 200) {
        navigate("/personal");
        return;
      }
      setIsLoading(false);
      console.log("login failed");
      console.log(`status code: ${status}`);
    });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <h1 className="text-2xl">Login</h1>

        {isLoading ? null : (
          <div className="w-full rounded-md bg-red-400 text-white font-bold">
            thrownErr: {thrownErr}
            status code: {status}
          </div>
        )}

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
