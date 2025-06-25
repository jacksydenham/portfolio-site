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
  const texture = useMemo(() => makeLetterTexture(name[0].toUpperCase()), [name]);

  const delay          = useMemo(() => Math.random() * 1.5, []);
  const bobSpeed       = useMemo(() => 1.5 + Math.random() * 0.8, []);
  const bobPhase       = useMemo(() => Math.random() * Math.PI * 2, []);
  const basePosition   = useRef(new THREE.Vector3(...position));
  const startTime      = useRef<number | null>(null);

  const ref          = useRef<THREE.Mesh>(null);
  const materialRef  = useRef<THREE.MeshBasicMaterial>(null);
  const { camera }   = useThree();

  useFrame(({ clock }, dt) => {
    if (!ref.current || !materialRef.current) return;

   // fuckass delay on section 2 entry
    const elapsed      = clock.getElapsedTime();
    const entryTime    = (window as any).section2EntryTime as number | undefined;
    const inDelayGate  =
      entryTime !== undefined && elapsed - entryTime < 0.5;
    const isSection2   = !setHoveredCategory;
    const hoverActive  = isHovered && !(isSection2 && inDelayGate);

    // initial drop-in animation
    if (startTime.current === null) startTime.current = elapsed;
    const dropT      = elapsed - startTime.current;
    const progress   = Math.min(Math.max((dropT - delay) * 2, 0), 1);
    const eased      = THREE.MathUtils.smoothstep(progress, 0, 1);

    const targetY    = basePosition.current.y;
    const hoverLift  = hoverActive ? 0.3 : 0;
    materialRef.current.opacity = eased;

    const animatedY  = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY + hoverLift,
      6,
      dt
    );

    const bobY =
      hoverActive && isSection2
        ? Math.sin(elapsed * bobSpeed + bobPhase) * 0.005
        : 0;

    ref.current.position.set(
      basePosition.current.x,
      THREE.MathUtils.lerp(targetY + 1, animatedY, eased) + bobY,
      basePosition.current.z
    );

    // point yaw to cam
    const targetYaw = hoverActive ? yLookAt(ref.current, camera.position) : 0;
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      targetYaw,
      6,
      dt
    );

    /* -------- hover-specific rotations -------- */
    if (hoverActive) {
      if (setHoveredCategory) {
        // section 1: face camera
        const toCam = new THREE.Vector3()
          .subVectors(camera.position, ref.current.position)
          .normalize();
        const quatTarget = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          toCam
        );
        ref.current.quaternion.slerp(quatTarget, 0.1);
      } else {
        // section 2: sonic ring ass spin
        ref.current.rotation.y += dt * 2;
        ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0, 6, dt);
        ref.current.rotation.z = THREE.MathUtils.damp(
          ref.current.rotation.z,
          THREE.MathUtils.degToRad(90),
          6,
          dt
        );
      }
    } else {
      // lay flat
      if (setHoveredCategory) {
        ref.current.quaternion.slerp(new THREE.Quaternion(), 0.1);
      } else {
        ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, 0, 6, dt);
        ref.current.rotation.z = THREE.MathUtils.damp(ref.current.rotation.z, 0, 6, dt);
      }
    }
  });

  console.log(texture)

  return (
    <mesh
      ref={ref}
      geometry={nodes.Coin.geometry}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredCategory?.(categories[0]);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredCategory?.(null);
      }}
    >
      <meshBasicMaterial
        ref={materialRef}
        
        toneMapped={false}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

useGLTF.preload("/models/Coin.glb");
