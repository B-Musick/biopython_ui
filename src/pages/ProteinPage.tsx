import { useQuery } from "@tanstack/react-query";
import { deleteProtein, getProteins } from "../api/protein";
import Table from "../components/Table";
import useDeleteMutation from "../hooks/useDeleteMutation";
import { MdDeleteForever } from "react-icons/md";

function ProteinPage(){
    const [deleteItem] = useDeleteMutation(deleteProtein, ()=>{}, 'proteins')

    const proteinsQuery = useQuery({
        queryKey: ["proteins"],
        queryFn: getProteins,
    })

    const columns = [{name:"id"},{name: 'entry_name'}, {name: 'sequence'}
        , {name: "action", button: true, cell: (row) => 
        (
            <div>
            <button
              onClick={() => deleteItem(row.id)}
            >  
              <MdDeleteForever className="text-red-500 w-5 h-5" />
            </button>
            </div>
    
          )
    }
]
    
    let rows = []

    if(proteinsQuery.status == 'loading') console.log('loading')
    if(proteinsQuery.status == 'error') console.log(proteinsQuery.error)
    else if(proteinsQuery.status == 'success'){
        rows = proteinsQuery.data
    }

    return (
        <div className={`flex flex-col items-center w-full z-[4]`}>
        <h2 className="text-white font-bold text-2xl p-2 text-center">Sequences</h2>
        <div className="w-5/6 bg-slate-700 rounded-xl">
            <Table classes="" theme="dark" cols={columns} rows={rows} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                throw new Error("Function not implemented.")
            } } rowConditionals={undefined} title={""} fixedHeader={false} />
        </div>
    </div>
    )
}

export default ProteinPage;