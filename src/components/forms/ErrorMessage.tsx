import { VscErrorSmall } from "react-icons/vsc";

function ErrorMessage({message}) {
    return (
        <p role="alert" className="text-red-400 text-xs flex items-center">
            <VscErrorSmall className="!text-xl"/>
            {message}
        </p>
    )
}

export default ErrorMessage;