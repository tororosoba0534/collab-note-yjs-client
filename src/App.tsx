import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RequireAuth from "./auths/RequireAuth";
import { UserContext } from "./auths/userProvider";
import Login from "./components/Login";
import Register from "./components/Register";
import { TiptapEditor } from "./components/TiptapEditor";
import config from "./config";

function App() {
  console.log(`url: ${config.wsserver.URL}`)
  const {username} = useContext(UserContext)
  return (
    <div className="App">
      <h2>Welcome to React-Router!</h2>
      <Routes>
        <Route path="/" element={
          <RequireAuth >
            <TiptapEditor username={username}/>
          </RequireAuth >
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
