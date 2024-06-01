import { useState } from "react";
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCheckSquare, FaCopy } from "react-icons/fa";

function ClipboardTextbox({text}){
    const [copied, setCopied] = useState(false);

    return (
        <div
        className="relative bg-gray-100 py-5 px-2 dark:bg-gray-800 overflow-auto rounded-xl break-all m-4" 
        >
            <CopyToClipboard 
                className="absolute right-1 top-2" 
                text={text} 
                onCopy={()=> setCopied(true)}
            >
                <button>
                    {copied ? <FaCheckSquare /> : <FaCopy />}
                </button>
            </CopyToClipboard>
            {text}
        </div>
    )
}

export default ClipboardTextbox