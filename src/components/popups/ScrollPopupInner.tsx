import { ReactNode } from "react";

export const ScrollPopupInner = (props: { children: ReactNode }) => {
  return (
    <div className="m-3 p-3 pb-6 border-2 border-gray-500 border-dashed rounded-b-3xl rounded-t-sm">
      {props.children}
    </div>
  );
};
