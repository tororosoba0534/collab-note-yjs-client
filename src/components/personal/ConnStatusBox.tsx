import { useEffect, useState } from "react";
import { CustomWSProvider } from "../../yjs/CustomWSProvider";
import { LoadingCircleSvg } from "../LoadingCircleSvg";
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
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <span className="text-sm">connection</span>
        <span>OK</span>
      </div>
    );
  }

  if (connStatus === "connecting") {
    return (
      <div className="h-full w-full relative">
        <div className="absolute left-6 top-1 w-8 h-8">
          <LoadingCircleSvg />
        </div>
        <div className="text-sm absolute bottom-2">connecting...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-red-600 relative">
      <span className="text-white text-sm absolute top-0 left-1">
        Connection
      </span>
      <span className="text-white text-sm absolute top-4 left-5">failed!!</span>
      <button
        className="absolute bottom-1 bg-red-300 hover:bg-red-200 px-2 mx-1 rounded-md text-xs leading-3"
        onClick={() => window.location.reload()}
      >
        Try reconnect
      </button>
    </div>
  );
};
