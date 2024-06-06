import { useEffect, useState } from "react"
import api from '../api/interceptor'
import Table from "../components/Table"
import { MdDeleteForever } from "react-icons/md";

function SequencePage() {
    const [sequences, setSequences] = useState([])
    const [title, setTitle] = useState("")
    const [sequence, setSequence] = useState("")


    useEffect(()=>{
        getSequences()
    }, []);

    const getSequences = () => {
        api
            .get("/api/sequences/")
            .then((res) => res.data)
            .then((data) => {
                setSequences(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    }


    const deleteSequence = (id) => {
        api
            .delete(`/api/sequences/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Sequence deleted!");
                else alert("Failed to delete Sequence.");
                getSequences();
            })
            .catch((error) => alert(error));
    };

    const createSequence = (e) => {
        e.preventDefault();
        api
            .post("/api/sequences/", { "seq":sequence, "name":title, "description":"", dbxrefs:null, features: null, annotations: null, letter_annotations: null })
            .then((res) => {
                if (res.status === 201) alert("Sequence created!");
                else alert("Failed to make note.");
                getSequences();
            })
            .catch((err) => console.log(err.response.data));
    };

    const columns = [{name: 'id'},{name: 'description'}, {name:'seq'}, {name: "action", button: true, cell: (row) => 
        (
            <div>
            <button
              onClick={() => deleteSequence(row.id)}
            >  
              <MdDeleteForever className="text-red-500 w-5 h-5" />
            </button>
            </div>
    
          )
    }]

    return (
        <div>
            <div>
                <h2>Sequences</h2>
                <Table cols={columns} rows={sequences} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                    throw new Error("Function not implemented.")
                } } rowConditionals={undefined} title={""} fixedHeader={false} />
                {/* {sequences.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))} */}
            </div>
            <h2>Create a Note</h2>
            <form onSubmit={createSequence}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="sequence">Sequence:</label>
                <br />
                <textarea
                    id="sequence"
                    name="sequence"
                    required
                    value={sequence}
                    onChange={(e) => setSequence(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}

export default SequencePage