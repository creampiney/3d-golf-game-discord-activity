import { BoxProps, useBox } from '@react-three/cannon'
import { useCubeTexture, useTexture } from '@react-three/drei'
import React from 'react'
import { Mesh, RepeatWrapping } from 'three'

const Wall = (props: BoxProps) => {

    const envMap = useCubeTexture(
      ["wall.png", "wall.png", "wall.png", "wall.png", "wall.png", "wall.png"],
      { path: "textures/" }
    )

    const [ref, api] = useBox<Mesh>(() => ({
        type: 'Static',
        mass: 100,
        ...props
    }))

    const wallMap = useTexture('/textures/wall.png')
    wallMap.wrapS = RepeatWrapping
    wallMap.wrapT = RepeatWrapping
    wallMap.repeat.set(props.args ? props.args[0] as number/2: 10, props.args ? props.args[1] as number/2: 10)

    return (
        <mesh ref={ref}>
          <boxGeometry args={props.args ? props.args : [1, 1, 1]} />
          <meshBasicMaterial map={wallMap}/>
        </mesh>
      )
}

export default Wall