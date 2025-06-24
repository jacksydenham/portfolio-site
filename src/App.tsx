import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stats } from "@react-three/drei";
import "./App.css";
import { useRef } from "react";
import "@fontsource/bebas-neue/400.css";
import CoinBoard from "./components/CoinBoard";

function ScrollScene() {
  const groupRef = useRef<THREE.Group>(null);
  const boardGroup = useRef<THREE.Group>(null);
  const scroll = useScroll();

  // Animate position based on scroll
  useFrame(() => {
    if (!boardGroup.current) return;
    const scrollPos = scroll.offset;

    let x = 0.5,
      y = 0;

    if (scrollPos < 0.25) {
      x = THREE.MathUtils.lerp(0.5, 2.5, scrollPos / 0.25);
    } else if (scrollPos < 0.75) {
      x = 2.5;
    } else {
      const k = (scrollPos - 0.75) / 0.25;
      x = 2.5;
      y = THREE.MathUtils.lerp(0, -1, k);
    }

    boardGroup.current.position.set(x, y, 0);
  });

  const boardAnimTime = useRef(0);
  const boardInitialZ = 4; // start near the camera
  const boardTargetZ = 0; // final resting place

  useFrame((_, dt) => {
    if (!boardGroup.current) return;

    boardAnimTime.current += dt;
    function easeInOutQuad(t: number) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    const t = Math.min(boardAnimTime.current / 3, 1);
    const eased = easeInOutQuad(t);
    // Interpolate from initialZ to targetZ
    boardGroup.current.position.z = THREE.MathUtils.lerp(
      boardInitialZ,
      boardTargetZ,
      eased
    );
  });

  // Animate rotation after 2s delay
  useFrame((_, dt) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      0,
      3,
      dt
    );

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      THREE.MathUtils.degToRad(15),
      1,
      dt
    );
  });

  return (
    <group ref={boardGroup} position={[0.5, 0, 4]}>
      <group ref={groupRef}>
        <CoinBoard />
      </group>
    </group>
  );
}

export default function App() {
  return (
    <Canvas
      className="bgCanvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 2, 6], fov: 50 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Stats />
      <ScrollControls pages={3}>
        <ScrollScene />
        <Scroll html>
          <div className="scroll-html"></div>
          <section className="hero">
            <h1>Jack&nbsp;Sydenham</h1>
            <p>Full-stack&nbsp;Developer</p>
          </section>

          <section>
            <h2>Skills + Projects</h2>
          </section>

          <section>
            <h2>Skills + Projects</h2>
          </section>
          <div />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
