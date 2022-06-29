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

  return (
    <div className="flex-none w-56 h-16 bg-slate-500 relative">
      <div
        className="absolute m-2 p-2 border-2"
        onClick={() => setIsOpenMenu((prev) => !prev)}
      >
        Menu
      </div>
      <div
        className="absolute w-56 h-56  bg-green-500 top-24 transition-all flex flex-col justify-around items-center"
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
        <TooltipButton
          label="TEST"
          onClick={() => {
            //   const encoder = encoding.createEncoder();
            //   encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST);
            //   props.provider.ws?.send(encoding.toUint8Array(encoder));
            YjsWS.sendTest(props.provider);
          }}
        />
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
