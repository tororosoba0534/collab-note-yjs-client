export const AlignCenterSvg = (props: { isActive: boolean }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 20 20 H 80"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 35 40 H 65"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 10 60 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 30 80 H 70"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
    </svg>
  );
};
