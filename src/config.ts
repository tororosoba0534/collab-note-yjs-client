const config = {
    wsserver: {
        // url: process.env.WS_SERVER_URI as string || "ws://localhost:3001"
        // url: "ws://localhost:3001"
        // url: process.env.NODE_ENV === "production" ? "wss://collab-note-yjs-backend.herokuapp.com" : "ws://localhost:3001",
        url: "ws://collab-note-yjs-backend.herokuapp.com"
        // url: "wss://collab-note-yjs-backend.herokuapp.com"
    },
    SOCKET_RECONNECTION_TIMEOUT: 1000,
}

export default config