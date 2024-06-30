import React from 'react';
import { Mesh, Color } from 'three';
import { SphereProps, useSphere } from '@react-three/cannon';

interface SphereLightProps extends SphereProps {
  positions?: [number, number, number];
  radius?: number;
  color?: [number, number, number];
}

const SphereLight: React.FC<SphereLightProps> = (props) => {
  const { positions = [0, 0, 0], radius = 1, color = [1, 1, 1] } = props;
  const [ref] = useSphere<Mesh>(() => ({
    type: 'Static',
    position: positions,
    args: [radius],
    ...props,
  }));

  return (
    <mesh ref={ref} >
      <sphereGeometry args={[radius, 32, 32] } />
      <meshStandardMaterial color={new Color(...color)}
                            emissive={new Color(...color)} />
      <pointLight color={new Color(...color)} intensity={200} distance={radius * 10} />
    </mesh>
  );
};

export default SphereLight;
