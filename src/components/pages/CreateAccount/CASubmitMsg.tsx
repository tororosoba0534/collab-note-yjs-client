import { useContext } from "react";
import { Link } from "react-router-dom";
import { SubmitMsgBar } from "../../ErrMsgBar";
import { CreateAccountContext } from "./CreateAccountContext";

export const CASubmitMsg = () => {
  const { isLoading, submitMsg } = useContext(CreateAccountContext);

  if (isLoading) return <div>Wait for minutes...</div>;
  if (!submitMsg) return null;
  return (
    <SubmitMsgBar submitMsg={submitMsg} />
    // <div className="w-full rounded-md bg-red-400 text-white font-bold">
    //   {submitMsg}
    // </div>
  );
};
