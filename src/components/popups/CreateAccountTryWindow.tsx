import { useContext } from "react";
import { CreateAccountContext } from "../CreateAccount/CreateAccountContext";
import { PopupTemplate } from "./PopupTemplate";

export const CreateAccountTryWindow = () => {
  const { setStep, userID, password, adminPassword, handleSubmit } =
    useContext(CreateAccountContext);
  return (
    <PopupTemplate handleClose={() => setStep(3)}>
      <div className="flex flex-col gap-5">
        <div>Confirm</div>
        <div className="flex items-center justify-around h-20">
          <button
            className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
            onClick={() => {
              handleSubmit();
            }}
          >
            CREATE
          </button>
          <button
            className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
            onClick={() => setStep(3)}
          >
            Cancel
          </button>
        </div>
      </div>
    </PopupTemplate>
  );
};
