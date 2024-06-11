import { DragControls, Scroll, ScrollControls, useScroll } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense } from 'react';
import * as THREE from 'three';
import Nucleotide from './animation/Nucleotide';

function DNAAnimation({strand, children}) {
      const dragTranslation = new THREE.Matrix4()
      dragTranslation.elements = [
        1,0,0,0.1,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
      ]
    const strandsPerPage = 110;

    const dnaElements = strand.split('').map((nuc, idx)=>{                
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
            <ScrollControls horizontal pages={strand.length/strandsPerPage} damping={0.1}>
                <Scroll>
                    <Suspense fallback={null}>
                        <DragControls axisLock='y'>
                            {dnaElements}
                            {children}

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