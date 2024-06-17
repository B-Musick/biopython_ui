import { SequenceRecord } from "../lib/types"
import Sequence from "./Sequence";
import Table from "./Table"

interface SequenceRecordViewProps {
    record: SequenceRecord,
    classes: string
}
const SequenceRecordView: React.FC<SequenceRecordViewProps> = ({record, classes}) => {
    let stringAttributes = ['id', 'name', 'description'];
    console.log(record)
    let recordAttributes = stringAttributes.map((attr, index)=>{
        return (
            <div className="flex justify-between">
                <label className="font-bold mr-5">{attr}:</label>
                <p>{record[attr]}</p>
            </div>
        )
    })

    // const nucleotideColor = {
    //     'A': 'bg-red-100',
    //     'T': 'bg-blue-200',
    //     'C': 'bg-amber-300',
    //     'G': 'bg-green-400'
    // }

    // let sequence = <div>
    //     <div className="flex flex-row flex-wrap py-4">{record.seq.split('').map((nuc)=>{
    //         return (
    //             <div className={`${nucleotideColor[nuc]} w-[15px] h-[50px] mt-2 flex justify-center items-center border border-black p-2`}>{nuc}</div>
    //         )
    //     })}</div>
    // </div>

    let qualifiersTable = record.features.map((feature)=>{
        return (
            <>
                <h3 className="w-full bg-cyan-900 text-white text-center p-1 mt-4">{feature.type}</h3>
                <Table 
                    cols={[{name: 'type', style: {fontWeight: '700' }}, {name: 'value', wrap: true}]} 
                    rows={Object.keys(feature.qualifiers).map((key, index)=>{
                        return {type: key, value: feature.qualifiers[key][0]}
                    })} 
                    fixedHeader={false}
                    hiddenCols={[]} 
                    sortable={[]} 
                    onRowClick={()=>{}}
                    classes={`overflow-scroll ${classes} sequence-feature`}
                />
            </>
        )
    })

    let annotationsTable = (
        <>
            <div className="p-3 bg-cyan-950 w-full text-white text-center my-2">Annotations</div>

            <Table 
                cols={[{name: 'type', style: {fontWeight: '700'  }}, {name: 'value', wrap: true}]}
                rows={Object.keys(record.annotations).map((key, index)=>{
                    return {type: key, value: record.annotations[key]}
                })}
                fixedHeader={false}
                hiddenCols={[]} 
                sortable={[]} 
                onRowClick={()=>{}}
                classes={`overflow-scroll ${classes} sequence-feature`}
            />
        </>
    )

    return (
        <div>
            <div className="p-3 bg-emerald-500 w-full text-white text-center my-2">Info</div>
            {recordAttributes}
            <div className="p-3 bg-violet-500 w-full text-white text-center my-2">Sequence</div>
            <Sequence sequence={record.seq}/>
            <div className="p-3 bg-cyan-950 w-full text-white text-center my-2">Features</div>
            {qualifiersTable}
            {annotationsTable}
        </div>
    )
}

export default SequenceRecordView