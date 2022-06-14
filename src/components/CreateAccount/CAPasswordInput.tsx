import { useCallback, useState } from "react";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";

export const CAPasswordInput = (props: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [passwordValMsgLack, setPasswordValMsgLack] = useState("");
  const [passwordValMsgInvalidChar, setPasswordValMsgInvalidChar] =
    useState("");
  const [passwordValMsgGeneral, setPasswordValMsgGeneral] = useState("");

  const handleChangePassword = useCallback((newPassword: string) => {
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
      console.log(`password: need more ${Validate.charsNeedMore(newPassword)}`);
      return;
    }

    if (Validate.charsShouldLess(newPassword) !== 0) {
      setPasswordValMsgGeneral(
        `exceed ${Validate.charsShouldLess(newPassword)}`
      );
      console.log(`password: exceed ${Validate.charsShouldLess(newPassword)}`);
      return;
    }
  }, []);

  return (
    <div className="w-full">
      <FloatingLabelInput
        label="password"
        type="password"
        value={props.password}
        onChange={(e) => {
          props.setPassword(e.currentTarget.value);
          handleChangePassword(e.currentTarget.value);
        }}
      />
      <div className="h-20 w-full">
        {passwordValMsgLack ||
        passwordValMsgInvalidChar ||
        passwordValMsgGeneral ? (
          <div>
            <p>{passwordValMsgLack}</p>
            <p>{passwordValMsgInvalidChar}</p>
            <p>{passwordValMsgGeneral}</p>
          </div>
        ) : props.password.length === 0 ? null : (
          <div>Valid password!</div>
        )}
      </div>
    </div>
  );
};
