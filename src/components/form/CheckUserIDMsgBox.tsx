import { useEffect, useState } from "react";
import { isThrownErr } from "../../api/base";
import { useCheckUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { LoadingCircleSvg } from "../LoadingCircleSvg";
import { CheckSvg } from "./CheckSvg";
import { ExclamationSvg } from "./ExclamationSvg";

export const CheckUserIDMsgBox = (props: {
  userID: string;
  setIsUserIDAvailable?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { checkUserID, status } = useCheckUserID();
  const [boxStatus, setBoxStatus] = useState<
    "disabled" | "loading" | "NG" | "OK"
  >("disabled");

  useEffect(() => {
    if (Validate.isNotValidUserID(props.userID)) {
      setBoxStatus("disabled");
      return;
    }

    setBoxStatus("loading");
    checkUserID(props.userID).then(({ status }) => {
      setBoxStatus(() => {
        if (status !== 200) {
          if (props.setIsUserIDAvailable) props.setIsUserIDAvailable(false);
          return "NG";
        }
        if (props.setIsUserIDAvailable) props.setIsUserIDAvailable(true);
        return "OK";
      });
    });
  }, [checkUserID, props, props.userID]);

  return (
    <div
      className="w-full flex flex-col "
      style={{
        backgroundColor: boxStatus === "NG" ? "red" : "white",
        color:
          boxStatus === "NG" ? "white" : boxStatus === "OK" ? "green" : "gray",
        fontWeight: boxStatus === "NG" ? "bold" : "normal",
      }}
    >
      <div className="w-full h-6 flex flex-row gap-1">
        <div className="flex-none w-6">
          <CheckSvg status={boxStatus === "loading" ? "disabled" : boxStatus} />
        </div>

        <div className="flex-grow">unique ID? </div>

        {/* {!props.errMsg ? null : typeof props.errMsg !== "string" ? (
            props.errMsg
          ) : (
            <div className="border-2">{props.errMsg}</div>
          )} */}

        <div className="mx-3">
          {boxStatus === "loading" ? (
            <div className="flex">
              <div className="w-5 h-5">
                <LoadingCircleSvg />
                checking...
              </div>
            </div>
          ) : boxStatus === "NG" ? (
            <ExclamationSvg />
          ) : null}
        </div>
      </div>

      <div className="pl-9">
        {boxStatus !== "NG" || status === 200
          ? null
          : status === 403
          ? "already used"
          : isThrownErr(status)
          ? status
          : status === 500
          ? "500 Internal Server Error"
          : "400 Bad Request: If you see this message, please tell us!"}
      </div>
    </div>
  );
};
