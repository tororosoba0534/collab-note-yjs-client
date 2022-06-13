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
          className="peer px-2 bg-gray-100 shadow-md rounded-md hover:bg-rose-100"
          onClick={props.onClick}
        >
          <div className="w-10 h-10">
            <props.img />
          </div>
        </button>

        {props.tooltip ? (
          <div className="absolute top-10 bg-black text-white px-2 opacity-0 peer-hover:opacity-100 transition pointer-events-none">
            {props.tooltip}
          </div>
        ) : null}
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

      {props.tooltip ? (
        <div className="absolute top-10 bg-black text-white px-2 opacity-0 peer-hover:opacity-100 transition pointer-events-none">
          {props.tooltip}
        </div>
      ) : null}
    </div>
  );
};
