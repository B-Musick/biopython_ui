import { useState } from "react"
import { fileUpload } from "../api/file"
import { SequenceRecordList } from "./SequenceRecordList"
import { FastaFile } from "../lib/types"
import FileInput from "./FileInput"

export const FileUpload = () => {
    const [fileInput, setFileInput] = useState({})
    const [results, setResults] = useState<FastaFile>()

    const fileTypeSelections = [
        { value: 'fasta', label: 'fasta' }, 
        { value: 'gb', label: 'genbank' }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault()

        let res = await fileUpload(fileInput);
        setResults(res as FastaFile)
    }

    return (
        <div className="w-full h-full flex flex-col bg-slate-950">
            <form encType="multipart/form-data" className="flex flex-col items-center bg-purple-300 p-1" onSubmit={handleSubmit}>
                <FileInput fileTypeSelections={fileTypeSelections} handleUpload={setFileInput} />
            </form>
            {results && <SequenceRecordList records={results.records}/>}
        </div>
    )
}