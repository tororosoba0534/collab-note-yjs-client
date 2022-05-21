import { Link } from "react-router-dom"

const TestLinks = () => {
    return (<div>
        <Link to="/personal" >to Personal</Link>
        <Link to="/personal/settings" >to Settings</Link>
        <Link to="/personal/settings/delete-account" >to DeleteAccount</Link>
    </div>
        
    )
}

export default TestLinks