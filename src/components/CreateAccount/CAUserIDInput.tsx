import { useCallback, useState } from "react";
import { useCheckUserID } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";
import { ExclamationSvg } from "./ExclamationSvg";
import { ValMsgBox } from "./ValMsgBox";

export const CAUserIDInput = (props: {
  userID: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isInit, setIsInit] = useState(true);

  const { checkUserID, status, thrownErr, isUnused } = useCheckUserID();
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeUserID = useCallback(
    (newUserID: string) => {
      setIsInit(() => false);

      if (Validate.isNotValidUserID(newUserID)) {
        return;
      }

      setIsLoading(true);
      checkUserID(newUserID).then(() => {
        setIsLoading(false);
      });
    },

    [checkUserID]
  );

  return (
    <div className="w-full">
      <FloatingLabelInput
        label="userID"
        type="text"
        value={props.userID}
        onChange={(e) => {
          props.setUserID(e.currentTarget.value);
          handleChangeUserID(e.currentTarget.value);
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
        <ValMsgBox
          label="is NOT already used?"
          errStatus={
            !props.userID
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
