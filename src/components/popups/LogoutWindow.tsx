import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/hooks";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import ErrorPage from "../errorPages/ErrorPage";
import { PersonalContext } from "../personal/PersonalContext";
import { PopupTemplate } from "./PopupTemplate";

export const LogoutWindow = (props: { provider: CustomWSProvider }) => {
  const { logout, status } = useLogout();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [didTryOnce, setDidTryOnce] = useState(false);

  const { setPopupStatus } = useContext(PersonalContext);

  const handleClickLogout = () => {
    setDidTryOnce(true);
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
