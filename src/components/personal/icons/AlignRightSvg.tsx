export const AlignRightSvg = (props: { isActive: boolean }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 25 20 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 60 40 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 15 60 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 40 80 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
    </svg>
  );
};
