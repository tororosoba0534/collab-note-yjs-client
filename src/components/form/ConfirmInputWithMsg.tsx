import { forwardRef, useCallback, useState } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

type Props = {
  confirm: string;
  setConfirm: React.Dispatch<React.SetStateAction<string>>;
  original: string;
  type: "text" | "password";
  label: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
};

export const ConfirmInputWithMsg = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    const [isInit, setIsInit] = useState(true);

    const handleChangeConfirm = useCallback(
      (newConfirm: string, original: string) => {
        setIsInit(() => false);
        if (props.type === "text" && Validate.isNotValidUserID(original)) {
          return;
        } else if (
          props.type === "password" &&
          Validate.isNotValidPassword(original)
        ) {
          return;
        }

        if (newConfirm !== original) {
          console.log("confirm: NOT the same.");
          return;
        }
        console.log("confirm: same");
      },
      [props.type]
    );

    return (
      <FloatingLabelInput
        ref={ref}
        label={props.label}
        type={props.type}
        value={props.confirm}
        onChange={(e) => {
          props.setConfirm(e.currentTarget.value);
          handleChangeConfirm(e.currentTarget.value, props.original);
        }}
        onKeyDown={props.onKeyDown}
      >
        <ValMsgBox
          label="same as above?"
          errStatus={
            props.original && !props.confirm
              ? "NG"
              : props.confirm && !props.original
              ? "NG"
              : !props.original
              ? "disabled"
              : props.confirm === props.original
              ? "OK"
              : "NG"
          }
          errMsg={ExclamationSvg()}
        />
      </FloatingLabelInput>
    );
  }
);
