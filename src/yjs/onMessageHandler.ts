import { WebsocketProvider } from "y-websocket";
import * as time from "lib0/time";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import { yjsConsts } from "./yjsConsts";

export const onMessageHandler = (
  event: MessageEvent<any>,
  provider: WebsocketProvider
) => {
  provider.wsLastMessageReceived = time.getUnixTime();
  const encoder = readMessage(provider, new Uint8Array(event.data), true);
  if (encoding.length(encoder) > 1) {
    provider.ws?.send(encoding.toUint8Array(encoder));
  }
};

const readMessage = (
  provider: WebsocketProvider,
  buf: Uint8Array,
  emitSynced: boolean
) => {
  const decoder = decoding.createDecoder(buf);
  const encoder = encoding.createEncoder();
  const messageType = decoding.readVarUint(decoder);
  const messageHandler = provider.messageHandlers[messageType];
  if (/** @type {any} */ messageHandler) {
    messageHandler(encoder, decoder, provider, emitSynced, messageType);
  } else {
    console.error("Unable to compute message");
  }
  return encoder;
};

const messageHandlers = [];

// messageHandlers[yjsConsts.MESSAGE_SYNC] = (encoder, decoder, provider, emitSynced, messageType) => {
//   encoding.writeVarUint(encoder, messageSync)
//   const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, provider.doc, provider)
//   if (emitSynced && syncMessageType === syncProtocol.messageYjsSyncStep2 && !provider.synced) {
//     provider.synced = true
//   }
// }

// messageHandlers[yjsConsts.MESSAGE_AWARENESS] = (encoder, decoder, provider, emitSynced, messageType) => {
//     awarenessProtocol.applyAwarenessUpdate(provider.awareness, decoding.readVarUint8Array(decoder), provider)
//   }
