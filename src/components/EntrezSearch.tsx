import { useQuery } from "@tanstack/react-query"
import { getAvailableDatabases, searchEntrez } from "../api/entrez"
import Select from "react-select";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal";
import { SequenceRecord } from "../lib/types";
import SequenceRecordView from "./SequenceRecordView";


export const EntrezSearch = () => {
    const [showModal, setShowModal] = useState(false);
    const [modal, setModal] = useState();

    let actionBar = <div><button>action button</button></div>
    const [formInput, setFormInput] = useState(
        {searchTerm: '', databaseType: '', maxResults: 5});
    const [results, setResults] = useState<SequenceRecord[]>([]);
    let outputResults

    let databases;
    let maxResultValues = [
        {value: 5, label: '5'},
        {value: 10, label: '10'},
        {value: 15, label: '15'}
    ]

    const entrezDatabaseListQuery = useQuery({
        queryKey: ["entrez"],
        queryFn: getAvailableDatabases,
    })

    if(entrezDatabaseListQuery.isSuccess){
        databases = entrezDatabaseListQuery.data.map((data,index)=>{
            return { value: data, label: data }
        })
    }

    const handleFormChange = (e) => {
        setFormInput(val => { return {...val, [e.target.name]: e.target.value}})
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        let res = await searchEntrez(formInput);
        setResults(res as SequenceRecord[])
    }
    
    const handleResultClick = (record: SequenceRecord) => {
        console.log('here')
        let modal = <Modal 
        classes="bg-white px-2 flex flex-wrap h-3/4" 
        childClasses="max-h-[85vh] overflow-x-scroll m-10 max-w-[85vw]" 
        className="z-[0]" 
        setShowModal={setShowModal} 
        actionBar={actionBar}>
            <SequenceRecordView record={record}/>
        </Modal>;
        setModal(modal);
        setShowModal(true)
        
    }
    outputResults = results.map((record)=>{
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


    return (
        <div className="w-full h-full">
            <form onSubmit={handleSearch} className="h-1/4 bg-blue-300">
                <div className="h-full flex flex-wrap w-full justify-evenly items-center">
                    <Select placeholder="Select Database" options={databases} onChange={(val)=>setFormInput({...formInput, databaseType: val.value})} values={[]} />
                    <div className="w-1/2 flex">
                        <input className="border w-3/4 h-[37px]" name="searchTerm" value={formInput.searchTerm} onChange={handleFormChange} type="text"/>
                        <button className="bg-blue-500 h-full px-2 py-1 h-[37px]"><FaSearch className="w-full h-3/4" /></button>
                    </div>
                    
                    <Select placeholder="Max Results" options={maxResultValues} onChange={(val)=>setFormInput({...formInput, maxResults: val.value})} values={[]} />
                </div>
            </form> 
            <div className="flex flex-col h-full overflow-scroll w-full items-center">
            
                {outputResults}

            </div>
            {/* {results} */}
            {showModal && modal}
        </div>
    )
}