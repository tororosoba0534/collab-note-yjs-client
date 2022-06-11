import { useState } from "react";
import { Link } from "react-router-dom";
import { LogoutWindow } from "./popups/LogoutWindow";

const TestLinks = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col">
      <Link to="/personal">to Personal</Link>
      <Link to="/personal/settings">to Settings</Link>
      <Link to="/personal/settings/delete-account">to DeleteAccount</Link>
      <button onClick={() => setIsOpen(true)}>Logout button</button>
      <LogoutWindow isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default TestLinks;
