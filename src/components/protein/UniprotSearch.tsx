import { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { createProtein, uniprot } from "../../api/protein";
import useSaveMutation from "../../hooks/useSaveMutation";
import { useQuery } from "@tanstack/react-query";
import Table from "../Table";
import { useOutletContext } from "react-router-dom";

function UniprotSearch(){
    const [inputFields, setInputFields] = useState([{entry_name: ''}])
    const [results, setResults] = useState([])
    const [save, saveIcon] = useSaveMutation(createProtein, ()=>{}, 'proteins')
    const [loading, setLoading] = useState("");
    const [accessions, setAccessions] = useState({})

    const [selectedRecord, setSelectedRecord, selectedRows] = useOutletContext();

    let fields = inputFields.map((input, index)=>{
        return <div key={index} className="flex w-full justify-between">
            <input 
                    className="rounded-lg pl-2 mt-1 w-[90%]"
                    value={input.entry_name}
                    name="entry_name"
                    placeholder="Accession Number"

                    onChange={event => handleFormChange(event, index)}
            />
            <button className="text-red-100" onClick={(event)=>removeField(event, index)}>x</button>
            </div>
    });

    const removeField = (e, index) => {
        e.preventDefault()
        inputFields.splice(index, 1)

        setInputFields([...inputFields])
    }
    
    const handleFormChange = (e, index) => {
        let data = [...inputFields]
        data[index][e.target.name] = e.target.value;
        setInputFields(data)
    }

    const addFields = (e) => {
        e.preventDefault()
        let newfield = { entry_name: '' }

        setInputFields([...inputFields, newfield])
    }

    const {isFetching, isError, isSuccess, isLoading, data} = useQuery({
        queryKey: ["uniprot", accessions],
        queryFn: uniprot,
        enabled: Object.keys(accessions).length > 0
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let accessionNumbers = inputFields.map((field)=>{
            return field.entry_name
        })
        setAccessions({"accessions":accessionNumbers.join(',')})
    }

    let spinner = (<div role="status" className="w-[80%] py-10 rounded flex justify-center items-center">
        <svg aria-hidden="true" className="w-[80%] h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>)
    
    const columns = [{name: 'entry_name'},{name: 'sequence'}, {name: "action", button: true, cell: (row) => 
        (
            <div>
              <button onClick={()=>save(row)}>{saveIcon}</button>
            </div>
    
          )
    }]
    
    // let rows = []

    const saveAll = () => {
        data.forEach(row=>save(row))
    }

    let recordList = 
        <Table 
            title="Sequences"
            classes="w-[800px]" 
            theme="dark" 
            cols={columns} 
            rows={data} 
            progressPending={isLoading} 
            progressComponent={spinner}
            hiddenCols={[]} 
            sortable={[]} 
            onRowClick={function (): {} {
                throw new Error("Function not implemented.")
            } } rowConditionals={undefined} fixedHeader={false} selectedRowAction={undefined}/>

    return (
        <div className="h-full w-full flex flex-col items-center">
            <form onSubmit={handleSubmit} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
                {fields}
                <button onClick={addFields} className="flex self-start border items-center px-1 bg-gray-200 rounded mt-1"><FaRegSquarePlus />Add Accession</button>
                <button className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2">Submit</button>
            
            </form>

            <div className="w-[80%]">
                {recordList}
                <button onClick={saveAll} className="w-full bg-green-300 py-4 flex justify-center items-center">{saveIcon} <span className="pl-1">Save All</span></button>
            </div>
        </div>
    )
}

export default UniprotSearch;