import { useCallback, useState } from "react";
import { useCheckUsername } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

export const CAUsernameInput = (props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [usernameValMsg, setUsernameValMsg] = useState("");
  const [isInit, setIsInit] = useState(true);

  const { checkUsername, status, thrownErr, isUnused } = useCheckUsername();
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeUsername = useCallback(
    (newUsername: string) => {
      setIsInit(() => false);
      setUsernameValMsg("");
      setIsLoading(true);
      if (Validate.isUsedInvalidChar(newUsername)) {
        setUsernameValMsg("invalid char used");
        setIsLoading(false);
        console.log("username: invalid char used");
        return;
      }

      if (Validate.charsNeedMore(newUsername) !== 0) {
        setUsernameValMsg(`need more ${Validate.charsNeedMore(newUsername)}`);
        setIsLoading(false);
        console.log(
          `username: need more ${Validate.charsNeedMore(newUsername)}`
        );
        return;
      }

      if (Validate.charsShouldLess(newUsername) !== 0) {
        setUsernameValMsg(`exceed ${Validate.charsShouldLess(newUsername)}`);
        setIsLoading(false);
        console.log(
          `username: exceed ${Validate.charsShouldLess(newUsername)}`
        );
        return;
      }

      checkUsername(newUsername).then(() => {
        setIsLoading(false);
      });
    },

    [checkUsername]
  );

  return (
    <div className="w-full">
      <FloatingLabelInput
        label="username"
        type="text"
        value={props.username}
        onChange={(e) => {
          props.setUsername(e.currentTarget.value);
          handleChangeUsername(e.currentTarget.value);
        }}
      />
      <div className="h-10 w-full">
        <ValMsgBox
          label="length: 5 ~ 20 "
          errStatus={
            isInit
              ? "disabled"
              : props.username.length < 5
              ? "NG"
              : props.username.length > 20
              ? "NG"
              : "OK"
          }
          errMsg={
            isInit
              ? ""
              : props.username.length < 5
              ? `${5 - props.username.length} more`
              : props.username.length > 20
              ? `${props.username.length - 20} less`
              : ""
          }
        />
        <ValMsgBox
          label="a~z, A~Z, 0~9 only"
          errStatus={
            !props.username
              ? "disabled"
              : Validate.isUsedInvalidChar(props.username)
              ? "NG"
              : "OK"
          }
          errMsg={ExclamationSvg()}
        />
        <ValMsgBox
          label="is NOT already used?"
          errStatus={
            !props.username
              ? "disabled"
              : isInit
              ? "disabled"
              : isLoading
              ? "disabled"
              : isUnused
              ? "OK"
              : "NG"
          }
          errMsg={ExclamationSvg()}
        />
      </div>
    </div>
  );
};
