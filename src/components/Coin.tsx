import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

interface CoinProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Coin({ position = [0, 0, 0], scale = 5 }: CoinProps) {
  const { nodes } = useGLTF("/models/BoardandCoin.glb") as any;

  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta;
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Coin.geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={"#aaa"} />
    </mesh>
  );
}

useGLTF.preload("/models/coin.glb");
