import { useNavigate } from "react-router-dom";
import { PopupTemplate } from "./PopupTemplate";

export const DeleteAccountOKWindow = () => {
  const navigate = useNavigate();
  return (
    <PopupTemplate handleClose={null}>
      <div>This account has been deleted.</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => navigate("/create-account")}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
