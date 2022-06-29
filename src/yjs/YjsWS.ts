import { CustomWSProvider } from "./CustomWSProvider";

import * as decoding from "lib0/decoding";
import * as encoding from "lib0/encoding";
import { yjsConsts } from "./yjsConsts";
import { PopupStatus } from "../components/personal/TiptapEditor";

export class YjsWS {
  static sendTest = (provider: CustomWSProvider) => {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST);
    provider.ws?.send(encoding.toUint8Array(encoder));
  };

  static sendTestClose = (provider: CustomWSProvider) => {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST_CLOSE);
    provider.ws?.send(encoding.toUint8Array(encoder));
  };

  static manageMsgPopup = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    event: MessageEvent<any>,
    props: {
      setPopupStatus: React.Dispatch<React.SetStateAction<PopupStatus>>;
    }
  ) => {
    const decoder = decoding.createDecoder(new Uint8Array(event.data));
    const messageType = decoding.readVarUint(decoder);
    console.log(`messageType: ${messageType}`);
    if (messageType < 6) return;
    props.setPopupStatus((prevStatus) => {
      if (messageType === yjsConsts.MESSAGE_CHANGE_USER_ID) {
        console.log("UserID should be updated on client side.");
        // TODO: update userID of ydoc and websocket url
      }

      if (prevStatus === "deleteAccountOK") return prevStatus;

      switch (messageType) {
        case yjsConsts.MESSAGE_TEST: {
          return "test";
        }

        case yjsConsts.MESSAGE_DELETE_ACCOUNT: {
          return "deleteAccountOK";
        }

        case yjsConsts.MESSAGE_CHANGE_USER_ID: {
          return "changeUserIDOK";
        }

        case yjsConsts.MESSAGE_CHANGE_PASSWORD: {
          return "changePasswordOK";
        }

        default:
          return prevStatus;
      }
    });
  };
}
