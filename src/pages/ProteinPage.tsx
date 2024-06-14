import { useQuery } from "@tanstack/react-query";
import { createProtein, deleteProtein, getProteins } from "../api/protein";
import Table from "../components/Table";
import useDeleteMutation from "../hooks/useDeleteMutation";
import { MdDeleteForever } from "react-icons/md";
import { useForm } from "react-hook-form";
import { SwissProtRecord } from "../lib/types";
import { VscErrorSmall } from "react-icons/vsc";
import ErrorMessage from "../components/forms/ErrorMessage";
import useSaveMutation from "../hooks/useSaveMutation";

function ProteinPage(){
    const [deleteItem] = useDeleteMutation(deleteProtein, ()=>{}, 'proteins')
    const { watch, register, handleSubmit, formState: {errors}, getValues, setValue } = useForm();
    const [save, saveIcon] = useSaveMutation(createProtein, ()=>{}, 'proteins')

    const onSubmit = (data: SwissProtRecord) => {
        save(data)
    }

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
        <h2 className="text-white font-bold text-2xl p-2 text-center">Proteins</h2>
        <div className="w-5/6 bg-slate-700 rounded-xl">
            <Table classes="" theme="dark" cols={columns} rows={rows} hiddenCols={[]} sortable={[]} onRowClick={function (): {} {
                throw new Error("Function not implemented.")
            } } rowConditionals={undefined} title={""} fixedHeader={false} />
        </div>

        <div className="h-full w-full flex flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
                {/* Place a dropdown of existing motifs */}
                <div className="flex flex-col w-full">
                    <input 
                        {...register('entry_name', { required:true } )} 
                            aria-invalid={errors.entry_name ? "true" : "false"
                        }
                        placeholder="Protein Name" 
                        className={`rounded-lg pl-2 ${errors.entry_name ? 'border-2 border-rose-500': ''}`}
                    />
                    {errors.entry_name?.type === 'required' && <ErrorMessage message={"Protein sequence required"} />}
                </div>

                <div className="flex flex-col w-full">
                    <textarea {...register('sequence', { required:true, pattern: /^[ARNDCEQGHILKMFPSTWYV]+$/  })} 
                    aria-invalid={errors.sequence ? "true" : "false"} placeholder="Sequence" className="rounded-lg pl-2  mt-2 overflow-scroll p-1 w-auto" />
                    {errors.sequence?.type === 'required' && <ErrorMessage message="Sequence is required" />}
                    {errors.sequence?.type === 'pattern' && <ErrorMessage message="Should only include nucleotide" />}
                </div>

                <input type="submit" className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2"/>
            </form>
        </div>
    </div>
    )
}

export default ProteinPage;