import { forwardRef } from "react";

type Props = {
  disable: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  disableLabel?: string;
};

export const VividButton = forwardRef<HTMLButtonElement, Props>(
  (props: Props, ref) => {
    if (props.disable)
      return (
        <button
          className="px-4 py-2 rounded bg-gray-300 text-white font-semibold text-center block w-full cursor-not-allowed"
          disabled
        >
          {props.disableLabel || props.label}
        </button>
      );

    return (
      <button
        ref={ref}
        className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-400 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-rose-500 focus:ring-opacity-80 cursor-pointer"
        onClick={props.onClick}
      >
        {props.label}
      </button>
    );
  }
);
