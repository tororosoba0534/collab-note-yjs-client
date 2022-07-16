export const AlignCenterSvg = (props: { isActive: boolean }) => {
  return (
    <svg viewBox="0 0 100 100">
      <path
        d="M 10 10 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 35 36 H 65"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 10 64 H 90"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
      <path
        d="M 20 90 H 80"
        stroke={props.isActive ? "white" : "black"}
        strokeWidth="6"
      />
    </svg>
  );
};
