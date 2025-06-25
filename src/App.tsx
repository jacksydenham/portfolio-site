/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stats } from "@react-three/drei";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import "@fontsource/bebas-neue/400.css";
import CoinBoard from "./components/CoinBoard";

function ScrollScene({ activeProject }: { activeProject: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const boardGroup = useRef<THREE.Group>(null);
  const scroll = useScroll();

  const boardAnimTime = useRef(0);
  const idleTime = useRef(0);
  const hasSpun = useRef(false);
  const spinTargetY = Math.PI * 1.25;

  const wasInProjects = useRef(false);

  // anims
  useFrame(({ clock }, dt) => {
    if (!boardGroup.current || !groupRef.current) return;

    // time trackers
    boardAnimTime.current += dt;
    idleTime.current += dt;

    const scrollY = scroll.offset;
    const heroEnd = 0.05;
    const projectsEnd = 0.8;

    const inHero = scrollY < heroEnd;
    const inProjects = scrollY >= heroEnd && scrollY < projectsEnd;
    const inContact = scrollY >= projectsEnd;

    // coins wait after spinning
    if (inProjects && !wasInProjects.current) {
      (window as any).section2EntryTime = clock.getElapsedTime();
      (window as any).setActiveProject?.("Keydocs");
    } else if (!inProjects && wasInProjects.current) {
      delete (window as any).section2EntryTime;
      (window as any).resetActiveProject?.();
    }

    wasInProjects.current = inProjects;

    // tilt board on x
    let targetTiltX = THREE.MathUtils.degToRad(70);
    if (inProjects) {
      targetTiltX = THREE.MathUtils.degToRad(10);
    } else if (boardAnimTime.current < 3) {
      const t = boardAnimTime.current / 3;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      targetTiltX = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(15),
        THREE.MathUtils.degToRad(70),
        eased
      );
    }

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetTiltX,
      3,
      dt
    );

    // spin board
    let YRotation = groupRef.current.rotation.y;
    if (inProjects) {
      YRotation = spinTargetY;
    } else if (inHero) {
      YRotation = 0;
    } else if (inContact) {
      YRotation = -THREE.MathUtils.degToRad(0);
    }

    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      YRotation,
      4,
      dt
    );

    // fuckass check for sonic coin
    if (
      !hasSpun.current &&
      Math.abs(groupRef.current.rotation.y - spinTargetY) < 0.05
    ) {
      hasSpun.current = true;
    }

    // idle anim
    if (inProjects) {
      const fade = THREE.MathUtils.clamp(idleTime.current / 2, 0, 1);
      const bobY = Math.sin(idleTime.current * 1.8) * 0.035 * fade;
      const yawAdd =
        Math.sin(idleTime.current * 0.8) * THREE.MathUtils.degToRad(0.1) * fade;
      const rollZ =
        Math.sin(idleTime.current * 1.6) * THREE.MathUtils.degToRad(1) * fade;

      boardGroup.current.position.y = bobY;
      groupRef.current.rotation.y += yawAdd;
      groupRef.current.rotation.z = rollZ;
    }

    // board pos
    if (inContact) {
      // slide off-screen
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        15,
        2,
        dt
      );
    } else {
      // project or hero
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        inProjects ? 2.5 : 0.5,
        4,
        dt
      );
    }
  });

  return (
    <group ref={boardGroup}>
      <group
        ref={groupRef}
        position={[0, -0.4, 0]}
        rotation={[THREE.MathUtils.degToRad(15), 0, 0]}
      >
        <CoinBoard
          currentSection={
            scroll.offset < 0.05
              ? "hero"
              : scroll.offset < 0.75
              ? "projects"
              : "contact"
          }
          activeProject={activeProject}
        />
      </group>
    </group>
  );
}

export default function App() {
  const projectCycle = ["Keydocs", "Carer Manager Plus", "SmartBoard"];
  const [autoProjectIndex] = useState(0);
  const [userOverride, setUserOverride] = useState<string | null>(null);

  // unselect project
  useEffect(() => {
    (window as any).resetActiveProject = () => setUserOverride(null);
    (window as any).setActiveProject = (project: string) =>
      setUserOverride(project);
  }, []);

  const activeProject = userOverride ?? projectCycle[autoProjectIndex];

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
        <ScrollScene activeProject={activeProject} />
        <Scroll html>
          <section className="hero">
            <h1>Jack&nbsp;Sydenham</h1>
            <p>Full-stack&nbsp;Developer</p>
          </section>
          <section className="projects">
            {projectCycle.map((project) => (
              <div
                key={project}
                className={`project-card ${
                  activeProject === project ? "active" : ""
                }`}
                onMouseEnter={() => setUserOverride(project)}
                onMouseLeave={() => {
                  setUserOverride(project);
                }}
              >
                <h3>{project}</h3>
              </div>
            ))}
          </section>
          <section className="contact">
            <div className="contact-box">contact form coming soon…</div>
          </section>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
