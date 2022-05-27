import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auths/useAuth";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");

  // TODO:
  // 一時的に平文でpasswordを保持してしまう。
  // 扱い方を見直すべき。
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <div className="login">
      <div className="p-4 bg-green-300">
        <p>Login rendered</p>
        <Link to="/register">to Register page</Link>
      </div>

      <form
        className="px-10 py-4 flex flex-col gap-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="border-gray-300 border-b-4">
          <label>Name:</label>
          <input
            type="text"
            name="user"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <div className="border-gray-300 border-b-4">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
