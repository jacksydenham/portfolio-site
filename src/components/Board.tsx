// components/Board.tsx
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

interface BoardProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Board({ position = [0, 0, 0], scale = 1 }: BoardProps) {
  const { nodes } = useGLTF("/models/Board.glb") as any;

  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={ref}
      geometry={nodes.Board.geometry}
      position={position}
      scale={scale}
      receiveShadow
      castShadow
    >
      <meshStandardMaterial color="#222" roughness={1} metalness={0} />
    </mesh>
  );
}

useGLTF.preload("/models/Board.glb");
