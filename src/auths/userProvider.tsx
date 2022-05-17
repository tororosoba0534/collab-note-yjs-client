import { createContext, useRef, useState } from "react";

type User = {
    username: string
    setUsername: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<User>(null!)

const UserProvider = ({children}: any) => {
    // const username = useRef<string>("")
    const [username, setUsername] = useState<string>("")

    return <UserContext.Provider value={{username, setUsername}} >{children}</UserContext.Provider>
}

export default UserProvider