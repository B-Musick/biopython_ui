import { SwissProtRecord } from "../../lib/types";
import ErrorMessage from "./ErrorMessage";
import useSaveMutation from "../../hooks/useSaveMutation";
import { createProtein } from "../../api/protein";
import { useForm } from "react-hook-form";

function AddProtein(){
    const { watch, register, handleSubmit, formState: {errors}, getValues, setValue } = useForm();
    const [save, saveIcon] = useSaveMutation(createProtein, ()=>{}, 'proteins')
    
    const onSubmit = (data: SwissProtRecord) => {
        save(data)
    }

    return (
        <>
            <div className="w-full flex flex-col items-center">
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
        </>
    )
}

export default AddProtein;