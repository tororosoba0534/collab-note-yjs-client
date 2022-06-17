import { Menu } from "@headlessui/react";
import { useContext, useState } from "react";

const CustomMenu = () => {
  return (
    <Menu>
      <Menu.Button className="bg-red-200">Menu</Menu.Button>
      <Menu.Items className="flex flex-col bg-red-500">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${
                active ? "bg-blue-500 text-white" : "bg-white text-black"
              }`}
              href="/account-settings"
            >
              Account settings
            </a>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${active && "bg-blue-500"}`}
              href="/account-settings"
            >
              Documentation
            </a>
          )}
        </Menu.Item>
        <Menu.Item disabled>
          <span className="opacity-75">Invite a friend (coming soon!)</span>
        </Menu.Item>

        <Menu.Item>
          <button>Logout</button>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default CustomMenu;
