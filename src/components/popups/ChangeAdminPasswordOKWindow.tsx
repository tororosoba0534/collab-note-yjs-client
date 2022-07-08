import { PopupTemplate } from "./PopupTemplate";

export const ChangeAdminPasswordOKWindow = () => {
  return (
    <PopupTemplate handleClose={null}>
      <div>Admin password changed.</div>

      <button
        className="border-2 border-gray-400 rounded-md px-2 mx-4 hover:bg-rose-200"
        onClick={() => window.location.reload()}
      >
        OK
      </button>
    </PopupTemplate>
  );
};
