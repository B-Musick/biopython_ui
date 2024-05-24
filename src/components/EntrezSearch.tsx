import { useQuery } from "@tanstack/react-query"
import { getAvailableDatabases, searchEntrez } from "../api/entrez"
import Select from "react-select";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const EntrezSearch = () => {
    const [formInput, setFormInput] = useState(
        {searchTerm: '', databaseType: '', maxResults: 5});
    const [results, setResults] = useState([]);
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
        setFormInput(val => { return {...val, [e.target.name]: e.target.value} as GameInfo})
    }

    const handleSearch = async (e) => {
        e.preventDefault()
        let res = await searchEntrez(formInput);
        // let mappedResults = 
        setResults(res)

        // console.log(results)
    }
    
    outputResults = results.map((record)=>{
        let annotations = JSON.parse(JSON.stringify(record.annotations));
        // console.log(JSON.parse(annotations))
        return <div className="m-1 rounded-lg border p-4 w-3/4">
                <div>{record.name}</div>
                <div>{record.id}</div>
                <div>{record.description}</div>
                <div>{record.seq.slice(0,40)+' ...'}</div>
                <div>{record.dbxrefs}</div>
                {/* <div>{JSON.parse(annotations)['molecule_type']}</div> */}
                {/* <div>{record.letter_annotations}</div> */}
            </div>
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
        </div>
    )
}