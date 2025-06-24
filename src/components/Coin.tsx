/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

interface CoinProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Coin({ position = [0, 0, 0], scale = 5 }: CoinProps) {
  const { nodes } = useGLTF("/models/Coin.glb") as any;

  const ref = useRef<THREE.Mesh>(null);
  
  return (
    <mesh
      ref={ref}
      geometry={nodes.Coin.geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshBasicMaterial color={"#aaa"} />
    </mesh>
  );
}

useGLTF.preload("/models/Coin.glb");
