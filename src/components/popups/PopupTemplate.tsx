import { ReactNode } from "react";

export const PopupTemplate = (props: {
  handleClose: React.MouseEventHandler<HTMLDivElement> | null;
  children: ReactNode;
}) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-gray-100 rounded-lg  w-72 h-[80%]">
        {props.handleClose ? (
          <div className="relative w-full h-5">
            <div
              className="absolute top-0 right-0 w-5 h-5 hover:font-bold cursor-pointer"
              onClick={props.handleClose}
            >
              X
            </div>
          </div>
        ) : null}
        <div className="p-5 py-10 w-full h-full flex flex-col ">
          <div className="flex-1 overflow-auto">{props.children}</div>
        </div>
      </div>
    </div>
  );
};
