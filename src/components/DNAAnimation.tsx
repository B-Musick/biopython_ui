import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function DNAAnimation() {
  const Nucleotide = ({position, size, color, rotation}) => {
    return (<mesh position={position} rotation={rotation}>
      {/* Mesh is fundamental building block for shapes */}
      {/* Args gives the shape [x,y,z] */}
      {/* <boxGeometry args={[2,2,5]}/> */}
      <boxGeometry args={size} />

      {/* Need to add lighting too it to see */}
      <meshStandardMaterial color={color}/>
    </mesh>)
  }

  const NucleotidePairOne = ({position, rotation}) => {
    return (
      <group position={position} rotation={rotation}>
      <Nucleotide position={[0.5,0,0]} size={[0.8, 0.05, 0.05]} color={"#3A7CA5"}/>
      <Nucleotide position={[-0.5,0,0]} size={[1, 0.05, 0.05]} color={"#3A7CA5"}/>
    </group>
    )
  }

  const NucleotidePairTwo = ({position, rotation}) =>{
    return (
      <group position={position} rotation={rotation}>
        <Nucleotide position={[0.4,0,0]} size={[1, 0.05, 0.05]} color={"#3A7CA5"}/>
        <Nucleotide position={[-0.6,0,0]} size={[0.8, 0.05, 0.05]} color={"#3A7CA5"}/>
    </group>
    )
  } 

  const DNA = () => {
    const nucRef = useRef();

    useFrame((state, delta)=>{
      // Delta is the difference in time between current and last frame
      nucRef.current.rotation.y+=delta
    })
    let strands = []

    for(let i = 0; i< 60; i++){
      strands.push(
        i%2 == 0 ? 
          <NucleotidePairOne position={[0, 0.15*i, 0]} rotation={[0,0.2*i,0]}/> :
          <NucleotidePairTwo position={[0, 0.15*i, 0]} rotation={[0,0.2*i,0]}/>
      )
    }
    return (
      <group position={[0,-4,0]} ref={nucRef} rotation={[0,0,0.02]}>
        {strands}

      </group>
    )
  }
  return (
    <>
      <Canvas className='back'>
          {/* Look up directional light,  */}
          {/* <directionalLight position={[0,0,4]}/> */}
          {/* <ambientLight /> */}
          <pointLight position={[0,-2,1]} />
          <pointLight position={[0,1,1]} />
          <pointLight position={[0,4,1]} />


          <DNA />

        </Canvas>
    </>
  )
}

export default DNAAnimation
