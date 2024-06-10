const Nucleotide = ({type, position, rotation}) => {
    const nucleotides = {
        "A":{ color: '#eb4209', size: [0.05, 0.8, 0.05] },
        "T":{ color: '#09a7eb', size: [0.05, 0.8, 0.05] },
        "C":{ color: '#09eb5c', size: [0.05, 0.8, 0.05] },
        "G":{ color: '#fc9d03', size: [0.05, 0.8, 0.05] },
    }

    return (<mesh position={position} rotation={rotation}>
        {/* Mesh is fundamental building block for shapes */}
        {/* Args gives the shape [x,y,z] */}
        {/* <boxGeometry args={[2,2,5]}/> */}
        <boxGeometry args={nucleotides[type].size} />
        
        {/* Need to add lighting too it to see */}
        <meshStandardMaterial color={nucleotides[type].color}/>
    </mesh>)
  }

  export default Nucleotide