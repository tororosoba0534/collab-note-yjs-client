import { useState } from "react"
import config from "../config"

export const useCheckUsername = () => {
    const [isValidMessage, setIsValidMessage] = useState("")

    const checkUsername = async (username: string) => {
        setIsValidMessage("")
        const result: boolean = await fetch(config.server.ORIGIN + "/check-username", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data.isValidName !== "boolean") {
                console.log("response data type invalid.")
                    
                    return false
            }
    
            if (data.isValidName) {
                return true
            }
            return false
        })

        if (result) {
            setIsValidMessage("Valid username. You can use it.")
        } else {
            setIsValidMessage("The same username is already used. You should change it.")
        }


        return result
    }
    return {
        checkUsername,
        isValidMessage
    }
}