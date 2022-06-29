import { PopupTemplate } from "./PopupTemplate";

export const ChangePasswordOKWindow = () => {
  return (
    <PopupTemplate handleClose={null}>
      <div>Password changed.</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => window.location.reload()}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
