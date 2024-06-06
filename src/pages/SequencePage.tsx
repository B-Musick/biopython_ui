import { useEffect, useState } from "react"
import api from '../api/interceptor'
import Table from "../components/Table"
import { MdDeleteForever } from "react-icons/md";
import { SequenceRecord } from "../lib/types";
import { createSequence, getSequences, deleteSequence } from "../api/sequences";
import useSaveMutation from "../hooks/useSaveMutation";
import { useQuery } from "@tanstack/react-query";

function SequencePage() {
    const [sequences, setSequences] = useState([])
    const [formData, setFormData] = useState<SequenceRecord>({"seq":"", "name":"", "description":"", dbxrefs:null, features: null, annotations: null, letter_annotations: null} as SequenceRecord)
    const [save, saveIcon] = useSaveMutation(createSequence, ()=>{}, 'sequences')
    const [deleteItem] = useSaveMutation(deleteSequence, ()=>{}, 'sequences')

    const sequencesQuery = useQuery({
        queryKey: ["sequences"],
        queryFn: getSequences,
    })

    const handleFormChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        save(formData)
    }

    const columns = [{name: 'id'},{name: 'description'}, {name:'seq'}, {name: "action", button: true, cell: (row) => 
        (
            <div>
            <button
              onClick={() => deleteItem(row.id)}
            >  
              <MdDeleteForever className="text-red-500 w-5 h-5" />
            </button>
            </div>
    
          )
    }]

    let rows = []

    if(sequencesQuery.status == 'loading') console.log('loading')
    if(sequencesQuery.status == 'error') console.log(sequencesQuery.error)
    else if(sequencesQuery.status == 'success'){

        rows = sequencesQuery.data
    }

    return (
        <div>
            <div>
                <h2>Sequences</h2>
                <Table cols={columns} rows={rows} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                    throw new Error("Function not implemented.")
                } } rowConditionals={undefined} title={""} fixedHeader={false} />
                {/* {sequences.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))} */}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="name">Title:</label>
                <br />
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    onChange={handleFormChange}
                    value={formData.name}
                />

                <label htmlFor="description">Title:</label>
                <br />
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    onChange={handleFormChange}
                    value={formData.description}
                />

                <label htmlFor="seq">Sequence:</label>
                <br />
                <textarea
                    id="seq"
                    name="seq"
                    required
                    value={formData.seq}
                    onChange={handleFormChange}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SequencePage