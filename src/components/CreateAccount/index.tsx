import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCheckUsername, useCreateAccount } from "../../api/hooks";
import { CreateAccountValidate } from "./validation";

const CreateAccount = () => {
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    createAccount,
    status: createAccountStatus,
    isLoading: createAccountIsLoading,
    thrownErr: createAccountThrownErr,
  } = useCreateAccount();

  const {
    checkUsername,
    status: checkUsernameStatus,
    isLoading: checkUsernameIsLoading,
    thrownErr: checkUsernameThrownErr,
    isUnusedValidUsername,
  } = useCheckUsername();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("submit clicked");
    // e.preventDefault();
    // if (password !== confirmPassword) {
    //   console.log("two passwords NOT the same.");
    //   setPassword("");
    //   setConfirmPassword("");
    //   return;
    // }

    // await createAccount(username, password);
    // if (createAccountStatus === 200) {
    //   navigate("/login");
    // }
    // setPassword("");
    // setConfirmPassword("");
  };

  const handleChangeUsername = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUsername: string = e.currentTarget.value;
      setUsername(newUsername);

      if (CreateAccountValidate.isUsedInvalidChar(newUsername)) {
        console.log("username: invalid char used");
        return;
      }

      if (CreateAccountValidate.charsNeedMore(newUsername) !== 0) {
        console.log(
          `username: need more ${CreateAccountValidate.charsNeedMore(
            newUsername
          )}`
        );
        return;
      }

      if (CreateAccountValidate.charsShouldLess(newUsername) !== 0) {
        console.log(
          `username: exceed ${CreateAccountValidate.charsShouldLess(
            newUsername
          )}`
        );
        return;
      }

      console.log("username: valid username");
    },
    []
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword: string = e.currentTarget.value;
      setPassword(newPassword);

      if (CreateAccountValidate.doesNotContainLowercase(newPassword)) {
        console.log("password: does NOT contain lowercase");
      }

      if (CreateAccountValidate.doesNotContainUppercase(newPassword)) {
        console.log("password: does NOT contain uppercase");
      }

      if (CreateAccountValidate.doesNotContainNumber(newPassword)) {
        console.log("password: does NOT contain number");
      }

      // if (CreateAccountValidate.isLackedNeededChars(newPassword)) {
      //   console.log("password: lack of needed char");
      // }

      if (CreateAccountValidate.isUsedInvalidChar(newPassword)) {
        console.log("password: invalid char used");
        return;
      }

      if (CreateAccountValidate.charsNeedMore(newPassword) !== 0) {
        console.log(
          `password: need more ${CreateAccountValidate.charsNeedMore(
            newPassword
          )}`
        );
        return;
      }

      if (CreateAccountValidate.charsShouldLess(newPassword) !== 0) {
        console.log(
          `password: exceed ${CreateAccountValidate.charsShouldLess(
            newPassword
          )}`
        );
        return;
      }

      console.log("password: valid password");
    },
    []
  );

  const handleChangeConfirmPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, originalPassword: string) => {
      const newConfirmPassword: string = e.currentTarget.value;
      setConfirmPassword(newConfirmPassword);

      if (CreateAccountValidate.isNotValidPassword(originalPassword)) return;

      if (newConfirmPassword !== originalPassword) {
        console.log("confirm password: password NOT the same.");
        return;
      }
      console.log("confirm password: same password");
    },
    []
  );

  return (
    <div>
      <p>CreateAccount rendered</p>

      <div>
        <div>
          <div>Username</div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              handleChangeUsername(e);
            }}
          />
        </div>

        <div>
          <div>Password</div>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => handleChangePassword(e)}
          />
        </div>

        <div>
          <div>Confirm Password</div>
          <input
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => {
              handleChangeConfirmPassword(e, password);
            }}
          />
        </div>

        <button onClick={() => handleSubmit()}>CREATE</button>
        <div>
          ... or already have an account? <Link to="/login">login</Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
