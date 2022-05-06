import { useCallback, useEffect } from "react"
import { useSocket } from "./SocketProvider"

export const WSApp = () => {
    const socket = useSocket()

    const onMessage = useCallback((message: any) => {
        const data = JSON.parse(message?.data)
        const hey = data?.hey
      

        console.log(hey)

    }, [])

    useEffect(() => {
        socket.addEventListener("message", onMessage)
    }, [socket, onMessage])

    return (
        <div>
            <button 
                onClick={() => {
                    socket.send(JSON.stringify({hello: "from ws client"}))
                }}
            >Click to send</button>
        </div>
    )
}