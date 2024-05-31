import { useContext, useState } from "react"
import { SequenceRecordsContext } from "../context/SequenceRecordsContext"
import Select from "react-select"
import { SequenceRecord } from "../lib/types"
import { Outlet } from "react-router-dom"
import SectionNavigation from "../components/SectionNavigation"
import Modal from "../components/Modal"
import SequenceRecordView from "../components/SequenceRecordView"
import { NavLinkInfo } from "../lib/propTypes"

function AnalyzePage(){
    const { savedRecords, setSavedRecords } = useContext(SequenceRecordsContext)
    const [ selectedRecord, setSelectedRecord ] = useState<SequenceRecord>({} as SequenceRecord)
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();

    let dropdownSelections = savedRecords.map((rec)=>{return {value: rec, label: rec.id}})
    console.log(selectedRecord)
    const sectionItems = [
        {title: 'Nucleotide Count', url: '/analyze/nucleotide-count', icon: null} as NavLinkInfo,
        {title: 'Sequence Functions', url: '/analyze/sequence-functions', icon: null} as NavLinkInfo,
    
    ]

    const handleResultClick = () => {
        let modal = <Modal 
            classes="bg-white px-2 flex flex-wrap h-3/4" 
            childClasses="max-h-[85vh] overflow-x-scroll m-10 max-w-[85vw]" 
            className="z-[0]" 
            setShowModal={setShowModal} 
            actionBar={""}>
                <SequenceRecordView record={selectedRecord}/>
            </Modal>;
        setModal(modal);
        setShowModal(true)
    }

    return (
        <div className="flex h-full">
            <SectionNavigation sections={sectionItems} />
            <div className="w-full">
                <div className="flex flex-row h-fit w-full">
                    <Select 
                        placeholder="Select Sequence" 
                        options={dropdownSelections} 
                        onChange={(val)=>setSelectedRecord(val.value)} values={[]} 
                        isDisabled={dropdownSelections.length == 0}
                    />

                    {<button disabled={!Object.keys(selectedRecord).length > 0} onClick={handleResultClick}>view selected</button>}

                </div>
                <Outlet context={[selectedRecord]} />
            </div>
            {showModal && modal}
        </div>
        
    )
}

export default AnalyzePage