import { createContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isThrownErr, Status } from "../../api/base";
import { NumsCreateAccount, ReturnCreateAccount } from "../../api/fetches";
import { useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { CAStepNum } from "./CAStep";

export const CreateAccountContext = createContext<{
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  adminPassword: string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  step: CAStepNum;
  setStep: React.Dispatch<React.SetStateAction<CAStepNum>>;
  isUserIDUnused: boolean;
  setIsUserIDUnused: React.Dispatch<React.SetStateAction<boolean>>;
  submitMsg: string;
  setSubmitMsg: React.Dispatch<React.SetStateAction<string>>;
  didSubmitOnce: boolean;
  setDidSubmitOnce: React.Dispatch<React.SetStateAction<boolean>>;
  createAccount: (
    userID: string,
    password: string,
    adminPassword: string
  ) => Promise<ReturnCreateAccount>;
  status: Status<NumsCreateAccount>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}>(null!);

export const CreateAccountProvider = (props: { children: ReactNode }) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [step, setStep] = useState<CAStepNum>(1);

  const [isUserIDUnused, setIsUserIDUnused] = useState(false);

  const [submitMsg, setSubmitMsg] = useState("");
  const [didSubmitOnce, setDidSubmitOnce] = useState(false);

  const { createAccount, status } = useCreateAccount();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("submit clicked");

    setDidSubmitOnce(true);
    setSubmitMsg("");
    setIsLoading(true);

    if (!userID || !password || !confirmPassword || !adminPassword) {
      setSubmitMsg("fill in all the fields.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setSubmitMsg("two passwords are NOT matched.");
      setIsLoading(false);
      return;
    }

    if (
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password) ||
      Validate.isNotValidPassword(adminPassword) ||
      password === adminPassword
    ) {
      setSubmitMsg("contains invalid value");
      setIsLoading(false);
      return;
    }

    createAccount(userID, password, adminPassword).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        navigate("/login");
        return;
        // console.log("create account succeeded!");
        // return;
      }

      setPassword("");
      setConfirmPassword("");

      if (isThrownErr(status)) {
        setSubmitMsg(status);
        return;
      }

      if (status === 403) {
        setSubmitMsg(
          "The same userID is already used! Please use different one."
        );
        return;
      }

      if (status === 400) {
        setSubmitMsg(
          "400 Bad Request: If you see this message, please tell us!"
        );
        return;
      }

      setSubmitMsg("500 Internal Server Error: Wait a minutes, please!");
    });
  };

  return (
    <CreateAccountContext.Provider
      value={{
        userID,
        setUserID,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        adminPassword,
        setAdminPassword,
        step,
        setStep,
        isUserIDUnused,
        setIsUserIDUnused,
        submitMsg,
        setSubmitMsg,
        didSubmitOnce,
        setDidSubmitOnce,
        createAccount,
        status,
        isLoading,
        setIsLoading,
        handleSubmit,
      }}
    >
      {props.children}
    </CreateAccountContext.Provider>
  );
};
