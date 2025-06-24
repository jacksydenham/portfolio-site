import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Environment,
} from "@react-three/drei";
import Coin from "./components/Coin";
import "./App.css";
import React from "react";
import "@fontsource/bebas-neue/400.css";


function ScrollScene() {
  const coinState = React.useRef<THREE.Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!coinState.current) return;
    const scrollPos = scroll.offset;

    let x = 0.5, y = 0;
    
    if (scrollPos < 0.25) x = THREE.MathUtils.lerp(0.5, 2.5, scrollPos / 0.25); // first 25%
    
    else if (scrollPos < 0.75) x = 2.5; // middle 50%
    
    else { // last 25%
      const k = (scrollPos - 0.75) / 0.25; 

      x = 2.5;
      y = THREE.MathUtils.lerp(0, -1, k);
    }

    coinState.current.rotation.y += 0.01;
    coinState.current.position.set(x, y, 0);
  });

  return (
    <group ref={coinState}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 4, 3]} intensity={1} />
      <Coin scale={3} />
      <Environment preset="studio" />
    </group>
  );
}

export default function App() {
  return (
    <Canvas className="bgCanvas" camera={{ position: [0, 2, 6], fov: 50 }}>
      <ScrollControls pages={3}>
        <ScrollScene />

        <Scroll html>
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
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
