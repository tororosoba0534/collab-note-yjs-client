import React from "react";
import "./App.css";
import { TiptapEditor } from "./components/TiptapEditor";
import { FetchedData } from "./components/FetchedData";
import { WSInteractiveComponent } from "./components/websockets";
import config from "./config";

function App() {
  console.log(`url: ${config.wsserver.url}`)
  return (
    <div className="App">
      <FetchedData />
      {/* <WSInteractiveComponent /> */}
      <TiptapEditor />
    </div>
  );
}

export default App;
