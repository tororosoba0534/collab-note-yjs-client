import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { YjsMsgContext } from "../../yjs/YjsMsgContext";
import { PopupTemplate } from "./PopupTemplate";

export const YjsMsgWindow = () => {
  const { yjsMsgStatus, setYjsMsgStatus } = useContext(YjsMsgContext);
  const navigate = useNavigate();

  if (!yjsMsgStatus) return null;

  return (
    <PopupTemplate handleClose={null}>
      <div>
        {yjsMsgStatus === "deleteAccount"
          ? "This account has been deleted by other members."
          : yjsMsgStatus === "changePassword"
          ? "Password changed by other members."
          : yjsMsgStatus === "changeUserID"
          ? "User ID changed by other members."
          : "TEST: YjsMsg"}
      </div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => {
          switch (yjsMsgStatus) {
            case "deleteAccount": {
              navigate("/login");
              break;
            }
            default: {
              navigate("/personal");
              break;
            }
          }

          setYjsMsgStatus(null);
        }}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
