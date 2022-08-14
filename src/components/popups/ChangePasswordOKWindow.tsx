import { useContext } from "react";
import { PersonalContext } from "../pages/personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const ChangePasswordOKWindow = () => {
  const { setPopupStatus } = useContext(PersonalContext);
  return (
    <PopupTemplate handleClose={null}>
      <div>Password changed.</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => setPopupStatus(null)}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
