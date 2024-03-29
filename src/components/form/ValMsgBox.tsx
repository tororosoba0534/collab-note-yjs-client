import { CheckSvg } from "./CheckSvg";
import { ValMsgBoxStatus } from "./types";

export const ValMsgBox = (props: {
  label: string;
  errStatus: ValMsgBoxStatus;
  errMsg: string | JSX.Element;
}) => {
  return (
    <div
      className="w-full flex flex-row gap-1"
      style={{
        backgroundColor: props.errStatus === "NG" ? "red" : "white",
        color:
          props.errStatus === "NG"
            ? "white"
            : props.errStatus === "OK"
            ? "green"
            : "gray",
        fontWeight: props.errStatus === "NG" ? "bold" : "normal",
      }}
    >
      <div className="flex-none w-6">
        <CheckSvg status={props.errStatus} />
      </div>

      <div className="flex-grow">{props.label}</div>

      {/* {!props.errMsg ? null : typeof props.errMsg !== "string" ? (
        props.errMsg
      ) : (
        <div className="border-2">{props.errMsg}</div>
      )} */}

      <div className="mx-3">{props.errMsg}</div>
    </div>
  );
};
