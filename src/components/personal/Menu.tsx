import { useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { YjsWS } from "../../yjs/YjsWS";
import { ConnStatusBox } from "./ConnStatusBox";
import { MenuSvg } from "./icons/MenuSvg";
import { PopupStatus } from "./TiptapEditor";
import { TooltipButton } from "./TooltipButton";

export const Menu = (props: {
  setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
  provider: CustomWSProvider;
  userID: string;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  return (
    <div className="flex-none w-32 h-16 bg-gray-400 relative">
      <div className="h-full w-full flex justify-center items-center">
        <TooltipButton
          img={MenuSvg}
          tooltip="Menu"
          onClick={() => setIsOpenMenu((prev) => !prev)}
        />
      </div>

      {/* <ConnStatusBox provider={props.provider} /> */}
      <div
        className="absolute w-56  bg-gray-300 top-16 right-0 rounded-bl-2xl transition-all flex flex-col gap-5 items-center py-5 z-10"
        style={{
          opacity: isOpenMenu ? 1 : 0,
          visibility: isOpenMenu ? "visible" : "hidden",
          top: isOpenMenu ? "64px" : "50px",
        }}
        onClick={() => console.log("Dropdown clicked!")}
      >
        Hello {props.userID}
        <TooltipButton
          label="LOGOUT"
          onClick={() => props.setPopupStatus("logout")}
        />
        <div className="relative w-full">
          <div className="flex items-center justify-center">
            <button
              className=" p-2 rounded-lg border-4 border-black bg-lime-400 hover:bg-lime-300"
              onClick={() => setIsOpenTest((prev) => !prev)}
            >
              ※ for test
            </button>
          </div>

          <div
            className="absolute right-56 top-0 bg-lime-300 rounded-2xl rounded-tr-none flex flex-col gap-4 p-4 transition-all"
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
