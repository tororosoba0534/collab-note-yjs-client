import { CustomWSProvider } from "./CustomWSProvider";

import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import { yjsConsts } from "./yjsConsts";
import { IsYjsOriginOf, YjsMsgStatus } from "./YjsMsgContext";

export class YjsWS {
  static sendTest = (provider: CustomWSProvider) => {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST);
    provider.ws?.send(encoding.toUint8Array(encoder));
  };

  static manageMsgPopup = (
    event: MessageEvent<any>,
    setYjsMsgStatus: React.Dispatch<React.SetStateAction<YjsMsgStatus>>,
    isYjsOriginOf: IsYjsOriginOf
  ) => {
    const decoder = decoding.createDecoder(new Uint8Array(event.data));
    const messageType = decoding.readVarUint(decoder);
    console.log(`messageType: ${messageType}`);
    setYjsMsgStatus((prevStatus) => {
      if (
        prevStatus !== null &&
        prevStatus !== "test" &&
        isYjsOriginOf === "deleteAccount"
      )
        return prevStatus;
      return messageType === yjsConsts.MESSAGE_DELETE_ACCOUNT && isYjsOriginOf
        ? "deleteAccount"
        : messageType === yjsConsts.MESSAGE_CHANGE_USER_ID
        ? "changeUserID"
        : messageType === yjsConsts.MESSAGE_CHANGE_PASSWORD
        ? "changePassword"
        : messageType === yjsConsts.MESSAGE_TEST
        ? "test"
        : prevStatus;
    });
  };
}
