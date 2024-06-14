import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DNAViewer from "../DNAViewer";
import Locus from "../animation/Locus";
import { useForm } from "react-hook-form";
import ErrorMessage from "../forms/ErrorMessage";

function Motif(){
    const [selectedRecord] = useOutletContext();
    const [locations, setLocations] = useState([])
    const { watch, register, handleSubmit, formState: {errors}, getValues, setValue } = useForm();
    const [sequenceString, setSequenceString] = useState('');

    const onSubmit = (data) => {
        const { motif, sequence } = data;
        findMotifLocations(sequence, motif)
        setSequenceString(sequence)
    }

    useEffect(()=>{
        setValue('sequence', selectedRecord.seq)
    }, [selectedRecord])
    
    const findMotifLocations = (sequence: string, motif: string) =>{
        let locationsFound = [];

        for(let i = 0; i<sequence.length-motif.length+1; i++) {
            if(sequence.substring(i, i+motif.length) == motif){
                locationsFound.push(i+1)
            }
        }
        setLocations(locationsFound)
    }

    let motifLocations = locations.map((loc)=>{
        return <Locus startLoci={loc-1} endLoci={loc-1+getValues('motif').length} height={1} description={"this is a description"}/>          
    })

    let dnaView = <DNAViewer strand={sequenceString}>     
        {motifLocations}
    </DNAViewer>

    return (
        // Add a plus button where they can perform multiple motif searches (duplicates the form)
        <div className="h-full w-full flex flex-col items-center">
            <form onSubmit={handleSubmit(onSubmit)} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
                {/* Place a dropdown of existing motifs */}
                <div className="flex flex-col w-full">
                    <input 
                        {...register('motif', { 
                            required:true, pattern: /^[ACTG]+$/, 
                            maxLength: watch("sequence") ? watch("sequence").length : 1 })} 
                            aria-invalid={errors.motif ? "true" : "false"
                        }
                        placeholder="Motif" 
                        className={`rounded-lg pl-2 ${errors.motif ? 'border-2 border-rose-500': ''}`}
                    />
                    {errors.motif?.type === 'required' && <ErrorMessage message={"Motif is required"} />}
                    {errors.motif?.type === 'pattern' && <ErrorMessage message={"Should only include nucleotide"} />}
                    {errors.motif?.type === 'maxLength' && <ErrorMessage message={"Motif should be shorter than sequence"} />}
                </div>

                <div className="flex flex-col w-full">
                    <textarea {...register('sequence', { required:true, pattern: /^[ACTG]+$/  })} 
                    aria-invalid={errors.sequence ? "true" : "false"} placeholder="Sequence" className="rounded-lg pl-2  mt-2 overflow-scroll p-1 w-auto" />
                    {errors.sequence?.type === 'required' && <ErrorMessage message="Sequence is required" />}
                    {errors.sequence?.type === 'pattern' && <ErrorMessage message="Should only include nucleotide" />}
                </div>

                <input type="submit" className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2"/>
            </form>
            {dnaView}
        </div>
    )
}

export default Motif;