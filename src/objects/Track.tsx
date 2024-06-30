import { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh, TextureLoader } from "three";

export function Track() {
  const result = useLoader(
    GLTFLoader,
    "/models/track.glb"
  );

  // const colorMap = useLoader(
  //   TextureLoader,
  //   "/textures/track.png"
  // );

  // useEffect(() => {
  //   colorMap.anisotropy = 16;
  // }, [colorMap]);

  const mesh = result.scene.children[0] as Mesh;

  return (
    <>
      <mesh geometry={mesh.geometry}>
        {/* <meshBasicMaterial
          toneMapped={false}
          map={colorMap}
        /> */}
      </mesh>
    </>
  );
}
