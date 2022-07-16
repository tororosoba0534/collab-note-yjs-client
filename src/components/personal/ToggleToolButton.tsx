import { ReactNode } from "react";

export const ToggleToolButton = (props: {
  isActive: boolean;
  disable?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
}) => {
  if (props.disable) {
    <button className=" bg-white border-2 border-gray-400 rounded-md text-gray-400 cursor-not-allowed">
      <div className="w-6 h-6">{props.children}</div>
    </button>;
  }
  if (props.isActive)
    return (
      <button
        className=" bg-black border-2 border-black rounded-md text-white hover:bg-gray-700 hover:border-gray-600"
        onClick={props.onClick}
      >
        <div className="w-6 h-6">{props.children}</div>
      </button>
    );

  return (
    <button
      className=" bg-white border-2 border-gray-900 rounded-md hover:bg-gray-100"
      onClick={props.onClick}
    >
      <div className="w-6 h-6">{props.children}</div>
    </button>
  );
};
