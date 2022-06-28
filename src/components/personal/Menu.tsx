import { useState } from "react";

export const Menu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <div className="flex-none w-56 h-16 bg-slate-500 relative">
      <div
        className="absolute m-2 p-2 border-2"
        onClick={() => setIsOpenMenu((prev) => !prev)}
      >
        Menu
      </div>
      <div
        className="absolute w-56 h-56  bg-green-500 top-24 transition-all"
        style={{
          opacity: isOpenMenu ? 1 : 0,
          visibility: isOpenMenu ? "visible" : "hidden",
          top: isOpenMenu ? "92px" : "80px",
        }}
        onClick={() => console.log("Dropdown clicked!")}
      >
        DROP DOWN MENU
      </div>
    </div>
  );
};
