import AuthForm from "../components/AuthForm"
import DNAAnimation from "../components/DNAAnimation"
import SequenceTable from "../components/SequenceTable"

function Register() {
    return (
        <div className="fixed h-full w-full bg-slate-950 flex flex-col items-center justify-center">
            <AuthForm route="/api/user/register/" method="register"/>
            
            <div className="fixed z-[0] h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
        </div>
    )
}

export default Register