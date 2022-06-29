import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const TestWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  return (
    <PopupTemplate handleClose={null}>
      <div>TEST: messageType === 9</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => props.setPopupStatus(null)}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
