import { ReactNode } from "react";

export const FormFrame = (props: { children: ReactNode; label?: string }) => {
  return (
    <div className="w-full px-2 py-0 bg-gray-100">
      <div className="w-full h-10  bg-gray-100 text-left pb-1 pt-3 px-1">
        {props.label}
      </div>
      <div className="w-full  bg-white flex flex-col justify-center gap-5 p-5 rounded-b-3xl">
        {props.children}
      </div>
    </div>
  );
};
