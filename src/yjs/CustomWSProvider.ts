import * as Y from "yjs";
// import * as bc from "lib0/broadcastchannel";
import * as time from "lib0/time";
import * as encoding from "lib0/encoding";
import * as decoding from "lib0/decoding";
import * as syncProtocol from "y-protocols/sync";
import * as awarenessProtocol from "y-protocols/awareness";
import { Observable } from "lib0/observable";
import * as math from "lib0/math";
import * as url from "lib0/url";
import { messageHandlers, MessageHandlers } from "./messageHandlers";
import { yjsConsts } from "./yjsConsts";

const readMessage = (
  provider: CustomWSProvider,
  buf: Uint8Array,
  emitSynced: boolean
): encoding.Encoder => {
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

const setupWS = (provider: CustomWSProvider): void => {
  if (provider.shouldConnect && provider.ws === null) {
    const websocket = new provider._WS(provider.url);
    websocket.binaryType = "arraybuffer";
    provider.ws = websocket;
    provider.wsconnecting = true;
    provider.wsconnected = false;
    provider.synced = false;

    websocket.onmessage = (event) => {
      provider.wsLastMessageReceived = time.getUnixTime();
      const encoder = readMessage(provider, new Uint8Array(event.data), true);
      if (encoding.length(encoder) > 1) {
        websocket.send(encoding.toUint8Array(encoder));
      }
    };
    websocket.onerror = (event) => {
      provider.emit("connection-error", [event, provider]);
    };
    websocket.onclose = (event) => {
      provider.emit("connection-close", [event, provider]);
      provider.ws = null;
      provider.wsconnecting = false;
      if (provider.wsconnected) {
        provider.wsconnected = false;
        provider.synced = false;
        // update awareness (all users except local left)
        awarenessProtocol.removeAwarenessStates(
          provider.awareness,
          Array.from(provider.awareness.getStates().keys()).filter(
            (client) => client !== provider.doc.clientID
          ),
          provider
        );
        provider.emit("status", [
          {
            status: "disconnected",
          },
        ]);
      } else {
        console.log("provider.wsUnsuccessfulReconnects incremented");

        provider.wsUnsuccessfulReconnects++;
      }

      if (!provider.shouldConnect) return;
      if (provider.wsUnsuccessfulReconnects > 1) return;
      // Start with no reconnect timeout and increase timeout by
      // using exponential backoff starting with 100ms
      setTimeout(
        setupWS,
        math.min(
          math.pow(2, provider.wsUnsuccessfulReconnects) * 100,
          provider.maxBackoffTime
        ),
        provider
      );
    };
    websocket.onopen = () => {
      provider.wsLastMessageReceived = time.getUnixTime();
      provider.wsconnecting = false;
      provider.wsconnected = true;
      provider.wsUnsuccessfulReconnects = 0;
      provider.emit("status", [
        {
          status: "connected",
        },
      ]);
      // always send sync step 1 when connected
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, yjsConsts.MESSAGE_SYNC);
      syncProtocol.writeSyncStep1(encoder, provider.doc);
      websocket.send(encoding.toUint8Array(encoder));
      // broadcast local awareness state
      if (provider.awareness.getLocalState() !== null) {
        const encoderAwarenessState = encoding.createEncoder();
        encoding.writeVarUint(
          encoderAwarenessState,
          yjsConsts.MESSAGE_AWARENESS
        );
        encoding.writeVarUint8Array(
          encoderAwarenessState,
          awarenessProtocol.encodeAwarenessUpdate(provider.awareness, [
            provider.doc.clientID,
          ])
        );
        websocket.send(encoding.toUint8Array(encoderAwarenessState));
      }
    };

    provider.emit("status", [
      {
        status: "connecting",
      },
    ]);
  }
};

const broadcastMessage = (provider: CustomWSProvider, buf: ArrayBuffer) => {
  if (provider.wsconnected) {
    /** @type {WebSocket} */ provider.ws?.send(buf);
  }
  // if (provider.bcconnected) {
  //   bc.publish(provider.bcChannel, buf, provider);
  // }
};

// @todo - this should depend on awareness.outdatedTime
const messageReconnectTimeout = 30000;

/**
 * Websocket Provider for Yjs. Creates a websocket connection to sync the shared document.
 * The document name is attached to the provided url. I.e. the following example
 * creates a websocket connection to http://localhost:1234/my-document-name
 *
 * @example
 *   import * as Y from 'yjs'
 *   import { CustomWSProvider } from 'y-websocket'
 *   const doc = new Y.Doc()
 *   const provider = new CustomWSProvider('http://localhost:1234', 'my-document-name', doc)
 *
 * @extends {Observable<string>}
 */
