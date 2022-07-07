import { ReactNode } from "react";

export type CAStepNum = 1 | 2 | 3 | 4;

export const CAStep = (props: { step: CAStepNum; children: ReactNode }) => {
  return (
    <div className="w-full px-2 py-0 bg-gray-100">
      <div className="w-full bg-gray-100 text-left pb-1 pt-3 px-1">
        Step. {props.step}
      </div>
      <div className="w-full bg-white flex flex-col justify-center gap-5 p-5 rounded-b-3xl">
        {props.children}
      </div>
    </div>
  );
};
