import { useState } from "react"
import { fileUpload } from "../api/file"
import { SequenceRecordList } from "./SequenceRecordList"
import { FastaFile } from "../lib/types"
import Select from "react-select"

export const FileUpload = () => {

    const [results, setResults] = useState<FastaFile>()
    const [formInput, setFormInput] = useState(
        {fileType: '', file: null}
    );
    const fileTypeSelections = [
        { value: 'fasta', label: 'fasta' }, 
        { value: 'gb', label: 'genbank' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        let res = await fileUpload(formInput);
        setResults(res as FastaFile)
    }

    return (
        <div className="w-full h-full flex flex-col bg-slate-950">
            <form encType="multipart/form-data" className="flex flex-col items-center bg-purple-300 p-1" onSubmit={handleSubmit}>
                <div>
                <Select 
                    placeholder="File Type" 
                    options={fileTypeSelections} 
                    onChange={(val)=>setFormInput({...formInput, fileType: val.value})} 
                    values={[]} 
                />
                <input type="file" className="text-white bg-purple-300 rounded-xl p-1" onChange={(e)=>setFormInput({...formInput, file: e.target.files[0]})} name="genetic_file"/>

                </div>
                <button className="bg-blue-600 rounded-lg px-12">Parse</button>
            </form>
            {results && <SequenceRecordList records={results.records}/>}
        </div>
    )
}