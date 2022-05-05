import React from "react";
import "./App.css";
import { TiptapEditor } from "./components/TiptapEditor";
import { FetchedData } from "./components/FetchedData";

function App() {
  return (
    <div className="App">
      <FetchedData />
      <TiptapEditor />
    </div>
  );
}

export default App;
