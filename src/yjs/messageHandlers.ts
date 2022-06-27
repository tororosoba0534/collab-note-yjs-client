import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";
import * as authProtocol from "y-protocols/auth";
import { CustomWSProvider } from "./CustomWSProvider";
import { yjsConsts } from "./yjsConsts";

export type MessageHandlers = Array<
  (
    encoder: encoding.Encoder,
    decoder: decoding.Decoder,
    provider: CustomWSProvider,
    emitSynced: boolean,
    messageType: number
  ) => void
>;

export const messageHandlers: MessageHandlers = [];

messageHandlers[yjsConsts.MESSAGE_SYNC] = (
  encoder,
  decoder,
  provider,
  emitSynced,
  messageType
) => {
  encoding.writeVarUint(encoder, yjsConsts.MESSAGE_SYNC);
  const syncMessageType = syncProtocol.readSyncMessage(
    decoder,
    encoder,
    provider.doc,
    provider
  );
  if (
    emitSynced &&
    syncMessageType === syncProtocol.messageYjsSyncStep2 &&
    !provider.synced
  ) {
    provider.synced = true;
  }
};

messageHandlers[yjsConsts.MESSAGE_QUERY_AWARENESS] = (
  encoder,
  decoder,
  provider,
  emitSynced,
  messageType
) => {
  encoding.writeVarUint(encoder, yjsConsts.MESSAGE_AWARENESS);
  encoding.writeVarUint8Array(
    encoder,
    awarenessProtocol.encodeAwarenessUpdate(
      provider.awareness,
      Array.from(provider.awareness.getStates().keys())
    )
  );
};

messageHandlers[yjsConsts.MESSAGE_AWARENESS] = (
  encoder,
  decoder,
  provider,
  emitSynced,
  messageType
) => {
  awarenessProtocol.applyAwarenessUpdate(
    provider.awareness,
    decoding.readVarUint8Array(decoder),
    provider
  );
};

messageHandlers[yjsConsts.MESSAGE_AUTH] = (
  encoder,
  decoder,
  provider,
  emitSynced,
  messageType
) => {
  authProtocol.readAuthMessage(decoder, provider.doc, permissionDeniedHandler);
};

const permissionDeniedHandler = (provider: CustomWSProvider, reason: string) =>
  console.warn(`Permission denied to access ${provider.url}.\n${reason}`);
