import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGate from "./auths/AuthGate";
import ChangePassword from "./components/personal/ChangePassword";
import ChangeUserID from "./components/personal/ChangeUserID";
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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/personal"
          element={
            <AuthGate>
              <Outlet />
            </AuthGate>
          }
        >
          <Route index element={<EditorWrapper />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="change-username" element={<ChangeUserID />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/test" element={<TestLinks />} />
      </Routes>

      <LogoutWindow />
    </div>
  );
}

export default App;
