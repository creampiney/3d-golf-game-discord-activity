import { BoxProps, useBox } from '@react-three/cannon';
import { Mesh ,Color} from 'three';

const Block = (props: BoxProps &{positions?:[number,number,number]} & { color?: [number,number,number] }) => {
  const [ref] = useBox<Mesh>(() => ({
        type: 'Static',
        mass: 100,
        position: props.positions || [0,0,0],
        ...props
    }))

    return (
        <mesh ref={ref} castShadow receiveShadow>
          <boxGeometry args={props.args ? props.args : [1, 1, 1]}/>
          <meshStandardMaterial  color={props.color ? new Color(...props.color) : new Color('white')}
                                 roughness={0.6}
          />
        </mesh>
      )
}

export default Block
