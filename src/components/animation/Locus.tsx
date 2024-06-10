function Locus({startLoci, endLoci, height}){
    const nucleotideSpace = 0.1;

    const width = ((startLoci-1) * nucleotideSpace) + ((endLoci-startLoci)*nucleotideSpace);

    return (<mesh position={[(((startLoci-1) * nucleotideSpace) + width/2), 0 ,0.1]}>
        {/* Mesh is fundamental building block for shapes */}
        {/* Args gives the shape [x,y,z] */}
        {/* <boxGeometry args={[2,2,5]}/> */}
        <boxGeometry args={[width, height, 0]} />
  
        {/* Need to add lighting too it to see */}
        <meshPhongMaterial opacity={0.4} color={"#bfbfbf"} transparent/>
      </mesh>)
}

export default Locus;