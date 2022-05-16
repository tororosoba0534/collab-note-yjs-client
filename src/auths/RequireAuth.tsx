import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import Loading from "../components/Loading"
import { useAuth } from "./useAuth"

const RequireAuth = ({children}: {children: JSX.Element}) => {

    console.log("RequireAuth rendered")

    const {status, checkAuth} = useAuth()

    useEffect(() => {
        checkAuth()

    }, [checkAuth, ])

    if (status === "loading") return <Loading />

    if (status === "ok") return children

    return <Navigate to="/login" replace />

    
}

export default RequireAuth