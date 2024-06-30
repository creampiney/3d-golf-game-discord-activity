import { PlaneProps, usePlane } from "@react-three/cannon"
import { useTexture } from "@react-three/drei"
import { Mesh, RepeatWrapping } from "three"

export default function Plane(props: PlaneProps) {
    const [ref] = usePlane<Mesh>(() => ({
      type: 'Static',
      position: [0, 0, 0],
      rotation: [-Math.PI / 2, 0, 0],
      ...props
    }))

    const planeMap = useTexture('/textures/fairway.png')
    planeMap.wrapS = RepeatWrapping
    planeMap.wrapT = RepeatWrapping
    planeMap.repeat.set(props.args ? props.args[0] as number/2: 10, props.args ? props.args[1] as number/2: 10)
  
    return (
      <mesh 
        ref={ref} 
        receiveShadow
        name="plane"
      >
        <planeGeometry args={props.args ? [props.args[0] as number, props.args[1] as number] : [20, 20]} />
        <meshBasicMaterial map={planeMap} />
      </mesh>
    )
  }