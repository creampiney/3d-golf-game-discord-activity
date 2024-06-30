import { CylinderProps, useCylinder } from '@react-three/cannon';
import { Mesh, Color } from 'three';

const CylinderBlock = (props: CylinderProps & { position?: [number, number, number]; color?: [number, number, number]; args?: [number, number] }) => {
  const radius = props.args ? props.args[0] : 1;
  const height = props.args ? props.args[1] : 1;

  const [ref] = useCylinder<Mesh>(() => ({
    type: 'Static',
    mass: 100,
    position: props.position || [0,0,0],
    args: [radius, radius, height, 32], // Cylinder geometry args: top radius, bottom radius, height, radial segments
  }));

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <cylinderGeometry args={[radius, radius, height, 32]} />
      <meshStandardMaterial
        color={props.color ? new Color(...props.color) : new Color('white')}
        roughness={0.6}
      />
    </mesh>
  );
};

export default CylinderBlock;