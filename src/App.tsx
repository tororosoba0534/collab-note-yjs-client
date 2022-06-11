import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGate from "./auths/AuthGate";
import ChangePassword from "./components/personal/ChangePassword";
import ChangeUsername from "./components/personal/ChangeUsername";
import DeleteAccount from "./components/personal/DeleteAccount";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PersonalLayout from "./components/personal/PersonalLayout";
import SettingsLayout from "./components/personal/SettingsLayout";
import TestLinks from "./components/TestLinks";
import config from "./config";
import { EditorWrapper } from "./components/personal/EditorWrapper";
import CreateAccount from "./components/CreateAccount";
import { LogoutWindow } from "./components/popups/LogoutWindow";
import { PopupsContext } from "./components/popups/PopupsProvider";

function App() {
  console.log(`url: ${config.wsserver.URL}`);

  const { isOpenLogout, setIsOpenLogout } = useContext(PopupsContext);

  return (
    <div className="App">
      <h2>Welcome to React-Router!</h2>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/personal"
          element={
            <AuthGate>
              <PersonalLayout />
            </AuthGate>
          }
        >
          <Route index element={<EditorWrapper />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="change-username" element={<ChangeUsername />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/test" element={<TestLinks />} />
      </Routes>

      <LogoutWindow isOpen={isOpenLogout} setIsOpen={setIsOpenLogout} />
    </div>
  );
}

export default App;
