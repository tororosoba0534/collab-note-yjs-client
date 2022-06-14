import { useCallback } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";

export const CAConfirmPasswordInput = (props: {
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  originalPassword: string;
}) => {
  const handleChangeConfirmPassword = useCallback(
    (newConfirmPassword: string, originalPassword: string) => {
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
        {!props.confirmPassword ? null : props.confirmPassword !==
          props.originalPassword ? (
          <div>NOT the same password.</div>
        ) : (
          <div>The same!</div>
        )}
      </div>
    </div>
  );
};
