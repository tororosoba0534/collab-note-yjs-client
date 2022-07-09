import { ReactNode } from "react";

export const FormBase = (props: { children: ReactNode }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col justify-center items-center gap-8 py-5  shadow-[3px_3px_12px_rgba(0,0,0,0.3)]  rounded-2xl bg-gray-100 mt-10 mb-10">
        {props.children}
      </div>
    </div>
  );
};
