import { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { createProtein, uniprot } from "../../api/protein";
import useSaveMutation from "../../hooks/useSaveMutation";

function UniprotSearch(){
    const [inputFields, setInputFields] = useState([{entry_name: ''}])
    const [results, setResults] = useState([])
    const [save, saveIcon] = useSaveMutation(createProtein, ()=>{}, 'proteins')

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let accessionNumbers = inputFields.map((field)=>{
            return field.entry_name
        })
        let accessions = {"accessions":accessionNumbers.join(',')}

        let res = await uniprot(accessions)
        setResults(res as SwissProtRecord[])
    }

    /**
     * @todo - show returned SwissProt objects in list
     * - Allow user to save it to their protein list to use later
     */
    let recordList = results.map((result)=>{
        return (
            <div>
                <h2>{result.entry_name}</h2>
                <button onClick={()=>save(result)}>{saveIcon}</button>
            </div>
        )
    })
    return (
        <div className="h-full w-full flex flex-col items-center">
            <form onSubmit={handleSubmit} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
                {fields}
                <button onClick={addFields} className="flex self-start border items-center px-1 bg-gray-200 rounded mt-1"><FaRegSquarePlus />Add Accession</button>
                <button className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2">Submit</button>
            </form>

            <div>
                {recordList}
            </div>
        </div>
    )
}

export default UniprotSearch;