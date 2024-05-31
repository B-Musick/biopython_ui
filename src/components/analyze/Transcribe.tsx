import { useEffect, useState } from "react";
import Sequence from "../Sequence"
import { useOutletContext } from "react-router-dom";
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCheckSquare, FaCopy } from "react-icons/fa";

function Transcribe(){
    const [selectedRecord] = useOutletContext();
    const [transcribedSeq, setTranscribedSeq] = useState<string>('')
    const [copied, setCopied] = useState(false);

    useEffect(()=>{
        if(Object.keys(selectedRecord).length > 0) {
            setTranscribedSeq(selectedRecord.seq.split('').map((nuc)=> nuc == 'T' ? 'U': nuc).join(''))
        }   
    }, [selectedRecord])

    return (
        <div>
            <div
                className="relative bg-gray-100 py-5 px-2 dark:bg-gray-800 overflow-auto rounded-xl break-all m-4" 
            >
                <CopyToClipboard 
                    className="absolute right-1 top-2" 
                    text={transcribedSeq} 
                    onCopy={()=> setCopied(true)}
                >
                    <button>
                        {copied ? <FaCheckSquare /> : <FaCopy />}
                    </button>
                </CopyToClipboard>
                {transcribedSeq}
            </div>

            <Sequence sequence={transcribedSeq} className={'m-5'}/>
        </div>
    )
}

export default Transcribe