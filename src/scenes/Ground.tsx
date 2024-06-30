import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { Mesh, TextureLoader } from "three";
import { PlaneProps, usePlane } from "@react-three/cannon"


export default function Ground(props: PlaneProps){
    const [ref] = usePlane<Mesh>(() => ({
        type: 'Static',
        position: [0, 0, 0],
        rotation: [-Math.PI / 2, 0, 0],
        ...props
      }))
    
    const gridMap = useLoader(
    TextureLoader,
    "/textures/grid.png"
    );

    const alphaMap = useLoader(
    TextureLoader,
    "/textures/alpha-map.png"
    );

    const meshRef = useRef<Mesh | null>(null);
    const meshRef2 = useRef<Mesh | null>(null);

    useEffect(() => {
    if (!gridMap) return;

    gridMap.anisotropy = 16;
    }, [gridMap]);

    useEffect(() => {
    if (!meshRef.current) return;

    const mesh1 = meshRef.current as Mesh;
    const mesh2 = meshRef2.current as Mesh;

    const uvs = mesh1.geometry.attributes.uv.array;
    mesh1.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    const uvs2 = mesh2.geometry.attributes.uv.array;
    mesh2.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
    }, [meshRef.current]);

    return (
    <>
        <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
        >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
            opacity={0.625}
            alphaMap={gridMap}
            transparent={true}
            color={"gray"}
        />
        </mesh>

        <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
        >
        <circleGeometry args={[300, 300]} />
        <MeshReflectorMaterial
            alphaMap={alphaMap}
            transparent={false}
            color={[0.5, 0.5, 0.5]}
            envMapIntensity={0.05}
            metalness={0}
            roughness={1000}

            dithering={false}
            blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
            mixBlur={5} // How much blur mixes with surface roughness (default = 1)
            mixStrength={5} // Strength of the reflections
            mixContrast={1} // Contrast of the reflections
            resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
            reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        ></MeshReflectorMaterial>
        </mesh>
    </>
    );
};