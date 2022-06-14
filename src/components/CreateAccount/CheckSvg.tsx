import "./CheckSvg.css";

export const CheckSvg = (props: { status: "disabled" | "NG" | "OK" }) => {
  return (
    <svg className="checksvg" viewBox="0 0 100 100">
      <rect
        x="20"
        y="40"
        width="40"
        height="40"
        rx="2"
        ry="2"
        fill="none"
        stroke="black"
        strokeWidth="5"
      />
      <path
        d="M 10 50 L 35 72 L 90 15"
        fill="none"
        stroke="green"
        strokeWidth="7"
        style={{
          strokeDasharray: 125,
          strokeDashoffset: props.status === "OK" ? 125 : 0,
          transition: "stroke-dashoffset 0.3s linear",
        }}
      />
    </svg>
  );
};
