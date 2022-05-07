const config = {
    wsserver: {
        url: process.env.WS_SERVER_URI as string || "ws://localhost:3001"
    },
    SOCKET_RECONNECTION_TIMEOUT: 1000,
}

export default config