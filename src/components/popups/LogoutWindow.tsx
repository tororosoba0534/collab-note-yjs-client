import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../api/hooks";
import ErrorPage from "../errorPages/ErrorPage";
import { PopupTemplate } from "./PopupTemplate";

export const LogoutWindow = (props: {
  isOpenLogout: boolean;
  setIsOpenLogout: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDidTryOnce: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { logout, status } = useLogout();

  const navigate = useNavigate();

  // const handleClickDocument = useCallback((e: MouseEvent) => {
  //   if (!(e.target instanceof Node)) {
  //     console.log(`(e.target instanceof Node}) === false`);
  //     return;
  //   }

  //   if (!ref.current?.contains(e.target)) {
  //     // setIsOpenLogout(false);
  //     console.log("outside of popup clicked");
  //     return;
  //   }

  //   console.log("inside of popup clicked");
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("click", handleClickDocument);
  // }, [handleClickDocument]);

  const handleClickLogout = () => {
    props.setDidTryOnce(true);
    props.setIsLoading(true);
    logout().then(({ status }) => {
      props.setIsLoading(false);

      if (status === 200 || status === 401) {
        console.log("logout succeeded!");
        props.setIsOpenLogout(false);
        navigate("/login");
        return;
      }

      console.log("logout failed");
    });
  };

  if (!props.isOpenLogout) return null;

  return (
    <PopupTemplate handleClose={() => props.setIsOpenLogout(false)}>
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
          onClick={() => props.setIsOpenLogout(false)}
        >
          Cancel
        </button>
      </div>
    </PopupTemplate>
  );
};
