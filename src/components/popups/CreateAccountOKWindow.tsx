import { useNavigate } from "react-router-dom";
import { PopupTemplate } from "./PopupTemplate";

export const CreateAccountOKWindow = () => {
  const navigate = useNavigate();
  return (
    <PopupTemplate handleClose={null}>
      <div>Succeed in create new account!</div>

      <p>
        Please let your team members know{" "}
        <span className="bg-lime-200 px-1">userID</span> and{" "}
        <span className="bg-lime-200 px-1">password</span>,
      </p>
      <p>
        but NOT <span className="bg-rose-200 px-1">adminPassword</span>!
      </p>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => navigate("/login")}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
