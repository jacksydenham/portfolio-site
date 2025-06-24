// components/CoinInstance.tsx
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { makeLetterTexture } from "./makeLetterTexture";
import { useMemo } from "react";

interface Props {
  name: string;
  position: [number, number, number];
  scale?: number;
}

export default function CoinInstance({ name, position, scale = 1 }: Props) {
  const { nodes } = useGLTF("/models/Coin.glb") as any;

  // generate the texture once per name
  const texture = useMemo(
    () => makeLetterTexture(name[0].toUpperCase()),
    [name]
  );

  return (
    <mesh
      geometry={nodes.Coin.geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      {/* front & back share same texture */}
      <meshStandardMaterial
        map={texture}
        metalness={0.5}
        roughness={1}
        emissiveMap={texture}
        emissiveIntensity={0.15}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

useGLTF.preload("/models/Coin.glb");
