import { InvalidatedProjectKind } from "typescript"
import config from "../config"

export const register = async (username: string, password: string) => {
    const result: boolean = await fetch(config.server.ORIGIN + "/register", {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (typeof data.registerStatus !== "boolean") {
            console.log("response data type Invalid.")
            return false
        }
        if (data.registerStatus) {
            console.log("registering accounts succeeded.")
            return true
        }

        console.log("registering account failed.")
        return false
    })
    return result
}

export const checkUsername = async (username: string) => {
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
}