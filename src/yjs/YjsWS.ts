import { CustomWSProvider } from "./CustomWSProvider";

import * as encoding from "lib0/encoding";
import { yjsConsts } from "./yjsConsts";

export class YjsWS {
  static sendTest = (provider: CustomWSProvider) => {
    const encoder = encoding.createEncoder();
    encoding.writeVarUint(encoder, yjsConsts.MESSAGE_TEST);
    provider.ws?.send(encoding.toUint8Array(encoder));
  };
}
