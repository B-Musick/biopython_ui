import { useOutletContext } from "react-router-dom";
import ErrorMessage from "../forms/ErrorMessage";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Table from "../Table";

export default function ProteinMotif() {
    const { watch, register, handleSubmit, formState: {errors}, getValues, setValue } = useForm();

    const [selectedRecord, setSelectedRecord, selectedRows] = useOutletContext();
    const [matchLocations, setMatchLocations] = useState([])
    const [showMatchedLocations, setShowMatchedLocations] = useState(false)

    const onSubmit = (data) => {
        console.log(data)
        setSelectedRecord({})
        console.log(data.sequence)
        createMotifRegex(data.motif, data.sequence)
    }

    useEffect(()=>{
        setValue('sequence', selectedRecord.sequence)
    }, [selectedRecord])

    const createMotifRegex = (motif: string, sequence: string) =>{
        let allExceptBrace = /{[ARNDCEQGHILKMFPSTWYV]}/g
        let possibleProteins = "ARNDCEQGHILKMFPSTWYV"
        let matchedBraces = [...motif.matchAll(allExceptBrace)]
        matchedBraces.forEach(brace=>{
            let letter = brace[0][1]
            let proteinList = possibleProteins.replace(letter, '')
            // Negative lookahead assertion - https://stackoverflow.com/questions/29859968/how-to-match-all-alphabet-except-few
            motif = motif.replace(brace[0], `[${proteinList}]`)
        })

        let regex = new RegExp(motif, 'g');
        let matches = [...sequence.matchAll(regex)]
        let locations = []

        matches.forEach(match=>{
            locations.push(match.index+1)
        })
        if(!showMatchedLocations) setMatchLocations(locations)
        return locations
    }

    const columns = [{name: 'entry_name'},{name: 'sequence'}, {name: "action", button: true}]

    const analyzeSelectedProteins = () => {
        setShowMatchedLocations(true)
    }

    return (
        <div className="w-full flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
            {/* Place a dropdown of existing motifs */}
            <div className="flex flex-col w-full">
                <input 
                    {...register('motif', { required:true } )} 
                        aria-invalid={errors.motif ? "true" : "false"
                    }
                    placeholder="Motif" 
                    className={`rounded-lg pl-2 ${errors.motif ? 'border-2 border-rose-500': ''}`}
                />
                {errors.entry_name?.type === 'required' && <ErrorMessage message={"Protein sequence required"} />}
            </div>
            
            <div className="flex flex-col w-full">
                <textarea {...register('sequence', { required:true, pattern: /^[ARNDCEQGHILKMFPSTWYV]+$/  })}
                aria-invalid={errors.sequence ? "true" : "false"} placeholder="Sequence" className="rounded-lg pl-2  mt-2 overflow-scroll p-1 w-auto" />
                {errors.sequence?.type === 'required' && <ErrorMessage message="Sequence is required" />}
                {errors.sequence?.type === 'pattern' && <ErrorMessage message="Should only include nucleotide" />}
            </div>

            <input type="submit" className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2"/>
        </form>
        <div>{selectedRows.length > 0 && selectedRows[0].entry_name}</div>
        <Table 
            title="Selected Items"
            classes="w-[800px]" 
            theme="dark" 
            cols={columns} 
            rows={selectedRows} 
            // progressPending={isLoading} 
            // progressComponent={spinner}
            hiddenCols={[]} 
            sortable={[]} 
            onRowClick={function (): {} {
                throw new Error("Function not implemented.")
            }} 
            rowConditionals={undefined} 
            fixedHeader={false} 
            selectedRowAction={undefined}
        />
        <button className="w-full bg-green-300 py-2" onClick={analyzeSelectedProteins}>Analyze</button>

        {!showMatchedLocations && <div>{matchLocations.join(' ')}</div>}
        {showMatchedLocations && selectedRows.map((val)=>{
            return <div>
                <h1>{val.entry_name}</h1>
                <div>{createMotifRegex(getValues().motif, val.sequence).join(' ')}</div></div>
        })}
    </div>
    )
}