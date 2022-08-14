export const LiftListItemSvg = (props: { disable: boolean }) => {
  const color = props.disable ? "#9ca3af" : "black";
  return (
    <svg viewBox="0 0 100 100">
      <path d="M 20 10 V 90" strokeWidth="10" stroke={color} />
      <path d="M 20 50 H 90" strokeWidth="10" stroke={color} />
      <path
        d="M 60 20 L 25 50 L 60 80"
        fill="none"
        strokeWidth="10"
        stroke={color}
      />
    </svg>
  );
};
