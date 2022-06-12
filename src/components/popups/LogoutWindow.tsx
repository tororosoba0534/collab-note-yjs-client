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
        className="bg-white rounded-lg relative flex items-center"
        ref={(elm) => {
          if (!elm) {
            return;
          }
          ref.current = elm;
        }}
      >
        <div
          className="absolute top-0 right-0 w-5 h-5 hover:font-bold cursor-pointer"
          onClick={() => setIsOpenLogout(false)}
        >
          X
        </div>
        <div className="p-5 pt-10">
          <div className="text-center">Really log out?</div>

          <div className="flex justify-center items-center justify-around h-20">
            <button
              className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
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
            <button
              className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
              onClick={() => setIsOpenLogout(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
