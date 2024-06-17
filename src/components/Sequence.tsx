function Sequence({sequence, className}){
    const nucleotideColor = {
        'A': 'bg-red-100',
        'T': 'bg-blue-200',
        'C': 'bg-amber-300',
        'G': 'bg-green-400'
    }

    let sequenceVisualized = <div className="flex flex-row flex-wrap py-4">
        {sequence.split('').map((nuc)=>{
            return (
                <div className={`${nucleotideColor[nuc]} w-[15px] h-[50px] mt-2 flex justify-center items-center border border-black p-2`}>
                    {nuc}
                </div>
            )
        })}
    </div>


    return (
        <div className={className}>
            {sequenceVisualized}
        </div>
    )
}

export default Sequence