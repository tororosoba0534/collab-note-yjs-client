const Tooltip = (props: { tooltip: string | null | undefined }) => {
  if (!props.tooltip) return null;
  return (
    <div className="absolute top-10 bg-black text-white p-2 rounded-md opacity-0 peer-hover:opacity-100 transition pointer-events-none z-20">
      {props.tooltip}
    </div>
  );
};

export const TooltipButton = (props: {
  label?: string;
  img?: () => JSX.Element;
  tooltip?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (!props.label && !props.img) {
    return null;
  }

  if (props.img) {
    return (
      <div className="relative">
        <button
          className="peer bg-gray-100 border-2 border-gray-300 rounded-md hover:bg-rose-100 h-10 flex flex-col justify-center items-center"
          onClick={props.onClick}
        >
          <div className="w-6 h-6">
            <props.img />
          </div>
        </button>

        <Tooltip tooltip={props.tooltip} />
      </div>
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

      <Tooltip tooltip={props.tooltip} />
    </div>
  );
};
