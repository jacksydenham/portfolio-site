/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { useLoader } from "@react-three/fiber";

interface BoardProps {
  position?: [number, number, number];
  scale?: number;
}

const Board = forwardRef<THREE.Mesh, BoardProps>(function Board(
  { position = [0, 0, 0], scale = 5 },
  ref
) {
  const { nodes } = useGLTF("/models/BoardFinal.glb") as any;

  const cardTex = useLoader(THREE.TextureLoader, "/textures/cardMin.png");
  cardTex.flipY = true;
  cardTex.colorSpace = THREE.SRGBColorSpace;

  const bbox = new THREE.Box3().setFromBufferAttribute(
    nodes.Cube.geometry.attributes.position
  );
  const size = new THREE.Vector3();
  bbox.getSize(size);

  return (
    <group ref={ref}>
      <mesh
        geometry={nodes.Cube.geometry}
        position={position}
        scale={scale}
        receiveShadow
      >
        <meshStandardMaterial
          metalness={1}
          roughness={0.4}
          color={"#dfe3e6"}
          emissive={"#222222"}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh
        rotation={[Math.PI / 2, 0, Math.PI]}
        position={[0, 0.07, 0]}
      >
        <planeGeometry args={[size.x * scale * 0.9, size.z * scale * 0.9]} />
        <meshStandardMaterial map={cardTex} />
      </mesh>
    </group>
  );
});

export default Board;

useGLTF.preload("/models/BoardFinal.glb");
