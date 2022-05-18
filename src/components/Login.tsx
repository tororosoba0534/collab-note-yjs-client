import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auths/useAuth"

const Login = () => {
    const [name, setName] = useState("")

    // TODO:
    // 一時的に平文でpasswordを保持してしまう。
    // 扱い方を見直すべき。
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const {login} = useAuth()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        login(name, password).then(result => {
            console.log(`login result: ${result}`)
            if (result) {
                navigate("/")
            }
            setName("")
            setPassword("")
        })
        
    }


    return (
        <div>
            <p>Login rendered</p>
            <Link to="/register">to Register page</Link>
            <form onSubmit={ e => handleSubmit(e)}>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="user" 
                        value={name} 
                        onChange={e => setName(e.currentTarget.value)}
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={e => setPassword(e.currentTarget.value)} 
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Login