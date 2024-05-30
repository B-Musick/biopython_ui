import { useState } from "react";
import { SequenceRecord } from "../lib/types"
import Modal from "./Modal";
import SequenceRecordView from "./SequenceRecordView";

interface SequenceRecordListProps {
    records: SequenceRecord[]
}

export const SequenceRecordList: React.FC<SequenceRecordListProps> = ({records}) => {
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();
    
    let results = records.map((record)=>{
        return (
            <button onClick={()=>handleResultClick(record)} >
                <div className="m-1 rounded-lg border p-4 w-3/4">
                    <div>{record.name}</div>
                    <div>{record.id}</div>
                    <div>{record.description}</div>
                    <div>{record.seq.slice(0,40)+' ...'}</div>
                    <div>{record.dbxrefs}</div>
                </div>
            </button>
        )
    })

    const handleResultClick = (record: SequenceRecord) => {
        let modal = <Modal 
            classes="bg-white px-2 flex flex-wrap h-3/4" 
            childClasses="max-h-[85vh] overflow-x-scroll m-10 max-w-[85vw]" 
            className="z-[0]" 
            setShowModal={setShowModal} 
            actionBar={""}>
                <SequenceRecordView record={record}/>
            </Modal>;
        setModal(modal);
        setShowModal(true)
    }

    return (
        <>
            <div className="flex flex-col h-screen overflow-scroll w-full items-center">
                {results}
            </div>
            {showModal && modal}
        </>
    )
}