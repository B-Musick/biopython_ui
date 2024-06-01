import { useEffect, useState } from "react";
import { startCodon } from "../../lib/constants";
import { useOutletContext } from "react-router-dom";
import { transcribe } from "../../lib/helpers";
import { codonTable, inverseCodonTable } from "../../lib/constants";
import ClipboardTextbox from "../ClipboardTextbox";
import { Tooltip } from 'react-tooltip'

function Translate(){
    const [selectedRecord] = useOutletContext();
    const [transcribedSeq, setTranscribedSeq] = useState<string>('')
    const [translatedSeq, setTranslatedSeq] = useState<Array<string>>([]);

    const findStartCodon = (codon) => codon == startCodon

    const findEndCodon = (codon) => codonTable[codon] == "Stop"

    const translationInSequenceRecord = () => {
        return selectedRecord.features[2].qualifiers.translation
    }

    const translate = (sequence) => {
        let index = 0;
        let indexIncrement = 1;
        let proteins = []
        let protein = ''
        let proteinStarted = false;

        while(index < sequence.length){
            let codon = sequence.substring(index, index+3)
            
            if(findStartCodon(codon)) {
                proteinStarted = true;
                indexIncrement = 3
            }

            if(findEndCodon(codon) && proteinStarted) {
                proteins.push(protein)
                protein = ''
                indexIncrement = 1
                proteinStarted = false;
            }
            if(proteinStarted) protein+=codonTable[codon]

            index+=indexIncrement
        }

        return proteins
    }

    useEffect(()=>{
        if(Object.keys(selectedRecord).length > 0){
            setTranscribedSeq(transcribe(selectedRecord.seq))
        }
    }, [selectedRecord])

    useEffect(()=>{
        if(transcribedSeq && !translationInSequenceRecord()){
            setTranslatedSeq([...translate(transcribedSeq)])
        }else if('features' in selectedRecord){
            setTranslatedSeq([...selectedRecord.features[2].qualifiers.translation])
        }
    }, [transcribedSeq])
    
    let proteinAminoAcids = translatedSeq.map((protein)=>{
        return protein.split('').map((aa, idx)=>{
            return (
                <a data-tooltip-id="my-tooltip" data-tooltip-content={`${inverseCodonTable[aa].full}`}>
                    <div className={`${inverseCodonTable[aa].color} p-2 rounded-full bg-red-200 w-[40px] text-center mb-2`}>
                        {inverseCodonTable[aa].short}

                        {idx == 0 &&
                            <>
                                <Tooltip id="my-tooltip" />
                            </>
                        }
                    </div>
                </a>
            )
        })
    })

    return (
        <div>
            <ClipboardTextbox text={translatedSeq}/>
            <div className="flex flex-wrap m-5">
                {proteinAminoAcids}
            </div>
        </div>
        
    )
}

export default Translate;