import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCheckUsername, useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [usernameValMsg, setUsernameValMsg] = useState("");

  const [password, setPassword] = useState("");
  const [passwordValMsgLack, setPasswordValMsgLack] = useState("");
  const [passwordValMsgInvalidChar, setPasswordValMsgInvalidChar] =
    useState("");
  const [passwordValMsgGeneral, setPasswordValMsgGeneral] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitMsg, setSubmitMsg] = useState("");
  const [didSubmitOnce, setDidSubmitOnce] = useState(false);

  const {
    createAccount,
    status: statusA,
    thrownErr: thrownErrA,
  } = useCreateAccount();
  const [isLoadingA, setIsLoadingA] = useState(true);

  const {
    checkUsername,
    status: statusU,
    thrownErr: thrownErrU,
    isUnused,
  } = useCheckUsername();
  const [isLoadingU, setIsLoadingU] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log("submit clicked");

    setDidSubmitOnce(true);
    setSubmitMsg("");
    if (password !== confirmPassword) {
      setSubmitMsg("two passwords NOT the same.");
      console.log("two passwords NOT the same.");
      return;
    }

    if (
      Validate.isNotValidUsername(username) ||
      Validate.isNotValidPassword(password)
    ) {
      setSubmitMsg("username or password or the both are invalid");
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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newUsername: string = e.currentTarget.value;
      setUsername(newUsername);

      setUsernameValMsg("");
      setIsLoadingU(true);
      if (Validate.isUsedInvalidChar(newUsername)) {
        setUsernameValMsg("invalid char used");
        setIsLoadingU(false);
        console.log("username: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newUsername) !== 0) {
        setUsernameValMsg(`need more ${Validate.charsNeedMore(newUsername)}`);
        setIsLoadingU(false);
        console.log(
          `username: need more ${Validate.charsNeedMore(newUsername)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newUsername) !== 0) {
        setUsernameValMsg(`exceed ${Validate.charsShouldLess(newUsername)}`);
        setIsLoadingU(false);
        console.log(
          `username: exceed ${Validate.charsShouldLess(newUsername)}`
        );
        return;
      }

      checkUsername(newUsername).then(() => {
        setIsLoadingU(false);
      });

      // const { status, thrownErr, isUnused } = await checkUsername(newUsername);

      // if (thrownErr !== "") {
      //   console.error(thrownErr);
      //   return;
      // }

      // if (status === 200) {
      //   if (isUnused) {
      //     console.log("valid username");
      //     return;
      //   }
      //   console.log("This username is already used.");
      //   return;
      // }

      // console.log(`status code: ${status}`);
    },
    [checkUsername]
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword: string = e.currentTarget.value;
      setPassword(newPassword);

      setPasswordValMsgLack("");
      const msgLackArr: Array<"lowercase" | "uppercase" | "number"> = [];
      setPasswordValMsgInvalidChar("");
      setPasswordValMsgGeneral("");
      if (Validate.doesNotContainLowercase(newPassword)) {
        msgLackArr.push("lowercase");
        console.log("password: does NOT contain lowercase");
      }

      if (Validate.doesNotContainUppercase(newPassword)) {
        msgLackArr.push("uppercase");
        console.log("password: does NOT contain uppercase");
      }

      if (Validate.doesNotContainNumber(newPassword)) {
        msgLackArr.push("number");
        console.log("password: does NOT contain number");
      }

      if (msgLackArr.length) {
        setPasswordValMsgLack("need " + msgLackArr.join(", "));
      }

      // if (Validate.isLackedNeededChars(newPassword)) {
      //   console.log("password: lack of needed char");
      // }

      if (Validate.isUsedInvalidChar(newPassword)) {
        setPasswordValMsgInvalidChar("invalid char used");
        console.log("password: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newPassword) !== 0) {
        setPasswordValMsgGeneral(
          `need more ${Validate.charsNeedMore(newPassword)}`
        );
        console.log(
          `password: need more ${Validate.charsNeedMore(newPassword)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newPassword) !== 0) {
        setPasswordValMsgGeneral(
          `exceed ${Validate.charsShouldLess(newPassword)}`
        );
        console.log(
          `password: exceed ${Validate.charsShouldLess(newPassword)}`
        );
        return;
      }
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
        <div>
          <h1 className="text-2xl">Create your account</h1>

          {!didSubmitOnce ? null : submitMsg ? (
            <div className="w-full rounded-md bg-red-400 text-white font-bold">
              {submitMsg}
            </div>
          ) : thrownErrA ? (
            <div className="w-full rounded-md bg-red-400 text-white font-bold">
              {submitMsg}
            </div>
          ) : statusA !== 200 ? (
            <div className="w-full rounded-md bg-red-400 text-white font-bold">
              status code: {statusA}
            </div>
          ) : (
            <div className="w-full rounded-md bg-blue-400 text-white font-bold">
              Succeeded! If you see this page yet, please go to{" "}
              <Link
                className="font-bold text-rose-500 hover:text-rose-400"
                to="/login"
              >
                login page
              </Link>
              !
            </div>
          )}
        </div>

        <div className="w-full">
          <FloatingLabelInput
            label="username"
            type="text"
            value={username}
            onChange={(e) => {
              handleChangeUsername(e);
            }}
          />
          <div className="h-10 w-full">
            {isLoadingU ? (
              <div className="rounded-md bg-blue-500 text-white"></div>
            ) : usernameValMsg ? (
              <div className="rounded-md bg-red-500 text-white">
                {usernameValMsg}
              </div>
            ) : thrownErrU ? (
              <div className="rounded-md bg-red-500 text-white">
                {thrownErrU}
              </div>
            ) : statusU !== 200 ? (
              <div className="rounded-md bg-red-500 text-white">
                status code: ${statusU}
              </div>
            ) : isUnused ? (
              <div className="rounded-md bg-blue-500 text-white">
                You can use this name!
              </div>
            ) : (
              <div className="rounded-md bg-red-500 text-white">
                This name is already used. You should use the other name!
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <FloatingLabelInput
            label="password"
            type="password"
            value={password}
            onChange={(e) => handleChangePassword(e)}
          />
          <div className="h-20 w-full">
            {passwordValMsgLack ||
            passwordValMsgInvalidChar ||
            passwordValMsgGeneral ? (
              <div>
                <p>{passwordValMsgLack}</p>
                <p>{passwordValMsgInvalidChar}</p>
                <p>{passwordValMsgGeneral}</p>
              </div>
            ) : password.length === 0 ? null : (
              <div>Valid password!</div>
            )}
          </div>
        </div>

        <div className="w-full">
          <FloatingLabelInput
            label="confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleChangeConfirmPassword(e, password)}
          />
          <div className="h-10 w-full">
            {!confirmPassword ? null : confirmPassword !== password ? (
              <div>NOT the same password.</div>
            ) : (
              <div>The same!</div>
            )}
          </div>
        </div>

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
