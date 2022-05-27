import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../accounts/utils";
import { useCheckUsername } from "../accounts/useCheckUsername";

const Register = () => {
  const [name, setName] = useState("");

  // TODO:
  // 一時的に平文でpasswordを保持してしまう。
  // 扱い方を見直すべき。
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isValidMessage, checkUsername } = useCheckUsername();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("two passwords NOT the same.");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    register(name, password).then((result) => {
      console.log(`register result: ${result}`);
      if (result) {
        navigate("/login");
      }
      setPassword("");
      setConfirmPassword("");
    });
  };

  return (
    <div>
      <p>Register rendered</p>
      <Link to="/login">to Login page</Link>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Name:
          <input
            type="text"
            name="username"
            value={name}
            onChange={(e) => {
              setName(e.currentTarget.value);
              checkUsername(e.currentTarget.value);
            }}
          />
        </label>
        <p>{isValidMessage}</p>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Register;
