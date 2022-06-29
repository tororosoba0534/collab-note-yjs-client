import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const ChangeUserIDOKWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  return (
    <PopupTemplate handleClose={null}>
      <div>User ID changed.</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => props.setPopupStatus(null)}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
