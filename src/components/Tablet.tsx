/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

interface TabletProps {
  position?: [number, number, number];
  scale?: number;
}

export default function Tablet({ position = [0, 0, 0], scale = 5 }: TabletProps) {
  const { nodes } = useGLTF("/models/TabletXL.glb") as any;

  const ref = useRef<THREE.Mesh>(null);
  
  return (
    <mesh
      ref={ref}
      geometry={nodes.TabletXL.geometry}
      position={position}
      scale={scale}
      castShadow
      receiveShadow
    >
      <meshBasicMaterial />
    </mesh>
  );
}

useGLTF.preload("/models/TabletXL.glb");
