import { BoxProps, useBox } from '@react-three/cannon';
import { Mesh } from 'three';



const ResetPlane = (props: BoxProps & { onBallFall: () => void }) => {

    const [ref] = useBox<Mesh>(() => ({
        type: 'Static',
        mass: 100,
        position: props.position || [0,0,0],
        args: props.args || [1,1,1],
        onCollide: () => {
            props.onBallFall(); // Callback to notify the parent component
        },
    }));

    return (
        <mesh ref={ref}>
            <boxGeometry args={props.args ? props.args : [1, 1, 1]}/>
            <meshBasicMaterial color="gray" />
        </mesh>
    );
};

export default ResetPlane;
