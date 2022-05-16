import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./auths/RequireAuth";
import Login from "./components/Login";
import { TiptapEditor } from "./components/TiptapEditor";
import config from "./config";

function App() {
  console.log(`url: ${config.wsserver.URL}`)
  return (
    <div className="App">
      <h2>Welcome to React-Router!</h2>
      <Routes>
        <Route path="/" element={
          <RequireAuth >
            <TiptapEditor />
          </RequireAuth >
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
