import { useContext, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { YjsWS } from "../../yjs/YjsWS";
import { MenuSvg } from "./icons/MenuSvg";
import { PersonalContext } from "./PersonalContext";
import { TooltipButton } from "./TooltipButton";

const Tooltip = (props: { tooltip: string | null | undefined }) => {
  if (!props.tooltip) return null;
  return (
    <div className="absolute top-10 bg-black text-white p-2 rounded-md opacity-0 peer-hover:opacity-100 transition pointer-events-none z-30">
      {props.tooltip}
    </div>
  );
};

export const Menu = (props: {
  provider: CustomWSProvider | WebsocketProvider;
  userID: string;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  const { setPopupStatus } = useContext(PersonalContext);

  return (
    <div className="flex-none w-20 xs:w-[20%]  h-20 bg-gray-400 relative">
      <div className="h-full w-full flex justify-center items-center">
        {/* <TooltipButton
          img={MenuSvg}
          tooltip="Menu"
          onClick={() => setIsOpenMenu((prev) => !prev)}
        /> */}
        <div className="relative w-full">
          <div className="peer w-full h-16 flex justify-center items-center">
            <button
              className="w-10/12 flex flex-col justify-center items-center rounded-lg bg-gray-100 shadow-md hover:bg-rose-100"
              onClick={() => setIsOpenMenu((prev) => !prev)}
            >
              <div className="w-[60px] xs:w-3/4 text-center text-xs sm:text-sm truncate">
                {props.userID}
              </div>
              <div className="h-8 w-12">
                <MenuSvg />
              </div>
            </button>
          </div>

          <Tooltip tooltip="Menu" />
        </div>
      </div>

      {/* <ConnStatusBox provider={props.provider} /> */}
      <div
        className="absolute w-60  bg-gray-300 right-0 rounded-bl-2xl transition-all flex flex-col gap-5 items-center py-5 z-0"
        style={{
          opacity: isOpenMenu ? 1 : 0,
          visibility: isOpenMenu ? "visible" : "hidden",
          // top: isOpenMenu ? "80px" : "50px",
          top: "80px",
        }}
        onClick={() => console.log("Dropdown clicked!")}
      >
        <div>
          Hello{" "}
          <span className=" text-sm underline decoration-double">
            {props.userID}
          </span>{" "}
          !
        </div>

        <TooltipButton
          label="LOGOUT"
          onClick={() => setPopupStatus("logout")}
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
          onClick={() => setPopupStatus("deleteAccountTry")}
        />
        <TooltipButton
          label="Change User ID"
          onClick={() => setPopupStatus("changeUserIDTry")}
        />
        <TooltipButton
          label="Change Password"
          onClick={() => setPopupStatus("changePasswordTry")}
        />
        <TooltipButton
          label="Change Admin Password"
          onClick={() => setPopupStatus("changeAdminPasswordTry")}
        />
      </div>
    </div>
  );
};
