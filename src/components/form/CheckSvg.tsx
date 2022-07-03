import { ValMsgBoxStatus } from "./types";

export const CheckSvg = (props: { status: ValMsgBoxStatus }) => {
  return (
    <svg className="checksvg" viewBox="0 0 100 100">
      <path
        d="M 10 50 L 35 72 L 90 15"
        fill="none"
        stroke="green"
        strokeWidth="7"
        style={{
          strokeDasharray: 125,
          strokeDashoffset: props.status === "OK" ? 0 : 125,
          transition: "stroke-dashoffset 0.2s linear",
        }}
      />
      <circle
        cx="50"
        cy="50"
        r="10"
        fill={
          props.status === "disabled"
            ? "gray"
            : props.status === "NG"
            ? "white"
            : "none"
        }
      />
    </svg>
  );
};
