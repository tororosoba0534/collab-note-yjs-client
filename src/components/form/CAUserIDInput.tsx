import { useCallback, useState } from "react";
import { useCheckUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { CheckUserIDMsgBox } from "./CheckUserIDMsgBox";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

export const CAUserIDInput = (props: {
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  label?: string;
}) => {
  const [isInit, setIsInit] = useState(true);

  return (
    <div className="w-full">
      <FloatingLabelInput
        label={props.label || "userID"}
        type="text"
        value={props.userID}
        onChange={(e) => {
          props.setUserID(e.currentTarget.value);
          setIsInit(() => false);
        }}
      />
      <div className="h-10 w-full">
        <ValMsgBox
          label="length: 5 ~ 20 "
          errStatus={
            isInit
              ? "disabled"
              : props.userID.length < 5
              ? "NG"
              : props.userID.length > 20
              ? "NG"
              : "OK"
          }
          errMsg={
            isInit
              ? ""
              : props.userID.length < 5
              ? `${5 - props.userID.length} more`
              : props.userID.length > 20
              ? `${props.userID.length - 20} less`
              : ""
          }
        />
        <ValMsgBox
          label="a~z, A~Z, 0~9 only"
          errStatus={
            !props.userID
              ? "disabled"
              : Validate.isUsedInvalidChar(props.userID)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        <CheckUserIDMsgBox userID={props.userID} />
      </div>
    </div>
  );
};
