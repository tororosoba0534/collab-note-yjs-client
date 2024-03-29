import { ReactNode } from "react";

export const PopupTemplate = (props: {
  handleClose: React.MouseEventHandler<HTMLDivElement> | null;
  children: ReactNode;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-40"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white rounded-lg ">
        {props.handleClose ? (
          <div className="relative w-full">
            <div
              className="absolute top-0 right-0 w-5 h-5 hover:font-bold cursor-pointer"
              onClick={props.handleClose}
            >
              X
            </div>
          </div>
        ) : null}
        <div className="p-5 pt-3 w-full h-full flex flex-col items-center justify-center gap-5">
          {props.children}
        </div>
      </div>
    </div>
  );
};
