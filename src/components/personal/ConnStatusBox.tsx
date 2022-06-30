import { useEffect, useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
export type ConnStatus = "connected" | "connecting" | "disconnected";
export const ConnStatusBox = (props: { provider: CustomWSProvider }) => {
  const [connStatus, setConnStatus] = useState<ConnStatus>("disconnected");
  useEffect(() => {
    const interval = setInterval(() => {
      setConnStatus(
        props.provider.wsconnected
          ? "connected"
          : props.provider.wsconnecting
          ? "connecting"
          : "disconnected"
      );
      //   const status = provider.wsconnected
      //     ? "connected"
      //     : provider.wsconnecting
      //     ? "connecting"
      //     : "disconnected";
      //   ;
    }, 1000);
    return () => clearInterval(interval);
  }, [props.provider]);
  return <div>{connStatus}</div>;
};
