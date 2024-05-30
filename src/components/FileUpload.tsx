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
        <div className="w-full h-full flex flex-col">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <Select placeholder="File Type" options={fileTypeSelections} onChange={(val)=>setFormInput({...formInput, fileType: val.value})} values={[]} />

                <input type="file" onChange={(e)=>setFormInput({...formInput, file: e.target.files[0]})} name="genetic_file"/>

                <button>Parse</button>
            </form>
            {results && <SequenceRecordList records={results.records}/>}
        </div>
    )
}