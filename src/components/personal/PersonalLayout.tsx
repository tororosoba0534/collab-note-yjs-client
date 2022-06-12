import { Menu } from "@headlessui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading";
import CustomMenu from "./menu/Menu";

const PersonalLayout = () => {
  return (
    <div className="relative inset-0">
      <div className="sticky top-0 h-10 w-full">
        <CustomMenu />
      </div>

      <div className="absolute w-full h-[calc(100%-40px)]">
        <Outlet />
      </div>
    </div>
  );
};

export default PersonalLayout;
