import { useState } from "react";
import { LoadingCircleSvg } from "./LoadingCircleSvg";

const TestLinks = () => {
  return (
    <div>
      TEST
      <div className="w-40 h-40 animate-spin">
        <LoadingCircleSvg />
      </div>
    </div>
  );
};

export default TestLinks;
