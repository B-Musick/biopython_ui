import { useEffect, useState } from "react";
import Sequence from "../Sequence"
import { useOutletContext } from "react-router-dom";
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaCheckSquare, FaCopy } from "react-icons/fa";
import ToggleButton from "../ToggleButton";
import { SequenceFunction } from "../../lib/enums";

function SequenceFunctions(){
    const [selectedRecord] = useOutletContext();
    const [transcribedSeq, setTranscribedSeq] = useState<string>('')
    const [complementSeq, setComplementSeq] = useState<string>('')

    const [shownSeq, setShownSeq] = useState('')
    const [copied, setCopied] = useState(false);
    const [strandFunction, setStrandFunction] = useState(SequenceFunction.Transcribe)

    const handleToggle = (buttonName:string) =>{
        console.log(buttonName)
        if(buttonName == 'transcribe') setStrandFunction(SequenceFunction.Transcribe)
        if(buttonName == 'complement') setStrandFunction(SequenceFunction.Complement)
    }

    let transcribe = () => {
        return selectedRecord.seq.split('').map((nuc)=> nuc == 'T' ? 'U': nuc).join('')
    }

    let complement = () => {
        let complements = {
            'A': 'T',
            'C': 'G',
            'T': 'A',
            'G': 'C'
        }
        return selectedRecord.seq.split('').reverse().map((nuc)=>complements[nuc]).join('')
    }

    useEffect(()=>{
        console.log('hi')

        if(Object.keys(selectedRecord).length > 0) {
            if(strandFunction == SequenceFunction.Transcribe) {
                setTranscribedSeq(transcribe())
                setShownSeq(transcribedSeq)
            } else if (strandFunction == SequenceFunction.Complement) {
                setComplementSeq(complement())
                setShownSeq(complementSeq)
            }
        }   
    }, [strandFunction])

    return (
        <div>
            <ToggleButton buttons={['transcribe', 'complement']} toggleFunction={handleToggle}/>
            <div
                className="relative bg-gray-100 py-5 px-2 dark:bg-gray-800 overflow-auto rounded-xl break-all m-4" 
            >
                <CopyToClipboard 
                    className="absolute right-1 top-2" 
                    text={shownSeq} 
                    onCopy={()=> setCopied(true)}
                >
                    <button>
                        {copied ? <FaCheckSquare /> : <FaCopy />}
                    </button>
                </CopyToClipboard>
                {shownSeq}
            </div>

            <Sequence sequence={shownSeq} className={'m-5'}/>
        </div>
    )
}

export default SequenceFunctions