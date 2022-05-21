import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auths/useAuth"
import Loading from "./Loading"

const PersonalLayout = () => {

    return (
        <div className="personal">
            <div className="personal-menu">
                <div className="personal-menu-column">
                    <div className="personal-menu-icon">
                        Menu
                    </div>
                    <div className="personal-menu-contents">
                        <button >pseudo Logout</button>
                        <button >pseudo Account Setting</button>
                        <Link className="link" to="/test">return to TestLinks</Link>
                        <Link to="/personal/settings" >to Settings</Link>
                        <Link to="/personal/settings/delete-account">to DeleteAccount</Link>
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