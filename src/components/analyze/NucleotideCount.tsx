import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function NucleotideCount() {
    const [selectedRecord] = useOutletContext();
    const [nucleotideCounts, setNucleotideCounts] = useState({
        'A': 0, 'C':0, 'T':0, 'G':0
    })

    useEffect(()=>{
        if(Object.keys(selectedRecord).length > 0){
            let nucleotides = {
                A: 0, C:0, T:0, G:0
            }
            selectedRecord.seq.split('').forEach((letter)=>{
                nucleotides = {...nucleotides, [letter]: nucleotides[letter]+1 }
            })
            setNucleotideCounts(nucleotides)
        }
    }, [selectedRecord])

    return (
        <div>{nucleotideCounts['A']}</div>
    )
}

export default NucleotideCount