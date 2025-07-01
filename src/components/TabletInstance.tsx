/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
// import { makeLetterTexture } from "./makeLetterTexture";
import { useMemo, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  name: string;
  position: [number, number, number];
  scale?: number;
  currentSection: "hero" | "projects" | "contact";
  categories: string[];
  isHovered: boolean;
  setHoveredCategory?: (cat: string | null) => void;
}

export default function TabletInstance({
  name,
  position,
  scale = 1,
  currentSection,
  categories,
  isHovered,
  setHoveredCategory,
}: Props) {
  const { nodes } = useGLTF("/models/Badge.glb") as any;

  // texture tablets
  const fileName = `${name}.png`;

  const texture = useLoader(THREE.TextureLoader, `/textures/${fileName}`);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.rotation = 0;
  texture.center.set(0.5, 0.5);

  const delay = useMemo(() => Math.random() * 1.5, []);
  const bobSpeed = useMemo(() => 1.5 + Math.random() * 0.8, []);
  const bobPhase = useMemo(() => Math.random() * Math.PI * 2, []);
  const basePosition = useRef(new THREE.Vector3(...position));
  const startTime = useRef<number | null>(null);

  const isProjects = currentSection === "projects";
  const isHero = currentSection === "hero";

  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const angularVelocity = useRef(0);
  const wasHovered = useRef(false);

  useFrame(({ clock }, dt) => {
    if (!ref.current || !materialRef.current) return;

    const elapsed = clock.getElapsedTime();
    const entryTime = (window as any).section2EntryTime as number | undefined;
    const inDelayGate = entryTime !== undefined && elapsed - entryTime < 0.35;

    const hoverActive = isHovered && ((isProjects && !inDelayGate) || isHero);

    // Drop-in animation
    if (startTime.current === null) startTime.current = elapsed;
    const dropT = elapsed - startTime.current;
    const progress = Math.min(Math.max((dropT - delay) * 2, 0), 1);
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

    const targetY = basePosition.current.y;
    const hoverLift = hoverActive ? 0.3 : 0;
    materialRef.current.opacity = eased;

    const animatedY = THREE.MathUtils.damp(
      ref.current.position.y,
      targetY + hoverLift,
      6,
      dt
    );

    const bobY = hoverActive
      ? Math.sin(elapsed * bobSpeed + bobPhase) * 0.005
      : 0;

    ref.current.position.set(
      basePosition.current.x,
      THREE.MathUtils.lerp(targetY + 1, animatedY, eased) + bobY,
      basePosition.current.z
    );

    wasHovered.current = hoverActive;

    if (hoverActive) {
      if (isHero && setHoveredCategory) {
        // no rotation during hero category hover
        ref.current.rotation.set(0, 0, 0);
      } else if (isProjects) {
        ref.current.rotation.x = THREE.MathUtils.damp(
          ref.current.rotation.x,
          -Math.PI / 2,
          6,
          dt
        );

        ref.current.rotation.z =
          (ref.current.rotation.z + dt * angularVelocity.current) %
          (Math.PI * 2);
        angularVelocity.current = THREE.MathUtils.damp(
          angularVelocity.current,
          0.5,
          2,
          dt
        );

        ref.current.rotation.y = THREE.MathUtils.damp(
          ref.current.rotation.y,
          -Math.PI,
          4,
          dt
        );
      }
    } else {
      // reset orientation
      angularVelocity.current = 0;

      if (setHoveredCategory && isHero) {
        ref.current.quaternion.slerp(new THREE.Quaternion(), 0.1);
      } else {
        ref.current.rotation.x = THREE.MathUtils.damp(
          ref.current.rotation.x,
          0,
          6,
          dt
        );
        ref.current.rotation.y = THREE.MathUtils.damp(
          ref.current.rotation.y,
          -Math.PI,
          6,
          dt
        );
        ref.current.rotation.z = THREE.MathUtils.damp(
          ref.current.rotation.z,
          0,
          6,
          dt
        );
      }
    }
  });

  console.log(texture);

  return (
    <mesh
      ref={ref}
      geometry={nodes.Badge.geometry}
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
      <meshPhysicalMaterial
        ref={materialRef}
        map={texture}
        metalness={0.1}
        roughness={0.5}
        clearcoat={0.4}
        clearcoatRoughness={1}
        side={THREE.DoubleSide}
        emissive={"#111111"}
        emissiveIntensity={0.1}
        transparent
      />
    </mesh>
  );
}

useGLTF.preload("/models/Badge.glb");
