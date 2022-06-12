export const TooltipButton = (props: {
  label?: string;
  src?: string;
  tooltip?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  if (!props.label && !props.src) {
    return null;
  }

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

  if (props.src) {
    return (
      <div className="relative">
        <button
          className="peer px-2 bg-gray-100 shadow-md rounded-md hover:bg-rose-100"
          onClick={props.onClick}
        >
          <img src={props.src} alt={props.label} />
        </button>

        <div className="absolute top-10 bg-black text-white px-2 opacity-0 peer-hover:opacity-100 transition pointer-events-none">
          {props.tooltip}
        </div>
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

      <div className="absolute top-10 bg-black text-white px-2 opacity-0 peer-hover:opacity-100 transition pointer-events-none">
        {props.tooltip}
      </div>
    </div>
  );
};
