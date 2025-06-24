import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stats } from "@react-three/drei";
import "./App.css";
import React from "react";
import "@fontsource/bebas-neue/400.css";
import CoinBoard from "./components/CoinBoard";

function ScrollScene() {
  const groupRef = React.useRef<THREE.Group>(null);
  const boardGroup = React.useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!boardGroup.current) return;
    const scrollPos = scroll.offset;

    let x = 0.5,
      y = 0;

    if (scrollPos < 0.25)
      x = THREE.MathUtils.lerp(0.5, 2.5, scrollPos / 0.25); // first 25%
    else if (scrollPos < 0.75) x = 2.5; // middle 50%
    else {
      // last 25%
      const k = (scrollPos - 0.75) / 0.25;

      x = 2.5;
      y = THREE.MathUtils.lerp(0, -1, k);
    }

    boardGroup.current.position.set(x, y, 0);
  });

  const rotationStartTime = React.useRef(0);
  useFrame((_, dt) => {
    if (!groupRef.current) return;

    rotationStartTime.current += dt;
    if (rotationStartTime.current < 2) return;

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      Math.PI,
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
    <group ref={boardGroup}>
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
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2} />
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
