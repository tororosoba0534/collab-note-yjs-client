import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { CAConfirmPasswordInput } from "./CAConfirmPasswordInput";
import { CAPasswordInput } from "./CAPasswordInput";
import { CATitle } from "./CATitle";
import { CAUserIDInput } from "./CAUserIDInput";

const CreateAccount = () => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitMsg, setSubmitMsg] = useState("");
  const [didSubmitOnce, setDidSubmitOnce] = useState(false);

  const { createAccount, status, thrownErr } = useCreateAccount();

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
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password)
    ) {
      setSubmitMsg("userID or password or the both are invalid");
      console.log("userID or password or the both are invalid");
      return;
    }

    console.log("valid userID & password");

    const { status, thrownErr } = await createAccount(userID, password);

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

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="flex flex-col justify-center items-center gap-10 p-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-white">
        <CATitle
          didSubmitOnce={didSubmitOnce}
          submitMsg={submitMsg}
          thrownErr={thrownErr}
          status={status}
        />

        <CAUserIDInput userID={userID} setUserID={setUserID} />

        <CAPasswordInput password={password} setPassword={setPassword} />

        <CAConfirmPasswordInput
          originalPassword={password}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
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
