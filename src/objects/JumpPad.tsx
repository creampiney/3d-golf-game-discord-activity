import { CylinderProps, useCylinder } from '@react-three/cannon'
import { useTexture } from '@react-three/drei';
import React from 'react'
import { Mesh } from 'three';

const JumpPad = (props: CylinderProps) => {

    const [ref] = useCylinder<Mesh>(() => ({
        type: 'Static',
        args: [0.5, 0.5, 0.1, 32], // RadiusTop, RadiusBottom, Height, NumSegments
        ...props
    }));

    const jumperMap = useTexture('/textures/jumppad.png')

  return (
    <mesh ref={ref} name="jumper">
      <cylinderGeometry args={props.args? props.args : [0.5, 0.5, 0.1, 32]} />
      <meshStandardMaterial map={jumperMap} color="white" />
    </mesh>
  )
}

export default JumpPad