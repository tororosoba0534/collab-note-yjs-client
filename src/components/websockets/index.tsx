import { SocketProvider } from "./SocketProvider"
import { WSApp } from "./WSApp"

export const WSInteractiveComponent = () => {
    return (
        <SocketProvider >
            <p>Hello from WSInteractiveComponent</p>
            <WSApp />
        </SocketProvider>
    )
}