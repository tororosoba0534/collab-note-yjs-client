import { ReactNode } from "react";

export const FormFrame = (props: { children: ReactNode; label?: string }) => {
  return (
    <div className="w-full px-2 py-0 mb-10 bg-gray-100">
      {!props.label ? null : (
        <div className="w-full h-10  bg-gray-100 text-left pl-3 text-2xl">
          {props.label}
        </div>
      )}

      <div className="w-full  bg-white flex flex-col justify-center gap-5 p-5 rounded-b-3xl">
        {props.children}
      </div>
    </div>
  );
};
