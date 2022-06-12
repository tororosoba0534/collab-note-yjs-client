import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../api/hooks";
import { Validate } from "../utils/validation";

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
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="p-4 bg-green-300">
        <p>Login rendered</p>
        <Link to="/register">to Register page</Link>
      </div>

      <div
        className="px-10 py-4 flex flex-col gap-10"
        // onSubmit={(e) => handleSubmit(e)}
      >
        <div className="border-gray-300 border-b-4">
          <label className="block">Name:</label>
          <input
            className="w-full"
            type="text"
            name="user"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="border-gray-300 border-b-4">
          <label className="block">Password:</label>
          <input
            className="w-full"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        {/* <input type="submit" value="Submit" /> */}
        <button type="submit" className="" onClick={() => handleSubmit()}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
