import { Menu } from "@headlessui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../Loading";
import CustomMenu from "./menu/Menu";

const PersonalLayout = () => {
  return (
    <div className="">
      <div className="sticky top-0 h-10 z-10">
        <CustomMenu />
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default PersonalLayout;
