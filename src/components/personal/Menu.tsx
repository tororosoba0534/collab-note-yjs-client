import { useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { YjsWS } from "../../yjs/YjsWS";
import { PopupStatus } from "./TiptapEditor";
import { TooltipButton } from "./TooltipButton";

export const Menu = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
  provider: CustomWSProvider;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  return (
    <div className="flex-none w-56 h-16 bg-slate-500 relative">
      <div
        className="absolute m-2 p-2 border-2"
        onClick={() => setIsOpenMenu((prev) => !prev)}
      >
        Menu
      </div>
      <div
        className="absolute w-56  bg-green-500 top-24 transition-all flex flex-col gap-5 items-center p-5"
        style={{
          opacity: isOpenMenu ? 1 : 0,
          visibility: isOpenMenu ? "visible" : "hidden",
          top: isOpenMenu ? "92px" : "80px",
        }}
        onClick={() => console.log("Dropdown clicked!")}
      >
        DROP DOWN MENU
        <TooltipButton
          label="LOGOUT"
          onClick={() => props.setPopupStatus("logout")}
        />
        <div className="relative">
          <div
            className="m-2 p-2 border-2"
            onClick={() => setIsOpenTest((prev) => !prev)}
          >
            For Test
          </div>

          <div
            className="absolute right-56 top-0 bg-red-300 flex flex-col gap-4 p-4 transition-all"
            style={{
              opacity: isOpenTest ? 1 : 0,
              visibility: isOpenTest ? "visible" : "hidden",
            }}
          >
            <TooltipButton
              label="TEST"
              onClick={() => {
                YjsWS.sendTest(props.provider);
              }}
            />
            <TooltipButton
              label="TEST_CLOSE"
              onClick={() => {
                YjsWS.sendTestClose(props.provider);
              }}
            />
            <TooltipButton
              label="disconnect"
              onClick={() => {
                props.provider.disconnect();
              }}
            />
            <TooltipButton
              label="connect"
              onClick={() => {
                props.provider.connect();
              }}
            />
            <TooltipButton
              label="destroy"
              onClick={() => {
                props.provider.destroy();
              }}
            />
          </div>
        </div>
        <TooltipButton
          label="Delete Account"
          onClick={() => props.setPopupStatus("deleteAccountTry")}
        />
        <TooltipButton
          label="Change User ID"
          onClick={() => props.setPopupStatus("changeUserIDTry")}
        />
        <TooltipButton
          label="Change Password"
          onClick={() => props.setPopupStatus("changePasswordTry")}
        />
      </div>
    </div>
  );
};
