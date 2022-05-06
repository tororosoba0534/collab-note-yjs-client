import { createContext, useContext, useEffect, useState } from "react"
import config from "../../config"

const initSocket = new WebSocket(config.wsserver.url)
export const SocketContext = createContext(initSocket)

export const SocketProvider = ({children}: any) => {
    const [socket, setSocket] = useState(initSocket)

    useEffect(() => {
        const onClose = () => {
            setTimeout(() => {
                setSocket(() => new WebSocket(config.wsserver.url))
            }, config.SOCKET_RECONNECTION_TIMEOUT)
        }

        socket.addEventListener("close", onClose)

        return () => {
            socket.removeEventListener("close", onClose)
        }

    }, [socket, setSocket])

    return (
        <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    )
}

export const useSocket = () => {
    const socket = useContext(SocketContext)

    return socket
}