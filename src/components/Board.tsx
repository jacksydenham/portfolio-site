/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";

interface BoardProps {
  position?: [number, number, number];
  scale?: number;
}

const Board = forwardRef<THREE.Mesh, BoardProps>(function Board(
  { position = [0, 0, 0], scale = 5 },
  ref
) {
  const { nodes } = useGLTF("/models/BoardFinal.glb") as any;

  return (
    <mesh
      ref={ref}
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
  );
});

export default Board;

useGLTF.preload("/models/BoardFinal.glb");
