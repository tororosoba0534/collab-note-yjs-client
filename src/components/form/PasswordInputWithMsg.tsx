import { forwardRef, ReactNode, useCallback, useEffect, useState } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

type Props = {
  label: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  children?: ReactNode;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onFirstRender?: () => void;
};

export const PasswordInputWithMsg = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const [isInit, setIsInit] = useState(true);

    const [passwordValMsgLack, setPasswordValMsgLack] = useState("");
    const [passwordValMsgInvalidChar, setPasswordValMsgInvalidChar] =
      useState("");
    const [passwordValMsgGeneral, setPasswordValMsgGeneral] = useState("");

    const handleChangePassword = useCallback((newPassword: string) => {
      setIsInit(() => false);
      setPasswordValMsgLack("");
      const msgLackArr: Array<"lowercase" | "uppercase" | "number"> = [];
      setPasswordValMsgInvalidChar("");
      setPasswordValMsgGeneral("");
      if (Validate.doesNotContainLowercase(newPassword)) {
        msgLackArr.push("lowercase");
        console.log("password: does NOT contain lowercase");
      }

      if (Validate.doesNotContainUppercase(newPassword)) {
        msgLackArr.push("uppercase");
        console.log("password: does NOT contain uppercase");
      }

      if (Validate.doesNotContainNumber(newPassword)) {
        msgLackArr.push("number");
        console.log("password: does NOT contain number");
      }

      if (msgLackArr.length) {
        setPasswordValMsgLack("need " + msgLackArr.join(", "));
      }

      // if (Validate.isLackedNeededChars(newPassword)) {
      //   console.log("password: lack of needed char");
      // }

      if (Validate.isUsedInvalidChar(newPassword)) {
        setPasswordValMsgInvalidChar("invalid char used");
        console.log("password: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newPassword) !== 0) {
        setPasswordValMsgGeneral(
          `need more ${Validate.charsNeedMore(newPassword)}`
        );
        console.log(
          `password: need more ${Validate.charsNeedMore(newPassword)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newPassword) !== 0) {
        setPasswordValMsgGeneral(
          `exceed ${Validate.charsShouldLess(newPassword)}`
        );
        console.log(
          `password: exceed ${Validate.charsShouldLess(newPassword)}`
        );
        return;
      }
    }, []);

    useEffect(() => {
      if (props.onFirstRender) props.onFirstRender();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <FloatingLabelInput
        ref={ref}
        label={props.label || "password"}
        type="password"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.currentTarget.value);
          handleChangePassword(e.currentTarget.value);
        }}
        onKeyDown={props.onKeyDown}
      >
        <ValMsgBox
          label="length: 5 ~ 20"
          errStatus={
            isInit
              ? "disabled"
              : props.password.length < 5
              ? "NG"
              : props.password.length > 20
              ? "NG"
              : "OK"
          }
          errMsg={
            isInit
              ? ""
              : props.password.length < 5
              ? `${5 - props.password.length} more`
              : props.password.length > 20
              ? `${props.password.length - 20} less`
              : ""
          }
        />
        <ValMsgBox
          label="a~z, A~Z, 0~9 only"
          errStatus={
            !props.password
              ? "disabled"
              : Validate.isUsedInvalidChar(props.password)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        <ValMsgBox
          label="contains a~z"
          errStatus={
            !props.password
              ? "disabled"
              : Validate.doesNotContainLowercase(props.password)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        <ValMsgBox
          label="contains A~Z"
          errStatus={
            !props.password
              ? "disabled"
              : Validate.doesNotContainUppercase(props.password)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        <ValMsgBox
          label="contains 0~9"
          errStatus={
            !props.password
              ? "disabled"
              : Validate.doesNotContainNumber(props.password)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        {props.children}
      </FloatingLabelInput>
    );
  }
);
