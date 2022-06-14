import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSvg } from "./CreateAccount/CheckSvg";
import "./TestLinks.css";

const TestLinks = () => {
  const [status, setStatus] = useState<"disabled" | "NG" | "OK">("NG");

  return (
    <div>
      <div className="niceCheck">
        <input type="checkbox" />
        <span></span>
      </div>

      <div
        className="w-52 h-52 border-8"
        onClick={() => {
          setStatus((prevStatus) => {
            if (prevStatus === "OK") {
              return "NG";
            }
            return "OK";
          });
        }}
      >
        <CheckSvg status={status} />
      </div>
    </div>
  );
};

export default TestLinks;
