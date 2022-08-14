import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import Login from "./components/pages/Login";
import TestLinks from "./components/pages/TestLinks";
import config from "./config";
import { EditorWrapper } from "./components/pages/personal/EditorWrapper";
import CreateAccount from "./components/pages/CreateAccount";
import { CreateAccountProvider } from "./components/pages/CreateAccount/CreateAccountContext";
import { PersonalProvider } from "./components/pages/personal/PersonalContext";
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
