import { useGLTF } from "@react-three/drei";

interface CoinProps {
  position?: [number, number, number];
}

export default function Coin({ position = [0, 0, 0] }: CoinProps) {
  const { nodes } = useGLTF("/models/Coin.glb") as any;
  return (
    <mesh
      geometry={nodes.Coin.geometry}
      position={position}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={"#aaa"} />
    </mesh>
  );
}

useGLTF.preload("/models/coin.glb");
