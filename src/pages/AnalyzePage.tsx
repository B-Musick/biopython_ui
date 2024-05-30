import { useContext, useState } from "react"
import { SequenceRecordsContext } from "../context/SequenceRecordsContext"
import Select from "react-select"
import { SequenceRecord } from "../lib/types"

function AnalyzePage(){
    const { savedRecords, setSavedRecords } = useContext(SequenceRecordsContext)
    const [ selectedRecord, setSelectedRecord ] = useState<SequenceRecord>({} as SequenceRecord)
    let dropdownSelections = savedRecords.map((rec)=>{return {value: rec, label: rec.description}})
    
    return (
        <>
            <div>Analyze</div>
            
            <Select 
                placeholder="Select Sequence" 
                options={dropdownSelections} 
                onChange={(val)=>setSelectedRecord(val.value)} values={[]} 
                isDisabled={dropdownSelections.length == 0}
            />

            {selectedRecord && <div>{selectedRecord.id}</div>}
        </>
    )
}

export default AnalyzePage