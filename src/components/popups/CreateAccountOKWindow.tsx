import { useNavigate } from "react-router-dom";
import { PopupTemplate } from "./PopupTemplate";

export const CreateAccountOKWindow = () => {
  const navigate = useNavigate();
  return (
    <PopupTemplate handleClose={null}>
      <div>Succeed in create new account!</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => navigate("/login")}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
