export const AlignCenterSvg = (props: {
  isActive: boolean;
  disable: boolean;
}) => {
  const color = props.disable ? "#9ca3af" : props.isActive ? "white" : "black";
  return (
    <svg viewBox="0 0 100 100">
      <path d="M 20 20 H 80" stroke={color} strokeWidth="6" />
      <path d="M 35 40 H 65" stroke={color} strokeWidth="6" />
      <path d="M 10 60 H 90" stroke={color} strokeWidth="6" />
      <path d="M 30 80 H 70" stroke={color} strokeWidth="6" />
    </svg>
  );
};
