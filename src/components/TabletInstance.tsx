/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
// import { makeLetterTexture } from "./makeLetterTexture";
import { useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
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

function yLookAt(source: THREE.Object3D, target: THREE.Vector3) {
  const v1 = new THREE.Vector3().subVectors(target, source.position);
  return Math.atan2(v1.x, v1.z); // yaw angle in radians
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
  const { nodes } = useGLTF("/models/Tablet.glb") as any;

  // texture tablets
  const fileName = `${name}.png`;

  const texture = useLoader(THREE.TextureLoader, `/textures/${fileName}`);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.rotation = Math.PI / 2;
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

  const { camera } = useThree();

  useFrame(({ clock }, dt) => {
    if (!ref.current || !materialRef.current) return;

    // fuckass delay on section 2 entry
    const elapsed = clock.getElapsedTime();
    const entryTime = (window as any).section2EntryTime as number | undefined;
    const inDelayGate = entryTime !== undefined && elapsed - entryTime < 0.5;

    const hoverActive = isHovered && ((isProjects && !inDelayGate) || isHero);

    // initial drop-in animation
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

    // point yaw to cam
    const targetYaw = hoverActive ? yLookAt(ref.current, camera.position) : 0;
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      targetYaw,
      6,
      dt
    );

    // hover shit
    const justStartedHover = hoverActive && !wasHovered.current;
    wasHovered.current = hoverActive;

    if (hoverActive) {
      if (justStartedHover) {
        angularVelocity.current = 10;
      }

      if (setHoveredCategory) {
        const toCam = new THREE.Vector3()
          .subVectors(camera.position, ref.current.position)
          .normalize();

        // decreasing spin speed
        const quatTarget = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          toCam
        );
        ref.current.quaternion.slerp(quatTarget, 0.1);
      } else {
        ref.current.rotation.y += dt * angularVelocity.current;
        angularVelocity.current = THREE.MathUtils.damp(
          angularVelocity.current,
          2,
          2,
          dt
        );

        ref.current.rotation.z = THREE.MathUtils.damp(
          ref.current.rotation.z,
          THREE.MathUtils.degToRad(90),
          6,
          dt
        );
      }
    } else {
      angularVelocity.current = 0;

      if (setHoveredCategory) {
        ref.current.quaternion.slerp(new THREE.Quaternion(), 0.1);
      } else {
        ref.current.rotation.x = THREE.MathUtils.damp(
          ref.current.rotation.x,
          0,
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
      geometry={nodes.Tablet.geometry}
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
        map={texture}
        side={THREE.DoubleSide}
        toneMapped={false}
        transparent
        opacity={0}
      />
    </mesh>
  );
}

useGLTF.preload("/models/Tablet.glb");
