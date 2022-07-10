import { PopupTemplate } from "./PopupTemplate";

export const SessionTimeoutWindow = () => {
  return (
    <PopupTemplate handleClose={null}>
      <div>Your session has been expired!</div>
      <p>Please login again.</p>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => window.location.reload()}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
