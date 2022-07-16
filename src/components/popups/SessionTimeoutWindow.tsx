import { useNavigate } from "react-router-dom";
import { WebsocketProvider } from "y-websocket";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { PopupTemplate } from "./PopupTemplate";

export const SessionTimeoutWindow = (props: {
  provider: CustomWSProvider | WebsocketProvider;
}) => {
  const navigate = useNavigate();
  return (
    <PopupTemplate handleClose={null}>
      <div>Your session has been expired!</div>
      <p>Please login again.</p>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => {
          props.provider.destroy();
          navigate("/login");
        }}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
