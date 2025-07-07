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
  const { nodes } = useGLTF("/models/BoardR.glb") as any;

  const cardTex = useLoader(THREE.TextureLoader, "/textures/cardMin.png");
  cardTex.flipY = true;
  cardTex.colorSpace = THREE.SRGBColorSpace;
  cardTex.anisotropy = 16;

  const bbox = new THREE.Box3().setFromBufferAttribute(
    nodes.BoardR.geometry.attributes.position
  );
  const size = new THREE.Vector3();
  bbox.getSize(size);

  return (
    <group ref={ref}>
      <mesh
        geometry={nodes.BoardR.geometry}
        position={position}
        scale={scale}
        receiveShadow
      >
        <meshStandardMaterial
          metalness={1}
          roughness={0.4}
          color={"#999"}
          emissive={"#222222"}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh
        rotation={[Math.PI / 2, 0, Math.PI]}
        position={[0, 0.02, 0]}
      >
        <planeGeometry args={[size.x * scale * 0.9, size.z * scale * 0.9]} />
        <meshStandardMaterial map={cardTex} />
      </mesh>
    </group>
  );
});

export default Board;

useGLTF.preload("/models/BoardR.glb");
