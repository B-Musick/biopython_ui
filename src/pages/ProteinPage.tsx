import { useQuery } from "@tanstack/react-query";
import { deleteProtein, getProteins } from "../api/protein";
import Table from "../components/Table";
import useDeleteMutation from "../hooks/useDeleteMutation";
import { MdDeleteForever, MdUpload } from "react-icons/md";
import SectionNavigation from "../components/SectionNavigation";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function ProteinPage(){
    const [deleteItem] = useDeleteMutation(deleteProtein, ()=>{}, 'proteins')
    const [selectedRecord, setSelectedRecord] = useState({})
    const [selectedRows, setSelectedRows] = useState([])

    const sectionItems = [
        {title: 'Add Protein', url: '/protein/add', icon: null} as NavLinkInfo,
        {title: 'Motif', url: '/protein/motif', icon: null} as NavLinkInfo,
    ]

    const proteinsQuery = useQuery({
        queryKey: ["proteins"],
        queryFn: getProteins,
    })

    const columns = [{name:"id"},{name: 'entry_name'}, {name: 'sequence'}
        , {name: "action", button: true, cell: (row) => 
        (
            <div>
                <button onClick={()=>setSelectedRecord(row)}><MdUpload className="text-green-500 w-5 h-5"/></button>
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
        <div className={`flex w-full z-[4]`}>
            <SectionNavigation sections={sectionItems} />
            <div className="w-full flex flex-col items-center">
                <Outlet context={[selectedRecord, setSelectedRecord, selectedRows]}/>
                <h2 className="text-white font-bold text-2xl p-2 text-center">Proteins</h2>
                
                <div className="w-5/6 bg-slate-700 rounded-xl">
                    <Table classes="" theme="dark" cols={columns} rows={rows} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                        throw new Error("Function not implemented.")
                    } } rowConditionals={undefined} title={""} fixedHeader={false}
                    selectedRowAction={setSelectedRows} />
                </div>
            </div>
    </div>
    )
}

export default ProteinPage;