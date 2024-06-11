import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BarGraph from "./BarGraph";
import Table from "../Table";

function NucleotideCount() {
    const [selectedRecord] = useOutletContext();
    const [nucleotideCounts, setNucleotideCounts] = useState({
        'A': 0, 'C':0, 'T':0, 'G':0
    })

    useEffect(()=>{
        if(Object.keys(selectedRecord).length > 0){
            let nucleotides = {
                A: 0, C:0, T:0, G:0
            }
            selectedRecord.seq.split('').forEach((letter)=>{
                nucleotides = {...nucleotides, [letter]: nucleotides[letter]+1 }
            })
            setNucleotideCounts(nucleotides)
        }
    }, [selectedRecord])

    const data = {
        labels: Object.keys(nucleotideCounts),
        datasets: [
            {
                label: "Nucleotide Counts",
                data: Object.values(nucleotideCounts),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                  ],
                  borderColor: [
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(255, 99, 132)',
                  ],
                  borderWidth: 1,

            },
        ]
    };

    const options = {
        scales: {
        y: {
            beginAtZero: true,
        },
        },
    };

    let columns = [{name: 'nucleotide', style: {fontWeight: '700'  }}, {name: 'count'}];
    let rows = Object.keys(nucleotideCounts).map((key, index)=>{
        return {nucleotide: key, count: nucleotideCounts[key]}
    })

    return (
        <div className="flex w-full h-full justify-evenly items-center flex-wrap">        
            <BarGraph 
                data={data}
                options={options} 
                className={"min-w-1/2 h-1/2 w-1/2 m-5 bg-slate-800 rounded-xl p-2"}
            />

            <div className="rounded-xl">
                <Table 
                    theme={"dark"}
                    cols={columns}
                    rows={rows} 
                    hiddenCols={[]} 
                    sortable={[]} 
                    onRowClick={()=>{}}
                    classes={`w-1/4 m-5`}
                />
            </div>
        </div>
    )
}

export default NucleotideCount