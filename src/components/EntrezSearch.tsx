import { useQuery } from "@tanstack/react-query"
import { getAvailableDatabases, searchEntrez } from "../api/entrez"
import Select from "react-select";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SequenceRecord } from "../lib/types";
import { SequenceRecordList } from "./SequenceRecordList";

export const EntrezSearch = () => {
    const [formInput, setFormInput] = useState(
        {searchTerm: '', databaseType: '', maxResults: 5}
    );
    const [results, setResults] = useState<SequenceRecord[]>([]);

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
            <SequenceRecordList records={results}/>
        </div>
    )
}