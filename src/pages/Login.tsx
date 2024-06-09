import { useEffect } from "react"
import AuthForm from "../components/AuthForm"
import DNAAnimation from "../components/DNAAnimation";

function Login() {
    useEffect(()=>{
        window.dispatchEvent(new Event("storage"));
    },[])

    return (
        <div className="fixed h-full w-full bg-slate-950 flex flex-col items-center justify-center">
            <AuthForm route="/api/token/" method="login"/>
        
            <div className="fixed z-[0] h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
        </div>
    )
}

export default Login