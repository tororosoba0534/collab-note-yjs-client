import {  useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { UserContext } from "./userProvider";

const SESSION_ID_KEY = "sessionID"


export const useAuth = () => {
    const {setUsername} = useContext(UserContext)

    const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading")

    const navigate = useNavigate()

    const checkAuth = useCallback( async () => {
        const sessionID = localStorage.getItem(SESSION_ID_KEY)
        if (!sessionID) {
            console.log("sessionID does NOT exist in localStorage.")
            setStatus("failed")
            return false
        }

        setUsername("")
        setStatus("loading")
        const result: boolean = await fetch(config.server.ORIGIN + "/check-auth", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionID
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            if (typeof data?.username !== "string" || typeof data?.authed !== "boolean") {
                console.log("response data type invalid.")
                
                return false
            }

            if (data?.authed) {
                setUsername(data?.username)
                return true
            }

            return false
        })

        setStatus(() => result ? "ok" : "failed")
        return result
    }, [setUsername])

    const login = useCallback( async (username: string, password: string) => {
        setStatus("loading")
        const result: boolean = await fetch(config.server.ORIGIN + "/login", {
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
        .then(res => res.json())
        .then(data => {
            if (typeof data?.sessionID !== "string" || typeof data?.authed !== "boolean") {
                console.log("response type invalid.")
                return false
            }
            if (data?.sessionID && data?.authed === true) {
                console.log("login succeeded!")
                localStorage.setItem(SESSION_ID_KEY, data.sessionID)
                
                return true
            }

            console.log("username or password wrong")
            return false
        })
        return result
    }, [])

    const logout = useCallback(async () => {
        setUsername("")
        const sessionID = localStorage.getItem(SESSION_ID_KEY)
        const result = await fetch(config.server.ORIGIN + "/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                sessionID
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data?.logoutStatus !== "boolean") {
                console.log("response datatype invalid")
                return false
            }
            if (data.logoutStatus) {
                console.log("logout succeeded.")
                return true
            }
            console.log("logout failed.")
            return false
        })

        if (result) navigate("/login")
    }, [navigate, setUsername])

    return {
        status,
        checkAuth,
        login,
        logout
    }
}