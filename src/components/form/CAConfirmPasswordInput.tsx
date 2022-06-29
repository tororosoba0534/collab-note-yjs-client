import { useCallback, useState } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "./FloatingLabelInput";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

export const CAConfirmPasswordInput = (props: {
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  originalPassword: string;
}) => {
  const [isInit, setIsInit] = useState(true);

  const handleChangeConfirmPassword = useCallback(
    (newConfirmPassword: string, originalPassword: string) => {
      setIsInit(() => false);
      if (Validate.isNotValidPassword(originalPassword)) return;

      if (newConfirmPassword !== originalPassword) {
        console.log("confirm password: password NOT the same.");
        return;
      }
      console.log("confirm password: same password");
    },
    []
  );

  return (
    <div className="w-full">
      <FloatingLabelInput
        label="confirm password"
        type="password"
        value={props.confirmPassword}
        onChange={(e) => {
          props.setConfirmPassword(e.currentTarget.value);
          handleChangeConfirmPassword(
            e.currentTarget.value,
            props.originalPassword
          );
        }}
      />
      <div className="h-10 w-full">
        <ValMsgBox
          label="the same password?"
          errStatus={
            props.originalPassword && !props.confirmPassword
              ? "NG"
              : props.confirmPassword && !props.originalPassword
              ? "NG"
              : !props.originalPassword
              ? "disabled"
              : props.confirmPassword === props.originalPassword
              ? "OK"
              : "NG"
          }
          errMsg={ExclamationSvg()}
        />
      </div>
    </div>
  );
};
