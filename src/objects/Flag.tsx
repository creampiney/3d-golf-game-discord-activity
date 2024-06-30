import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useEffect, useState } from "react";
import { Group } from "three";
import { Mesh } from 'three';

export function Flag({ position = [0, 0, 0] }) {
  const [flagModel, setFlagModel] = useState<Group | null>(null);
  useEffect(() => {
    const loader = new GLTFLoader();

    loader.load('/models/flag.glb', (gltf) => {
        gltf.scene.traverse((child) => {
            if ((child as Mesh).isMesh) {
              const mesh = child as Mesh;
              mesh.castShadow = true;
            }
          });
          gltf.scene.scale.set(3, 3, 3);
          setFlagModel(gltf.scene);
          const mesh = gltf.scene.children[0] as Mesh;
          return<mesh geometry={mesh.geometry}>
          <meshStandardMaterial/>
          </mesh>
    }, undefined, (error) => {
      console.error('An error happened:', error);
    });
  }, []);

  return flagModel ? <primitive object={flagModel} position={[position[0]-1,position[1]+6,position[2]]} /> : null;

}

export default Flag;
