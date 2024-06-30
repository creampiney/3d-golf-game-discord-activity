import { useState} from 'react';
import { CylinderProps, useCylinder } from '@react-three/cannon';
import { Mesh } from 'three';

const Hole = (props: CylinderProps & { onBallEnter: () => void }) => {
  const [entered, setEntered] = useState(false);

  const [ref] = useCylinder<Mesh>(() => ({
    args: [0.5, 0.5, 1, 32], // RadiusTop, RadiusBottom, Height, NumSegments
    type: 'Static',

    position: props.position ? [props.position[0],props.position[1]-0.49,props.position[2]] : [0, 0, 0],

    onCollide: () => {
      // Set the entered state to true when the golf ball enters the hole
      setEntered(true);
      props.onBallEnter(); // Callback to notify the parent component
    },
  }));

  return (
    <mesh ref={ref} name="jumper">
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshBasicMaterial color={entered ? 'green' : 'black'} />
    </mesh>
  );
};

export default Hole;
