import { useContext } from "react";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const TestWindow = () => {
  const { setPopupStatus } = useContext(PersonalContext);
  return (
    <PopupTemplate handleClose={null}>
      <div>TEST: messageType === 20</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => setPopupStatus(null)}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
