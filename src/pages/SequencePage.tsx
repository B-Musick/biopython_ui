import { useState } from "react"
import { SequenceRecord } from "../lib/types";
import { createSequence, getSequences } from "../api/sequences";
import useSaveMutation from "../hooks/useSaveMutation";
import { useQuery } from "@tanstack/react-query";
import SequenceTable from "../components/SequenceTable";
import DNAAnimation from "../components/DNAAnimation";

function SequencePage() {
    const [formData, setFormData] = useState<SequenceRecord>({"seq":"", "name":"", "description":"", dbxrefs:null, features: null, annotations: null, letter_annotations: null} as SequenceRecord)
    const [save, saveIcon] = useSaveMutation(createSequence, ()=>{}, 'sequences')

    const handleFormChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        save(formData)
    }

    return (
        <div className="flex flex-col items-center bg-slate-950 h-full">
            <div className="fixed z-[0] h-full w-1/2 right-0">
                <DNAAnimation />
            </div>
            <form onSubmit={handleFormSubmit} className="mt-2 z-[2] flex flex-col w-1/2 h-fit rounded-xl p-4 bg-gray-200 items-center bg-slate-800">
                <h2 className="text-xl text-white border-b w-full mb-2 text-center">Add a Sequence</h2>
                
                <div className="flex justify-between w-full my-1">
                    <label htmlFor="name" className="text-white">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        onChange={handleFormChange}
                        value={formData.name}
                        className="w-3/4"
                    />
                </div>

                <div className="flex justify-between w-full my-1">
                    <label htmlFor="description" className="text-white">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        required
                        onChange={handleFormChange}
                        value={formData.description}
                        className="w-3/4"
                    />
                </div>

                <div className="flex justify-between w-full my-1">
                    <label htmlFor="seq" className="text-white">Sequence:</label>
                    <textarea
                        id="seq"
                        name="seq"
                        required
                        value={formData.seq}
                        onChange={handleFormChange}
                        className="w-3/4"
                    ></textarea>
                </div>
                <input className={"form-button bg-purple-300 rounded w-3/4 m-1"} type="submit" value="Submit"></input>
            </form>

            <SequenceTable className={"mt-24"}/>
        </div>
    )
}

export default SequencePage