import { useContext, useState } from "react";
import { CreateAccountContext } from "../CreateAccount/CreateAccountContext";
import { CheckBoxSvg } from "../form/CheckBoxSvg";
import { PopupTemplate } from "./PopupTemplate";

export const CreateAccountTryWindow = () => {
  const { setStep, userID, password, adminPassword, handleSubmit } =
    useContext(CreateAccountContext);

  const [checked, setChecked] = useState(false);
  return (
    <PopupTemplate handleClose={() => setStep(3)}>
      <div className="flex flex-col items-center gap-5">
        <div className="text-2xl">Confirm</div>

        <div className="flex flex-row gap-3 p-2 bg-lime-100">
          <div className="text-right">
            <p>userID : </p>
            <p>password :</p>
            <p>adminPassword :</p>
          </div>
          <div>
            <p>{userID}</p>
            <p>
              {password.replaceAll(/[a-zA-Z0-9]/gi, "*")} ({password.length}{" "}
              letters)
            </p>
            <p>
              {adminPassword.replaceAll(/[a-zA-Z0-9]/gi, "*")} (
              {adminPassword.length} letters)
            </p>
          </div>
        </div>

        <div className="w-60 h-10 relative">
          <div
            className="absolute w-10 h-10"
            onClick={() => {
              setChecked((prev) => !prev);
            }}
          >
            <CheckBoxSvg checked={checked} />
          </div>
          <p className="absolute left-9 bottom-[6px]">
            Register with these values.
          </p>
        </div>

        <div className="flex items-center justify-around h-20">
          {checked ? (
            <button
              className="border-2 border-rose-500 bg-rose-500 rounded-md px-2 mx-4 hover:bg-rose-400 hover:border-rose-400 text-white"
              onClick={() => {
                handleSubmit();
              }}
            >
              CREATE
            </button>
          ) : (
            <button className="border-2 bg-gray-300 text-white rounded-md px-2 mx-4 cursor-not-allowed">
              CREATE
            </button>
          )}
          <button
            className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
            onClick={() => setStep(3)}
          >
            MODIFY
          </button>
        </div>
      </div>
    </PopupTemplate>
  );
};
