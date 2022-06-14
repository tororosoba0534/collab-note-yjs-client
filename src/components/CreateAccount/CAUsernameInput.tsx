import { useCallback, useState } from "react";
import { useCheckUsername } from "../../api/hooks";
import { Validate } from "../../utils/validation";
import { FloatingLabelInput } from "../form/FloatingLabelInput";

export const CAUsernameInput = (props: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [usernameValMsg, setUsernameValMsg] = useState("");

  const { checkUsername, status, thrownErr, isUnused } = useCheckUsername();
  const [isLoading, setIsLoading] = useState(true);

  const handleChangeUsername = useCallback(
    (newUsername: string) => {
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
        {isLoading ? (
          <div className="rounded-md bg-blue-500 text-white"></div>
        ) : usernameValMsg ? (
          <div className="rounded-md bg-red-500 text-white">
            {usernameValMsg}
          </div>
        ) : thrownErr ? (
          <div className="rounded-md bg-red-500 text-white">{thrownErr}</div>
        ) : status !== 200 ? (
          <div className="rounded-md bg-red-500 text-white">
            status code: ${status}
          </div>
        ) : isUnused ? (
          <div className="rounded-md bg-blue-500 text-white">
            You can use this name!
          </div>
        ) : (
          <div className="rounded-md bg-red-500 text-white">
            This name is already used. You should use the other name!
          </div>
        )}
      </div>
    </div>
  );
};
