export const AlignRightSvg = (props: {
  isActive: boolean;
  disable: boolean;
}) => {
  const color = props.disable ? "#9ca3af" : props.isActive ? "white" : "black";
  return (
    <svg viewBox="0 0 100 100">
      <path d="M 25 20 H 90" stroke={color} strokeWidth="6" />
      <path d="M 60 40 H 90" stroke={color} strokeWidth="6" />
      <path d="M 15 60 H 90" stroke={color} strokeWidth="6" />
      <path d="M 40 80 H 90" stroke={color} strokeWidth="6" />
    </svg>
  );
};
