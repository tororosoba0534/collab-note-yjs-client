import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/hooks";
import { Validate } from "../utils/validation";
import { FloatingLabelInput } from "./form/FloatingLabelInput";

const Login = () => {
  const [username, setUsername] = useState("");

  // TODO:
  // 一時的に平文でpasswordを保持してしまう。
  // 扱い方を見直すべき。
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useLogin();

  const handleSubmit = async () => {
    console.log("submit clicked.");

    if (
      Validate.isNotValidUsername(username) ||
      Validate.isNotValidPassword(password)
    ) {
      console.log("username or password or both of them are invalid");
      return;
    }

    const { status, thrownErr } = await login(username, password);

    if (thrownErr !== "") {
      console.error(thrownErr);
      return;
    }

    if (status === 200) {
      // console.log("login succeeded!");
      // return;
      navigate("/personal");
      return;
    }

    console.log("login failed");
    console.log(`status code: ${status}`);
    setUsername("");
    setPassword("");

    // login(name, password).then((result) => {
    //   console.log(`login result: ${result}`);
    //   if (result) {
    //     navigate("/personal");
    //   }
    //   setName("");
    //   setPassword("");
    // });
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <h1 className="text-2xl">Login</h1>

        <FloatingLabelInput
          label="username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value);
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