export class CustomWSProvider extends Observable<string> {
  maxBackoffTime: number;
  bcChannel: string;
  url: string;
  roomname: string;
  doc: Y.Doc;
  _WS: typeof WebSocket;
  awareness: awarenessProtocol.Awareness;
  wsconnected: boolean;
  wsconnecting: boolean;
  bcconnected: boolean;
  disableBc: boolean;
  wsUnsuccessfulReconnects: number;
  messageHandlers: MessageHandlers;
  _synced: boolean;
  ws: WebSocket | null;
  wsLastMessageReceived: number;
  shouldConnect: boolean;
  _resyncInterval: number;
  _bcSubscriber: (data: ArrayBuffer, origin: unknown) => void;
  _updateHandler: (update: Uint8Array, origin: unknown) => void;
  _awarenessUpdateHandler: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { added, updated, removed }: any,
    origin: unknown
  ) => void;
  _beforeUnloadHandler: () => void;
  _checkInterval: number;

  constructor(
    serverUrl: string,
    roomname: string,
    doc: Y.Doc,
    {
      connect = true,
      awareness = new awarenessProtocol.Awareness(doc),
      params = {},
      resyncInterval = -1,
      WebSocketPolyfill = WebSocket,
      maxBackoffTime = 2500,
      disableBc = false,
    } = {}
  ) {
    console.log("CustomWSProvider constructor called");

    super();
    // ensure that url is always ends with /
    while (serverUrl[serverUrl.length - 1] === "/") {
      serverUrl = serverUrl.slice(0, serverUrl.length - 1);
    }
    const encodedParams = url.encodeQueryParams(params);
    this.maxBackoffTime = maxBackoffTime;
    this.bcChannel = serverUrl + "/" + roomname;
    this.url =
      serverUrl +
      "/" +
      roomname +
      (encodedParams.length === 0 ? "" : "?" + encodedParams);
    this.roomname = roomname;
    this.doc = doc;
    this._WS = WebSocketPolyfill;
    this.awareness = awareness;
    this.wsconnected = false;
    this.wsconnecting = false;
    this.bcconnected = false;
    this.disableBc = disableBc;
    this.wsUnsuccessfulReconnects = 0;
    this.messageHandlers = messageHandlers.slice();
    /**
     * @type {boolean}
     */
    this._synced = false;
    /**
     * @type {WebSocket?}
     */
    this.ws = null;
    this.wsLastMessageReceived = 0;
    /**
     * Whether to connect to other peers or not
     * @type {boolean}
     */
    this.shouldConnect = connect;

    /**
     * @type {number}
     */
    this._resyncInterval = 0;
    if (resyncInterval > 0) {
      this._resyncInterval = /** @type {any} */ window.setInterval(() => {
        if (this.ws) {
          // resend sync step 1
          const encoder = encoding.createEncoder();
          encoding.writeVarUint(encoder, yjsConsts.MESSAGE_SYNC);
          syncProtocol.writeSyncStep1(encoder, doc);
          this.ws.send(encoding.toUint8Array(encoder));
        }
      }, resyncInterval);
    }

    /**
     * @param {ArrayBuffer} data
     * @param {any} origin
     */
    this._bcSubscriber = (data: ArrayBuffer, origin: unknown) => {
      return;
      // if (origin !== this) {
      //   const encoder = readMessage(this, new Uint8Array(data), false);
      //   if (encoding.length(encoder) > 1) {
      //     bc.publish(this.bcChannel, encoding.toUint8Array(encoder), this);
      //   }
      // }
    };
    /**
     * Listens to Yjs updates and sends them to remote peers (ws and broadcastchannel)
     * @param {Uint8Array} update
     * @param {any} origin
     */
    this._updateHandler = (update: Uint8Array, origin: unknown) => {
      if (origin !== this) {
        const encoder = encoding.createEncoder();
        encoding.writeVarUint(encoder, yjsConsts.MESSAGE_SYNC);
        syncProtocol.writeUpdate(encoder, update);
        broadcastMessage(this, encoding.toUint8Array(encoder));
      }
    };
    this.doc.on("update", this._updateHandler);
    /**
     * @param {any} changed
     * @param {any} origin
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this._awarenessUpdateHandler = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { added, updated, removed }: any,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      origin: unknown
    ) => {
      const changedClients = added.concat(updated).concat(removed);
      const encoder = encoding.createEncoder();
      encoding.writeVarUint(encoder, yjsConsts.MESSAGE_AWARENESS);
      encoding.writeVarUint8Array(
        encoder,
        awarenessProtocol.encodeAwarenessUpdate(awareness, changedClients)
      );
      broadcastMessage(this, encoding.toUint8Array(encoder));
    };
    this._beforeUnloadHandler = () => {
      awarenessProtocol.removeAwarenessStates(
        this.awareness,
        [doc.clientID],
        "window unload"
      );
    };
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", this._beforeUnloadHandler);
    } else if (typeof process !== "undefined") {
      process.on("exit", this._beforeUnloadHandler);
    }
    awareness.on("update", this._awarenessUpdateHandler);
    this._checkInterval = /** @type {any} */ window.setInterval(() => {
      if (
        this.wsconnected &&
        messageReconnectTimeout <
          time.getUnixTime() - this.wsLastMessageReceived
      ) {
        // no message received in a long time - not even your own awareness
        // updates (which are updated every 15 seconds)
        /** @type {WebSocket} */ this.ws?.close();
      }
    }, messageReconnectTimeout / 10);
    if (connect) {
      this.connect();
    }
  }

  /**
   * @type {boolean}
   */
  get synced() {
    return this._synced;
  }

  set synced(state) {
    if (this._synced !== state) {
      this._synced = state;
      this.emit("synced", [state]);
      this.emit("sync", [state]);
    }
  }

  destroy() {
    console.log("provider.destroy() called!");

    if (this._resyncInterval !== 0) {
      clearInterval(this._resyncInterval);
    }
    clearInterval(this._checkInterval);
    this.disconnect();
    if (typeof window !== "undefined") {
      window.removeEventListener("beforeunload", this._beforeUnloadHandler);
    } else if (typeof process !== "undefined") {
      process.off("exit", this._beforeUnloadHandler);
    }
    this.awareness.off("update", this._awarenessUpdateHandler);
    this.doc.off("update", this._updateHandler);
    super.destroy();
  }

  connectBc() {
    return;
    // if (this.disableBc) {
    //   return;
    // }
    // if (!this.bcconnected) {
    //   bc.subscribe(this.bcChannel, this._bcSubscriber);
    //   this.bcconnected = true;
    // }
    // // send sync step1 to bc
    // // write sync step 1
    // const encoderSync = encoding.createEncoder();
    // encoding.writeVarUint(encoderSync, yjsConsts.MESSAGE_SYNC);
    // syncProtocol.writeSyncStep1(encoderSync, this.doc);
    // bc.publish(this.bcChannel, encoding.toUint8Array(encoderSync), this);
    // // broadcast local state
    // const encoderState = encoding.createEncoder();
    // encoding.writeVarUint(encoderState, yjsConsts.MESSAGE_SYNC);
    // syncProtocol.writeSyncStep2(encoderState, this.doc);
    // bc.publish(this.bcChannel, encoding.toUint8Array(encoderState), this);
    // // write queryAwareness
    // const encoderAwarenessQuery = encoding.createEncoder();
    // encoding.writeVarUint(
    //   encoderAwarenessQuery,
    //   yjsConsts.MESSAGE_QUERY_AWARENESS
    // );
    // bc.publish(
    //   this.bcChannel,
    //   encoding.toUint8Array(encoderAwarenessQuery),
    //   this
    // );
    // // broadcast local awareness state
    // const encoderAwarenessState = encoding.createEncoder();
    // encoding.writeVarUint(encoderAwarenessState, yjsConsts.MESSAGE_AWARENESS);
    // encoding.writeVarUint8Array(
    //   encoderAwarenessState,
    //   awarenessProtocol.encodeAwarenessUpdate(this.awareness, [
    //     this.doc.clientID,
    //   ])
    // );
    // bc.publish(
    //   this.bcChannel,
    //   encoding.toUint8Array(encoderAwarenessState),
    //   this
    // );
  }

  disconnectBc() {
    return;
    // // broadcast message with local awareness state set to null (indicating disconnect)
    // const encoder = encoding.createEncoder();
    // encoding.writeVarUint(encoder, yjsConsts.MESSAGE_AWARENESS);
    // encoding.writeVarUint8Array(
    //   encoder,
    //   awarenessProtocol.encodeAwarenessUpdate(
    //     this.awareness,
    //     [this.doc.clientID],
    //     new Map()
    //   )
    // );
    // broadcastMessage(this, encoding.toUint8Array(encoder));
    // if (this.bcconnected) {
    //   bc.unsubscribe(this.bcChannel, this._bcSubscriber);
    //   this.bcconnected = false;
    // }
  }

  disconnect() {
    this.shouldConnect = false;
    this.disconnectBc();
    if (this.ws !== null) {
      this.ws.close();
    }
  }

  connect() {
    this.shouldConnect = true;
    if (!this.wsconnected && this.ws === null) {
      setupWS(this);
      this.connectBc();
    }
  }
}
