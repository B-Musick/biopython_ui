import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import DNAViewer from "../DNAViewer";
import Locus from "../animation/Locus";

function Motif(){
    const [selectedRecord] = useOutletContext();
    const [formData, setFormData] = useState({ motif: "", sequence: "" })
    const [locations, setLocations] = useState([])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const { motif } = formData;

        console.log("form data: ",formData)
        findMotifLocations(formData.sequence, motif)
    }

    const findMotifLocations = (sequence: string, motif: string) =>{
        let locationsFound = [];

        for(let i = 0; i<sequence.length-motif.length+1; i++) {
            if(sequence.substring(i, i+motif.length) == motif){
                locationsFound.push(i+1)
            }
        }
        console.log(locationsFound)
        setLocations(locationsFound)
    }

    useEffect(()=>{
        setFormData({...formData, ['sequence']: selectedRecord.seq})
    }, [selectedRecord])

    let motifLocations = locations.map((loc)=>{
        console.log(formData)
        return <Locus startLoci={loc-1} endLoci={loc-1+formData.motif.length} height={1} description={"this is a description"}/>
                            
    })

    return (
        // Add a plus button where they can perform multiple motif searches (duplicates the form)
        <div className="h-full w-full flex flex-col items-center">
            <form onSubmit={handleSubmit} className="z-[2] flex flex-col w-1/4 h-fit rounded-xl p-4 bg-gray-200 items-center  bg-slate-800">
                {/* Place a dropdown of existing motifs */}
                <input type="text" id="motif" name="motif" placeholder="Motif" value={formData.motif} onChange={handleChange} className="p-1"/>

                <textarea type="text" id="sequence" name="sequence" placeholder="Sequence" className=" mt-2 overflow-scroll p-1" value={formData.sequence} onChange={handleChange} />
                
                {/* or allow them to input their own */}
                <button className="form-button bg-purple-300 rounded w-3/4 m-1 mt-2">Find</button>
            </form>
            {formData.sequence && 
                <DNAViewer strand={formData.sequence}>     
                    {motifLocations}
                </DNAViewer>}
            <section>
                locations: {locations.join(', ')}
            </section>
        </div>
    )
}

export default Motif;