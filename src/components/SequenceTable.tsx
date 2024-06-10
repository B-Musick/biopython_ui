import { useQuery } from "@tanstack/react-query"
import Table from "./Table"
import { deleteSequence, getSequences } from "../api/sequences"
import { MdDeleteForever } from "react-icons/md"
import useSaveMutation from "../hooks/useSaveMutation"

function SequenceTable({className}){
    const [deleteItem] = useSaveMutation(deleteSequence, ()=>{}, 'sequences')

    const sequencesQuery = useQuery({
        queryKey: ["sequences"],
        queryFn: getSequences,
    })
    
    const columns = [{name: 'id'},{name: 'name'}, {name: 'description'}, {name:'seq'}, {name: "action", button: true, cell: (row) => 
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
        <div className={`flex flex-col items-center w-full z-[4] ${className}`}>
            <h2 className="text-white font-bold text-2xl p-2 text-center">Sequences</h2>
            <div className="w-5/6 bg-slate-700 rounded-xl">
                <Table classes="" theme="dark" cols={columns} rows={rows} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                    throw new Error("Function not implemented.")
                } } rowConditionals={undefined} title={""} fixedHeader={false} />
            </div>
        </div>
    )
}

export default SequenceTable;