import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Select from "react-select";

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

    return (
        // Add a plus button where they can perform multiple motif searches (duplicates the form)
        <>
            <form onSubmit={handleSubmit}>
                {/* Place a dropdown of existing motifs */}
                <label htmlFor="motif">Motif: </label>
                <input type="text" id="motif" name="motif" value={formData.motif} onChange={handleChange} />

                <label htmlFor="sequence">Sequence: </label>
                <textarea type="text" id="sequence" name="sequence" className="overflow-scroll" value={formData.sequence} onChange={handleChange} />
                
                {/* or allow them to input their own */}
                <button>Find</button>
            </form>
            <section>
                locations: {locations.join(', ')}
            </section>
        </>
    )
}

export default Motif;