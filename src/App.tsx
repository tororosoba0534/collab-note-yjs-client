import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TestLinks from "./components/TestLinks";
import config from "./config";
import { EditorWrapper } from "./components/personal/EditorWrapper";
import CreateAccount from "./components/CreateAccount";

function App() {
  console.log(`url: ${config.wsserver.URL}`);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/personal" element={<EditorWrapper />} />

        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/test" element={<TestLinks />} />
      </Routes>
    </div>
  );
}

export default App;
