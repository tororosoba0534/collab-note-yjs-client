import { ReactNode, useEffect, useRef, useState } from "react";
import { PopupTemplate } from "./PopupTemplate";

export const ScrollPopupTemplate = (props: {
  isLoading: boolean;
  submitMsg: string;
  title: string;
  children: ReactNode;
  handleClose: React.MouseEventHandler<HTMLDivElement> | null;
}) => {
  const [titleHeight, setTitleHeight] = useState(40);
  useEffect(() => {
    setTitleHeight(() => {
      if (!props.isLoading && !props.submitMsg) return 40;
      if (props.submitMsg)
        return Math.ceil(props.submitMsg.length / 25) * 24 + 40;
      return 88;
    });
  }, [props.isLoading, props.submitMsg]);
  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-20"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white rounded-lg  w-72 h-[80%]">
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
        <div className="p-5 pt-3 w-full h-full">
          <div className="w-full pb-2">
            <div className="text-center text-xl">{props.title}</div>
            {props.isLoading ? (
              <div>Now waiting response...</div>
            ) : !props.submitMsg ? null : (
              <div className="w-full rounded-md bg-red-400 text-white font-bold py-1 px-2 leading-5">
                {props.submitMsg}
              </div>
            )}
          </div>
          <div
            className="w-full"
            style={{ height: `calc(100% - ${titleHeight}px)` }}
          >
            <div className="w-full h-full flex flex-col p-1 pb-2 rounded-b-3xl rounded-t-sm  border-4 border-gray-500 ">
              <div className="flex-1 overflow-auto">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
