import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckSvg } from "./CreateAccount/CheckSvg";
import { ExclamationSvg } from "./CreateAccount/ExclamationSvg";
import { CASvgStatus } from "./CreateAccount/types";
import "./TestLinks.css";

const TestLinks = () => {
  const [status, setStatus] = useState<CASvgStatus>("disabled");

  const handleChangeStatus = () => {
    setStatus((prevStatus) => {
      if (prevStatus === "OK") {
        return "disabled";
      }
      if (prevStatus === "disabled") return "NG";
      return "OK";
    });
  };

  return (
    <div>
      <div className="niceCheck">
        <input type="checkbox" />
        <span></span>
      </div>

      <div className="w-52 h-52 border-8" onClick={handleChangeStatus}>
        <CheckSvg status={status} />
      </div>

      <div className="w-52 h-52 border-8" onClick={handleChangeStatus}>
        <ExclamationSvg />
      </div>
    </div>
  );
};

export default TestLinks;
