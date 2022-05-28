import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auths/useAuth";

const Login = () => {
  const [name, setName] = useState("");

  // TODO:
  // 一時的に平文でpasswordを保持してしまう。
  // 扱い方を見直すべき。
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("submit clicked.");
    login(name, password).then((result) => {
      console.log(`login result: ${result}`);
      if (result) {
        navigate("/personal");
      }
      setName("");
      setPassword("");
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="p-4 bg-green-300">
        <p>Login rendered</p>
        <Link to="/register">to Register page</Link>
      </div>

      <form
        className="px-10 py-4 flex flex-col gap-10"
        // onSubmit={(e) => handleSubmit(e)}
      >
        <div className="border-gray-300 border-b-4">
          <label className="block">Name:</label>
          <input
            className="w-full"
            type="text"
            name="user"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
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
        <button type="submit" className="" onClick={(e) => handleSubmit(e)}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
