import {  useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";



export const useAuth = () => {
    const username = useRef<string | null>(null)

    const [status, setStatus] = useState<"loading" | "ok" | "failed">("loading")

    const navigate = useNavigate()

    const checkAuth = useCallback( async () => {
        username.current = null
        setStatus("loading")
        const result: boolean = await fetch(config.server.ORIGIN + "/check-auth", {
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            if (typeof data?.username !== "string" || typeof data?.authed !== "boolean") {
                console.log("response data type invalid.")
                
                return false
            }

            if (data?.authed) {
                username.current = data?.username
                return true
            }

            return false
        })

        setStatus(() => result ? "ok" : "failed")
        return result
    }, [])

    const login = useCallback( async (u: string, p: string) => {
        username.current = null
        setStatus("loading")
        const result: boolean = await fetch(config.server.ORIGIN + "/login", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: u,
                password: p
            }),
        })
        .then(res => res.json())
        .then(data => {
            if (typeof data?.username !== "string" || typeof data?.authed !== "boolean") {
                console.log("response type invalid.")
                return false
            }
            if (data?.username === u && data?.authed === true) {
                console.log("authentication succeeded!")

                username.current = u
                return true
            }

            console.log("username or password wrong")
            return false
        })
        return result
    }, [])

    const logout = useCallback(async () => {
        const result = await fetch(config.server.ORIGIN + "/logout", {
            credentials: "include"
        })
        .then(response => {
            if (response.ok) {
                return true
            }

            return false
        })

        if (result) navigate("/login")
    }, [navigate])

    return {
        status,
        username,
        checkAuth,
        login,
        logout
    }
}