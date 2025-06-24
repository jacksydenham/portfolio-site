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
  const { nodes } = useGLTF("/models/Board.glb") as any;

  return (
    <mesh
      ref={ref}
      geometry={nodes.Board.geometry}
      position={position}
      scale={scale}
    receiveShadow>
      <meshPhongMaterial
  color="#ffffff"
  shininess={80}
/>

    </mesh>
  );
});

export default Board;

useGLTF.preload("/models/Board.glb");
