export const SinkListItemSvg = (props: { disable: boolean }) => {
  const color = props.disable ? "#9ca3af" : "black";
  return (
    <svg viewBox="0 0 100 100">
      <path d="M 80 10 V 90" strokeWidth="10" stroke={color} />
      <path d="M 80 50 H 10" strokeWidth="10" stroke={color} />
      <path
        d="M 40 20 L 75 50 L 40 80"
        fill="none"
        strokeWidth="10"
        stroke={color}
      />
    </svg>
  );
};
