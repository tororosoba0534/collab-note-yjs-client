import { useState } from "react";
import { LoadingCircleSvg } from "./LoadingCircleSvg";

const TestLinks = () => {
  return (
    <div>
      TEST
      <div className="w-20 h-16 border-2 border-black m-10">
        <div className="h-full w-full relative">
          <div className="absolute left-6 top-1 w-8 h-8">
            <LoadingCircleSvg />
          </div>
          <div className="text-sm absolute bottom-2">connecting...</div>
        </div>
      </div>
    </div>
  );
};

export default TestLinks;
