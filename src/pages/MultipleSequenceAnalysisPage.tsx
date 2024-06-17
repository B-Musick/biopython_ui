import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { SequenceRecordsContext } from "../context/SequenceRecordsContext";
import Table from "../components/Table";
import { SequenceRecord } from "../lib/types";
import Sequence from "../components/Sequence";

function MultipleSequenceAnalysisPage() {
    const { savedRecords, setSavedRecords } = useContext(SequenceRecordsContext)
    const [selectedRecords, setSelectedRecords] = useState([]);
    
    const seqRecordColumns = [
        {name:"id", maxWidth: '170px'}, 
        {name: "name",maxWidth: '170px' }, 
        {name:"description", wrap: true}, 
        {name:"seq", selector: row => row.seq, wrap: false, cell: (row)=><div>{row.seq.substring(0,80)+"..."}</div>}
    ]

    return <>
        { savedRecords.length > 0 && 
            <Table cols={seqRecordColumns} rows={savedRecords} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                throw new Error("Function not implemented.");
        } } rowConditionals={undefined} title={""} fixedHeader={false} />}
        
        <Outlet context={[selectedRecords]} />
    </>
}

export default MultipleSequenceAnalysisPage;