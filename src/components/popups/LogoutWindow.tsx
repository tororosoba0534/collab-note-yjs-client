import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/hooks";
import ErrorPage from "../errorPages/ErrorPage";
import { PopupStatus } from "../personal/TiptapEditor";
import { PopupTemplate } from "./PopupTemplate";

export const LogoutWindow = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
}) => {
  const { logout, status } = useLogout();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [didTryOnce, setDidTryOnce] = useState(false);

  const handleClickLogout = () => {
    setDidTryOnce(true);
    setIsLoading(true);
    logout().then(({ status }) => {
      setIsLoading(false);

      if (status === 200 || status === 401) {
        console.log("logout succeeded!");
        props.setPopupStatus(null);
        navigate("/login");
        return;
      }

      console.log("logout failed");
    });
  };

  if (!isLoading && didTryOnce) return <ErrorPage status={status} />;

  return (
    <PopupTemplate handleClose={() => props.setPopupStatus(null)}>
      <div className="text-center">Really log out?</div>

      <div className="flex justify-center items-center justify-around h-20">
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
          onClick={() => props.setPopupStatus(null)}
        >
          Cancel
        </button>
      </div>
    </PopupTemplate>
  );
};
