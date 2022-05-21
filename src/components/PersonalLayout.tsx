import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auths/useAuth"
import Loading from "./Loading"

const PersonalLayout = () => {

    const {logout} = useAuth()

    return (
        <div className="personal">
            <div className="personal-menu">
                <div className="personal-menu-column">
                    <div className="personal-menu-icon">
                        Menu
                    </div>
                    <div className="personal-menu-contents">
                        
                        <Link to="/personal/settings" >Settings</Link>

                        <Link to="/personal">Editor</Link>
                        <button onClick={() => logout()}>Logout</button>
                    </div>
                </div>
                
            </div>
            <div className="personal-body">
                <Outlet />
            </div>
        </div>
    )

}

export default PersonalLayout