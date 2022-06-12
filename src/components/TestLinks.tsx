import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoutWindow } from "./popups/LogoutWindow";
import { SelectParagraphSvg } from "./personal/icons/SelectParagraphSvg";

const TestLinks = () => {
  return (
    <div className="flex flex-col">
      <Link to="/personal">to Personal</Link>
      <Link to="/personal/settings">to Settings</Link>
      <Link to="/personal/settings/delete-account">to DeleteAccount</Link>

      <SelectParagraphSvg />
    </div>
  );
};

export default TestLinks;
