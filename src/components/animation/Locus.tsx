import { RoundedBox, Text } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three'

function Locus({startLoci, endLoci, height, description}){
    const nucleotideSpace = 0.1;
    const tooltipRef = useRef();
    const [enableTooltip, setEnableTooltip] = useState(false)
    const width = ((startLoci-1) * nucleotideSpace) + ((endLoci-startLoci)*nucleotideSpace);

    const handleHover = () => {
        setEnableTooltip(true)
    }

    useEffect(() => {
        if (tooltipRef && tooltipRef.current) {
          tooltipRef.current.visible = enableTooltip;
        }
      }, [enableTooltip]);
    
    const startPosition = (((startLoci-1) * nucleotideSpace) + width/2);
    return (
        <>
            <mesh position={[startPosition, 0 ,0.1]} onPointerOver={handleHover} onPointerLeave={()=>setEnableTooltip(false)}>
                {/* Mesh is fundamental building block for shapes */}
                {/* Args gives the shape [x,y,z] */}
                {/* <boxGeometry args={[2,2,5]}/> */}
                <boxGeometry args={[width, height, 0]} />
        
                {/* Need to add lighting too it to see */}
                <meshPhongMaterial opacity={0.4} color={"#bfbfbf"} transparent/>
            </mesh>
            <RoundedBox material={new THREE.MeshBasicMaterial({color: "rgb(100,100,100)"})} args={[2,2,0]} position={[startPosition, 2, 0.0]} ref={tooltipRef}>
                <mesh >
                    {/* <planeGeometry args={[2, 2]} /> */}
                    <Text
                        color={"white"}
                        fontSize={0.15}
                        maxWidth={2}
                        lineHeight={1.5}
                        letterSpacing={0.02}
                        textAlign={"left"}
                        position={[-0.78,0.8,0.01]}
                        overflowWrap="break-word"
                        whiteSpace="overflowWrap"
                    >
                    {"test"}
                    </Text>
                    <Text
                        color={"white"}
                        fontSize={0.12}
                        maxWidth={2}
                        lineHeight={1.5}
                        letterSpacing={0.02}
                        textAlign={"left"}
                        position={[0.1,0.4, 0.01]}
                        overflowWrap="break-word"
                        whiteSpace="overflowWrap"
                    >
                    {description}
                    </Text>
                </mesh>
            </RoundedBox>
        </>
    )
}

export default Locus;