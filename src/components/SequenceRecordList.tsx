import { useContext, useState } from "react";
import { SequenceRecord } from "../lib/types"
import Modal from "./Modal";
import SequenceRecordView from "./SequenceRecordView";
import { ListCard } from "./ListCard";
import { SequenceRecordsContext } from "../context/SequenceRecordsContext";

interface SequenceRecordListProps {
    records: SequenceRecord[]
}

export const SequenceRecordList: React.FC<SequenceRecordListProps> = ({records}) => {
    const { savedRecords, setSavedRecords } = useContext(SequenceRecordsContext)
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();
    
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
    
    let results = records.map((record)=>{
        let actionButtons = <div className="z-[1] hover:brightness-125">
            <button className="bg-purple-400 w-full rounded-lg" onClick={(e)=>{e.stopPropagation();setSavedRecords([...records, record])}}>Use</button>
        </div>

        return (
            <ListCard actionButtons={actionButtons} key={record.id|| record.biopython_id} item={record} handleClick={handleResultClick} title={record.description}>
                <div><span className="font-bold">id: </span>{record.id || record.biopython_id}</div>
                <div className="break-all"><span className="font-bold">seq: </span>{record.seq.slice(0,40)+' ...'}</div>
            </ListCard>
        )
    })

    return (
        <>
            <div className="flex flex-col h-screen overflow-scroll w-full items-center">
                {results}
            </div>
            {showModal && modal}
        </>
    )
}