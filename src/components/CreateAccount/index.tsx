import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCheckUsername, useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";

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
    isUnused,
  } = useCheckUsername();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("submit clicked");

    if (password !== confirmPassword) {
      console.log("two passwords NOT the same.");
      return;
    }

    if (
      Validate.isNotValidUsername(username) ||
      Validate.isNotValidPassword(password)
    ) {
      console.log("username or password or the both are invalid");
      return;
    }

    console.log("valid username & password");

    const { status, thrownErr } = await createAccount(username, password);

    if (thrownErr !== "") {
      console.error(thrownErr);
      console.log("create account failed");
      return;
    }

    if (status === 200) {
      navigate("/login");
      // console.log("create account succeeded!");
      // return;
    }

    console.log(`status code: ${status}`);
    console.log("create account failed");
    setPassword("");
    setConfirmPassword("");
  };

  const handleChangeUsername = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUsername: string = e.currentTarget.value;
      setUsername(newUsername);

      if (Validate.isUsedInvalidChar(newUsername)) {
        console.log("username: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newUsername) !== 0) {
        console.log(
          `username: need more ${Validate.charsNeedMore(newUsername)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newUsername) !== 0) {
        console.log(
          `username: exceed ${Validate.charsShouldLess(newUsername)}`
        );
        return;
      }

      const { status, thrownErr, isUnused } = await checkUsername(newUsername);

      if (thrownErr !== "") {
        console.error(thrownErr);
        return;
      }

      if (status === 200) {
        if (isUnused) {
          console.log("valid username");
          return;
        }
        console.log("This username is already used.");
        return;
      }

      console.log(`status code: ${status}`);
    },
    [checkUsername]
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword: string = e.currentTarget.value;
      setPassword(newPassword);

      if (Validate.doesNotContainLowercase(newPassword)) {
        console.log("password: does NOT contain lowercase");
      }

      if (Validate.doesNotContainUppercase(newPassword)) {
        console.log("password: does NOT contain uppercase");
      }

      if (Validate.doesNotContainNumber(newPassword)) {
        console.log("password: does NOT contain number");
      }

      // if (Validate.isLackedNeededChars(newPassword)) {
      //   console.log("password: lack of needed char");
      // }

      if (Validate.isUsedInvalidChar(newPassword)) {
        console.log("password: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newPassword) !== 0) {
        console.log(
          `password: need more ${Validate.charsNeedMore(newPassword)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newPassword) !== 0) {
        console.log(
          `password: exceed ${Validate.charsShouldLess(newPassword)}`
        );
        return;
      }

      if (Validate.isNotValidPassword(newPassword)) {
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

      if (Validate.isNotValidPassword(originalPassword)) return;

      if (newConfirmPassword !== originalPassword) {
        console.log("confirm password: password NOT the same.");
        return;
      }
      console.log("confirm password: same password");
    },
    []
  );

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <h1 className="text-2xl">Create your account</h1>

        <FloatingLabelInput
          label="username"
          type="text"
          value={username}
          onChange={(e) => {
            handleChangeUsername(e);
          }}
        />

        <FloatingLabelInput
          label="password"
          type="password"
          value={password}
          onChange={(e) => handleChangePassword(e)}
        />

        <FloatingLabelInput
          label="confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => handleChangeConfirmPassword(e, password)}
        />

        <button
          className="mt-20 px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
          onClick={() => handleSubmit()}
        >
          CREATE
        </button>
        <div>
          ... or already have an account?{" "}
          <Link
            className="font-bold text-rose-500 hover:text-rose-400"
            to="/login"
          >
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
