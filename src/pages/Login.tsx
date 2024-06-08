import { useEffect } from "react"
import AuthForm from "../components/AuthForm"

function Login() {
    useEffect(()=>{
        window.dispatchEvent(new Event("storage"));
    },[])

    return (
        <AuthForm route="/api/token/" method="login"/>
    )
}

export default Login