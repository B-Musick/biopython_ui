import { DragControls, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react';
import * as THREE from 'three';
import Nucleotide from './animation/Nucleotide';
import Locus from './animation/Locus';

function DNAAnimation() {
    const scroll = useScroll();

    // const Nucleotide = ({position, size, color, rotation}) => {
    //     return (<mesh position={position} rotation={rotation}>
    //       {/* Mesh is fundamental building block for shapes */}
    //       {/* Args gives the shape [x,y,z] */}
    //       {/* <boxGeometry args={[2,2,5]}/> */}
    //       <boxGeometry args={size} />
    
    //       {/* Need to add lighting too it to see */}
    //       <meshStandardMaterial color={color}/>
    //     </mesh>)
    //   }
    
      const dragTranslation = new THREE.Matrix4()
      dragTranslation.elements = [
        1,0,0,0.1,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
      ]
    const dna = "ATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATCATCGATC"
    const dnaElements = dna.split('').map((nuc, idx)=>{                
        return <Nucleotide type={nuc} position={[idx*0.1, 0, 0]} rotation={undefined}/>
    })
    return (
        <>
          <Canvas className='back z-[0] bg-slate-950'>
              {/* Look up directional light,  */}
              {/* <directionalLight position={[0,0,4]}/> */}
              {/* <ambientLight /> */}
              <ambientLight />

            {/* <DragControls axisLock='y'> */}
            <ScrollControls horizontal pages={3} damping={0.1}>
                <Scroll>
                    <Suspense fallback={null}>
                        <DragControls axisLock='y'>
                            {dnaElements}
                            <Locus startLoci={20} endLoci={40} height={1}/>
                            <Locus startLoci={26} endLoci={49} height={1.1}/>
                            {/* <Nucleotide position={[0,0,0]} size={[0.05, 0.8, 0.05]} color={"#3A7CA5"}/>
                            <Nucleotide position={[0.1,0,0]} size={[0.05, 0.8, 0.05]} color={"#3A7CA5"}/>
                            <Nucleotide position={[0.2,0,0]} size={[0.05, 0.8, 0.05]} color={"#3A7CA5"}/> */}
                        </DragControls>
                    </Suspense>
                </Scroll>
            </ScrollControls>
            {/* </DragControls> */}

            </Canvas>
        </>
      )
}

export default DNAAnimation;