import { forwardRef, useEffect, useState } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { CheckUserIDMsgBox } from "./CheckUserIDMsgBox";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

type Props = {
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  label: string;
  setIsUserIDAvailable?: React.Dispatch<React.SetStateAction<boolean>>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onFirstRender?: () => void;
};

export const UserIDInputWithMsg = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const [isInit, setIsInit] = useState(true);

    useEffect(() => {
      if (props.onFirstRender) props.onFirstRender();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <FloatingLabelInput
        ref={ref}
        label={props.label || "userID"}
        type="text"
        value={props.userID}
        onChange={(e) => {
          props.setUserID(e.currentTarget.value);
          setIsInit(() => false);
        }}
        onKeyDown={props.onKeyDown}
      >
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
        <CheckUserIDMsgBox
          userID={props.userID}
          setIsUserIDAvailable={props.setIsUserIDAvailable}
        />
      </FloatingLabelInput>
    );
  }
);
