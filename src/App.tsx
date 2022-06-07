import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthGate from "./auths/AuthGate";
import { UserContext } from "./auths/userProvider";
import ChangePassword from "./components/personal/ChangePassword";
import ChangeUsername from "./components/personal/ChangeUsername";
import DeleteAccount from "./components/personal/DeleteAccount";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import PersonalLayout from "./components/personal/PersonalLayout";
import Register from "./components/Register";
import SettingsLayout from "./components/personal/SettingsLayout";
import TestLinks from "./components/TestLinks";
import { TiptapEditor } from "./components/personal/TiptapEditor";
import config from "./config";

function App() {
  console.log(`url: ${config.wsserver.URL}`);
  const { username } = useContext(UserContext);
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
          <Route index element={<TiptapEditor username={username} />} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route path="delete-account" element={<DeleteAccount />} />
            <Route path="change-username" element={<ChangeUsername />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<TestLinks />} />
      </Routes>
    </div>
  );
}

export default App;
