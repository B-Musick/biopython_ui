import { useState } from "react";
import Select from "react-select";

interface IFileInputProps {
    fileTypeSelections: Array<IFileTypeSelection>,
    handleUpload: any
}

interface IFileTypeSelection {
    value: string,
    label: string
}

const FileInput: React.FC<IFileInputProps> = ({fileTypeSelections, handleUpload}) => {
    const [formInput, setFormInput] = useState({ fileType: '', file: null });

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleUpload(formInput)
    }

    return (
        <>
            <div>
                <Select
                    placeholder="File Type"
                    options={fileTypeSelections}
                    onChange={(val: IFileTypeSelection) => setFormInput({ ...formInput, fileType: val.value })}
                    values={[]}
                />
                <input 
                    type="file" className="text-white bg-purple-300 rounded-xl p-1" 
                    onChange={(e) => setFormInput({ ...formInput, file: e.target.files[0] })} 
                    name="genetic_file" 
                />

            </div>
            <button className="bg-blue-600 rounded-lg px-12" onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default FileInput;