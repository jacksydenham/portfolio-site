/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { makeLetterTexture } from "./makeLetterTexture";
import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  name: string;
  position: [number, number, number];
  scale?: number;
  categories: string[];
  isHovered: boolean;
  setHoveredCategory?: (cat: string | null) => void;
}

function yLookAt(source: THREE.Object3D, target: THREE.Vector3) {
  const v1 = new THREE.Vector3().subVectors(target, source.position);
  return Math.atan2(v1.x, v1.z); // yaw angle in radians
}

export default function CoinInstance({
  name,
  position,
  scale = 1,
  categories,
  isHovered,
  setHoveredCategory,
}: Props) {
  const { nodes } = useGLTF("/models/Coin.glb") as any;
  const texture = useMemo(
    () => makeLetterTexture(name[0].toUpperCase()),
    [name]
  );

  const basePosition = useRef<THREE.Vector3>(new THREE.Vector3(...position));
  const delay = useMemo(() => Math.random() * 1.5, []);
  const startTime = useRef<number | null>(null);

  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const { camera } = useThree();

  useFrame(({ clock }, dt) => {
    if (!ref.current || !materialRef.current) return;

    const elapsed = clock.getElapsedTime();
    if (startTime.current === null) startTime.current = elapsed;
    const t = elapsed - startTime.current;

    const progress = Math.min(Math.max((t - delay) * 2, 0), 1);
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

    // slide down from above + fade in
    const targetY = basePosition.current.y;
    const hoverLift = isHovered ? 0.2 : 0;

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

    const targetYaw = isHovered ? yLookAt(ref.current, camera.position) : 0; // flat default orientation

    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      targetYaw,
      6,
      dt
    );

    // fuckass ai point coins to cam for section 1
    if (isHovered) {
      const toCam = new THREE.Vector3()
        .subVectors(camera.position, ref.current.position)
        .normalize();

      const target = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        toCam
      );

      ref.current.quaternion.slerp(target, 0.1);
    } else {
      ref.current.quaternion.slerp(new THREE.Quaternion(), 0.1);
    }
  });

  return (
    <mesh
      ref={ref}
      geometry={nodes.Coin.geometry}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredCategory?.(categories[0]); // or loop if you support multi
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredCategory?.(null);
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
