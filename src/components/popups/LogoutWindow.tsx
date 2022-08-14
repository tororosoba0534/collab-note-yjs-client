import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WebsocketProvider } from "y-websocket";
import { useLogout } from "../../api/hooks/useLogout";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import ErrorPage from "../errorPages/ErrorPage";
import { LoadingCircleSvg } from "../LoadingCircleSvg";
import { PersonalContext } from "../pages/personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const LogoutWindow = (props: {
  provider: CustomWSProvider | WebsocketProvider;
}) => {
  const { logout, status } = useLogout();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [didTryOnce, setDidTryOnce] = useState(false);

  const { setPopupStatus } = useContext(PersonalContext);

  const handleClickLogout = () => {
    setDidTryOnce(true);

    // Needed to prevent multiple clicks
    if (isLoading) return;
    setIsLoading(true);
    logout().then(({ status }) => {
      setIsLoading(false);

      if (status === 200 || status === 401) {
        console.log("logout succeeded!");
        setPopupStatus(null);
        props.provider.destroy();
        navigate("/login");
        return;
      }

      console.log("logout failed");
    });
  };

  if (!isLoading && didTryOnce) return <ErrorPage status={status} />;

  return (
    <PopupTemplate handleClose={() => setPopupStatus(null)}>
      <div className="text-center">Really log out?</div>

      {!isLoading ? null : (
        <div className="flex text-center w-full">
          <span className="w-5 h-5 inline-block">
            <LoadingCircleSvg />
          </span>
          <span>Now Loading...</span>
        </div>
      )}

      <div className="flex  items-center justify-around h-20">
        <button
          className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
          onClick={() => {
            handleClickLogout();
          }}
        >
          Logout
        </button>
        <button
          className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
          onClick={() => setPopupStatus(null)}
        >
          Cancel
        </button>
      </div>
    </PopupTemplate>
  );
};
