export const ListSvg = (props: { isActive: boolean }) => {
  const color = props.isActive ? "white" : "black";
  return (
    <svg viewBox="0 0 100 100">
      <circle cx="25" cy="25" r="10" fill={color} />
      <path d="M 45 25 H 75" strokeWidth="10" stroke={color} />

      <circle cx="25" cy="50" r="10" fill={color} />
      <path d="M 45 50 H 75" strokeWidth="10" stroke={color} />

      <circle cx="25" cy="75" r="10" fill={color} />
      <path d="M 45 75 H 75" strokeWidth="10" stroke={color} />
    </svg>
  );
};
