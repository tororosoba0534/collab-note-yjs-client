import React from "react";
import "./App.css";
import { TiptapEditor } from "./components/TiptapEditor";
import { FetchedData } from "./components/FetchedData";
import { WSInteractiveComponent } from "./components/websockets";

function App() {
  return (
    <div className="App">
      <FetchedData />
      <WSInteractiveComponent />
      <TiptapEditor />
    </div>
  );
}

export default App;
