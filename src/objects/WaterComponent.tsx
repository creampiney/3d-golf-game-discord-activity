import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { TextureLoader, RepeatWrapping, PlaneGeometry, ShaderMaterial, Box3, Vector3} from 'three';

import { Water } from 'three/examples/jsm/Addons.js';


const WaterComponent = ({ position, args }: { position: [number, number, number], args: [number, number, number]}) => {
    const waterRef = useRef<Water>();
  
    const { scene } = useThree();
  
    useEffect(() => {
      const waterGeometry = new PlaneGeometry(args[0], args[2]);
      const water = new Water(waterGeometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new TextureLoader().load('/textures/Water_1_M_Normal.jpg', texture => {
          texture.wrapS = RepeatWrapping;
          texture.wrapT = RepeatWrapping;
        }),
        sunDirection: new Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.5,
        fog: scene.fog !== undefined
      });
  
      water.rotation.x = - Math.PI / 2;
      water.position.set(position[0], position[1], position[2]);
      (water.material as ShaderMaterial).uniforms['flowSpeed'] = { value: 0.03 };
      scene.add(water);
      waterRef.current = water;
  
      return () => {
        scene.remove(water);
      };
    }, [position, args, scene]);
  
    useFrame((state, delta) => {
      if (waterRef.current) {
        waterRef.current.material.uniforms['time'].value += delta;

      }
    });
  
    return null;
  };
  
  export default WaterComponent;