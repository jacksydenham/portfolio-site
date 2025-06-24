/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { makeLetterTexture } from "./makeLetterTexture";
import { useMemo, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  name: string;
  position: [number, number, number];
  scale?: number;
}

export default function CoinInstance({ name, position, scale = 1 }: Props) {
  const { nodes } = useGLTF("/models/Coin.glb") as any;
  const texture = useMemo(() => makeLetterTexture(name[0].toUpperCase()), [name]);

  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);

  const basePosition = useRef<THREE.Vector3>(new THREE.Vector3(...position));
  const delay = useMemo(() => Math.random() * 1.5, []);
  const startTime = useRef<number | null>(null);

  useFrame(({ clock }, dt) => {
    if (!ref.current || !materialRef.current) return;

    const elapsed = clock.getElapsedTime();
    if (startTime.current === null) startTime.current = elapsed;
    const t = elapsed - startTime.current;

    const progress = Math.min(Math.max((t - delay) * 2, 0), 1);
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

    // Animate down from above
    const targetY = basePosition.current.y;
    const hoverLift = hovered ? 0.2 : 0;
    const animatedY = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY + hoverLift,
      6,
      dt
    );

    ref.current.position.set(
      basePosition.current.x,
      THREE.MathUtils.lerp(targetY + 1, animatedY, eased),
      basePosition.current.z
    );

    materialRef.current.opacity = eased;

    if (hovered) ref.current.rotation.z += dt * 0.5;
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Coin.geometry}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        console.log("Hovered:", name);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        toneMapped={false}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

useGLTF.preload("/models/Coin.glb");
