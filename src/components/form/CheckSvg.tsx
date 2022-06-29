import "./CheckSvg.css";
import { ValMsgBoxStatus } from "./types";

export const CheckSvg = (props: { status: ValMsgBoxStatus }) => {
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
        strokeWidth="5"
        style={{
          stroke:
            props.status === "OK"
              ? "green"
              : props.status === "disabled"
              ? "gray"
              : "white",
          transition: "stroke 0.3s",
        }}
      />
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
    </svg>
  );
};
