import { useEffect, useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
export type ConnStatus = "connected" | "connecting" | "disconnected";
export const ConnStatusBox = (props: { provider: CustomWSProvider }) => {
  const [connStatus, setConnStatus] = useState<ConnStatus>("connecting");
  useEffect(() => {
    const interval = setInterval(() => {
      setConnStatus(
        props.provider.wsconnected
          ? "connected"
          : props.provider.wsconnecting
          ? "connecting"
          : "disconnected"
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [props.provider]);

  if (connStatus === "connected") {
    return <div>connection OK</div>;
  }

  if (connStatus === "connecting") {
    return <div>Now connecting...</div>;
  }

  return (
    <div className="w-full h-full bg-red-600 flex items-center justify-center flex-col">
      <span className="text-white">Connection failed!</span>
      <button
        className="bg-red-300 px-3 rounded-md"
        onClick={() => window.location.reload()}
      >
        try reconnect
      </button>
    </div>
  );
};
