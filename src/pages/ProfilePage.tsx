import { useEffect } from "react"
import AuthForm from "../components/AuthForm"
import DNAAnimation from "../components/DNAAnimation";
import SequenceTable from "../components/SequenceTable";

function Login() {
    useEffect(()=>{
        window.dispatchEvent(new Event("storage"));
    },[])

    return (
        <div className="fixed h-full w-full bg-slate-950 flex flex-col items-center justify-start">
            <AuthForm className={"mt-24"} route="/api/token/" method="profile"/>
            <SequenceTable className={"pt-24"} />
            <div className="fixed h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
        </div>
        
    )
}

export default Login