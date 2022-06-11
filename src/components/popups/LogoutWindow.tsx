import { useCallback, useContext, useEffect, useRef } from "react";
import { useLogout } from "../../api/hooks";
import { PopupsContext } from "./PopupsProvider";

export const LogoutWindow = () => {
  const { isOpenLogout, setIsOpenLogout } = useContext(PopupsContext);
  const { logout } = useLogout();

  const ref = useRef<HTMLElement | null>(null);

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

  if (!isOpenLogout) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="bg-white"
        ref={(elm) => {
          if (!elm) {
            return;
          }
          ref.current = elm;
        }}
      >
        <div onClick={() => setIsOpenLogout(false)}>X</div>
        <h1>This is Logout window</h1>
        <div>Really log out?</div>
        <button
          onClick={async () => {
            const { status, thrownErr } = await logout();
            if (status === 200) {
              console.log("succeed");
              return;
            }
            console.log("failed");
          }}
        >
          Logout
        </button>
        <button onClick={() => setIsOpenLogout(false)}>Cancel</button>
      </div>
    </div>
  );
};
