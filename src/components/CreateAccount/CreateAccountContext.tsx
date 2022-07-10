import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { isThrownErr, Status } from "../../api/base";
import { NumsCreateAccount, ReturnCreateAccount } from "../../api/fetches";
import { useCreateAccount } from "../../api/hooks";
import { Validate } from "../../utils/validation";

export type CAStepNum = 1 | 2 | 3 | 4;

export const CreateAccountContext = createContext<{
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  confirmUserID: string;
  setConfirmUserID: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  adminPassword: string;
  setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmAdmin: string;
  setConfirmAdmin: React.Dispatch<React.SetStateAction<string>>;
  step: CAStepNum;
  setStep: React.Dispatch<React.SetStateAction<CAStepNum>>;
  isUserIDUnused: boolean;
  setIsUserIDUnused: React.Dispatch<React.SetStateAction<boolean>>;
  submitMsg: string;
  setSubmitMsg: React.Dispatch<React.SetStateAction<string>>;

  createAccount: (
    userID: string,
    password: string,
    adminPassword: string
  ) => Promise<ReturnCreateAccount>;
  status: Status<NumsCreateAccount>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export const CreateAccountProvider = (props: { children: ReactNode }) => {
  const [userID, setUserID] = useState("");
  const [confirmUserID, setConfirmUserID] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [confirmAdmin, setConfirmAdmin] = useState("");

  const [step, setStep] = useState<CAStepNum>(1);

  const [isUserIDUnused, setIsUserIDUnused] = useState(false);

  const [submitMsg, setSubmitMsg] = useState("");

  // Prevent abusing too many fetch
  const canSubmit = useRef(true);
  useEffect(() => {
    canSubmit.current = true;
  }, [userID]);

  const { createAccount, status } = useCreateAccount();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    console.log("submit clicked");

    if (
      !userID ||
      !confirmUserID ||
      !password ||
      !confirmPassword ||
      !adminPassword ||
      !confirmAdmin
    ) {
      setSubmitMsg("fill in all the fields.");
      return;
    }

    if (userID !== confirmUserID) {
      setSubmitMsg("two userIDs are different.");
      return;
    }

    if (password !== confirmPassword) {
      setSubmitMsg("two passwords are different.");
      return;
    }

    if (adminPassword !== confirmAdmin) {
      setSubmitMsg("two admin passwords are different.");
      return;
    }

    if (password === adminPassword) {
      setSubmitMsg("admin password has to be different from password.");
      return;
    }

    if (
      Validate.isNotValidUserID(userID) ||
      Validate.isNotValidPassword(password) ||
      Validate.isNotValidPassword(adminPassword)
    ) {
      setSubmitMsg("contains invalid value");
      return;
    }

    if (!canSubmit.current) return;
    console.log("loading start");
    canSubmit.current = false;
    setIsLoading(true);
    createAccount(userID, password, adminPassword).then(({ status }) => {
      setIsLoading(false);

      if (status === 200) {
        setSubmitMsg("");
        return;
      }

      if (isThrownErr(status)) {
        setSubmitMsg(`Thrown ERR: ${status}`);
        return;
      }

      if (status === 409) {
        setSubmitMsg(
          "The same userID is already used! Please use different one."
        );
        return;
      }

      if (status === 400) {
        setSubmitMsg("400 Bad Request: Retry with different value.");
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
        confirmUserID,
        setConfirmUserID,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        adminPassword,
        setAdminPassword,
        confirmAdmin,
        setConfirmAdmin,
        step,
        setStep,
        isUserIDUnused,
        setIsUserIDUnused,
        submitMsg,
        setSubmitMsg,
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
