import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import TestLinks from "./components/TestLinks";
import config from "./config";
import { EditorWrapper } from "./components/personal/EditorWrapper";
import CreateAccount from "./components/CreateAccount";
import { CreateAccountProvider } from "./components/CreateAccount/CreateAccountContext";
import { PersonalProvider } from "./components/personal/PersonalContext";
import { ThrowForTest } from "./ThrowForTest";

function App() {
  console.log(`url: ${config.wsserver.URL}`);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/personal"
          element={
            <PersonalProvider>
              <EditorWrapper />
            </PersonalProvider>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/create-account"
          element={
            <CreateAccountProvider>
              <CreateAccount />
            </CreateAccountProvider>
          }
        />
        <Route path="/test" element={<TestLinks />} />
        <Route path="/throw" element={<ThrowForTest />} />
      </Routes>
    </div>
  );
}

export default App;
