export const TooltipButton = (props: {
  label: string;
  tooltip: string | null;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (!props.tooltip) {
    return (
      <button
        className="px-2 bg-gray-100 shadow-md rounded-md hover:bg-rose-100"
        onClick={props.onClick}
      >
        {props.label}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        className="peer px-2 bg-gray-100 shadow-md rounded-md hover:bg-rose-100"
        onClick={props.onClick}
      >
        {props.label}
      </button>

      <div className="absolute top-10 bg-black text-white px-2 opacity-0 peer-hover:opacity-100 transition pointer-events-none">
        {props.tooltip}
      </div>
    </div>
  );
};
