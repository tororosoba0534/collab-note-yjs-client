const config = {
  wsserver: {
    // url: process.env.WS_SERVER_URI as string || "ws://localhost:3001"
    // url: "ws://localhost:3001"
    // url: process.env.NODE_ENV === "production" ? "wss://collab-note-yjs-backend.herokuapp.com" : "ws://localhost:3001",
    // url: "ws://collab-note-yjs-backend.herokuapp.com"
    URL:
      process.env.NODE_ENV === "production"
        ? "wss://collab-note-yjs-backend.herokuapp.com/editor"
        : "ws://localhost:3001/editor",
  },
  server: {
    ORIGIN:
      process.env.NODE_ENV === "production"
        ? "https://collab-note-yjs-backend.herokuapp.com"
        : "http://localhost:3001",
  },
  SESSION_ID_KEY: "sessionID",
};

export default config;
