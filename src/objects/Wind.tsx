import React, { RefObject } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { GolfBallRef } from './GolfBall';
interface WindProps {
    direction: Vector3; 
    speed: number; 
    ballRef: RefObject<GolfBallRef>;
}

const Wind: React.FC<WindProps> = ({ direction, speed, ballRef }) => {
    // Update the wind effect on every frame
    useFrame(() => {
        if (ballRef.current) {
            const windForce = direction.clone().multiplyScalar(speed);
            ballRef.current?.applyWind(windForce)
        }
    });

    return null;
};

export default Wind;
