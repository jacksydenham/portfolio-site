/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Stats } from "@react-three/drei";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import "@fontsource/bebas-neue/400.css";
import TabletBoard from "./components/TabletBoard";

function ScrollScene({
  activeProject,
  anchorRef,
}: {
  activeProject: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const boardGroup = useRef<THREE.Group>(null);

  const boardAnimTime = useRef(0);
  const idleTime = useRef(0);
  const hasSpun = useRef(false);
  const spinTargetY = Math.PI * 1.25;
  const projectSpinRate = THREE.MathUtils.degToRad(15);
  const wasInProjects = useRef(false);

  const { viewport } = useThree(); // ← { width, height } in world units
  const w = viewport.width; // recomputed every resize

  // handy helpers
  const heroX = -w * 0.18; // 18 % left of centre
  const projectsX = w * 0.15; // 15 % right of centre
  const contactX = w * 0.6;

  const scroll = useScroll();
  const REF_W = 14;

  // anims
  useFrame(({ clock }, dt) => {
    if (!boardGroup.current || !groupRef.current) return;

    const { width } = viewport;                   // live world-units width
  const scale     = width / REF_W;              // < 1.0 if frustum narrows
  boardGroup.current.scale.setScalar(scale);

    // time trackers
    boardAnimTime.current += dt;
    idleTime.current += dt;

    const scrollY = scroll.offset;
    const heroEnd = 0.05;
    const projectsEnd = 0.8;

    const inHero = scrollY < heroEnd;
    const inProjects = scrollY >= heroEnd && scrollY < projectsEnd;
    const inContact = scrollY >= projectsEnd;

    // Tablets wait after spinning
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
      targetTiltX = THREE.MathUtils.degToRad(5);
    } else if (boardAnimTime.current < 3) {
      const t = boardAnimTime.current / 3;
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      targetTiltX = THREE.MathUtils.lerp(
        THREE.MathUtils.degToRad(0),
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
    let YTarget = groupRef.current.rotation.y;
    if (inProjects) YTarget = spinTargetY;
    else if (inHero) YTarget = 0;
    else if (inContact) YTarget = Math.PI * 0.5;

    // ease to default y orientation
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      YTarget,
      4,
      dt
    );

    // fuckass check for sonic Tablet
    if (
      !hasSpun.current &&
      Math.abs(groupRef.current.rotation.y - spinTargetY) < 0.05
    ) {
      hasSpun.current = true;
    }

    // idle anim
    if (inProjects) {
      const fade = THREE.MathUtils.clamp(idleTime.current / 2, 0, 1);
      const liftY = 0.5 * fade; // ≤ 1 unit
      const bobY = Math.sin(idleTime.current * 1.8) * 0.035 * fade;
      const yawAdd = projectSpinRate * dt * fade; // constant spin
      const rollZ =
        Math.sin(idleTime.current * 1.6) * THREE.MathUtils.degToRad(1) * fade;

      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        liftY + bobY,
        4,
        dt
      );

      groupRef.current.rotation.y += yawAdd;
      groupRef.current.rotation.z = rollZ;
    } else {
      // y = 0 outside of proj
      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        0,
        4,
        dt
      );
    }

    // board pos
    // -- X --
    if (inContact) {
      // slide off-screen
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        contactX,
        2,
        dt
      );
    } else {
      // project or hero
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        inProjects ? projectsX : heroX,
        4,
        dt
      );
    }

    // -- Z --
    if (inHero) {
      // always ease back to the front (z = 0)
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        0,
        4,
        dt
      );
    } else if (inProjects) {
      // hold at z = 4
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        1,
        4,
        dt
      );
    } else if (inContact) {
      // slide away
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        -5,
        4,
        dt
      );
    }

    if (inContact && anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      const canvasHeight = window.innerHeight;

      // Normalized Y: bottom of screen is 0, top is 1
      const yNorm = (canvasHeight - rect.top) / canvasHeight;

      boardGroup.current.position.set(
        0,
        -2.5 * yNorm,
        0.5 // keep this for front display
      );

      groupRef.current.rotation.set(0, Math.PI, 0);
    }
  });

  return (
    <group ref={boardGroup}>
      <group ref={groupRef} position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
        <TabletBoard
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
  const anchorRef = useRef<HTMLDivElement>(null);

  // unselect project
  useEffect(() => {
    (window as any).resetActiveProject = () => setUserOverride(null);
    (window as any).setActiveProject = (project: string) =>
      setUserOverride(project);
  }, []);

  const activeProject = userOverride ?? projectCycle[autoProjectIndex];

  return (
    <div className="page-root">
      {/* WebGL + overlay are now clamped to a centred column (≤ 1280 px) */}
      <div className="canvas-column">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          gl={{ powerPreference: "low-power", antialias: false }}
          dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        >
          {/* ----- LIGHTS / PERF ----- */}
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

          {/* ----- SCROLL SCENE ----- */}
          <ScrollControls pages={3}>
            <ScrollScene activeProject={activeProject} anchorRef={anchorRef} />

            {/* HTML that scrolls with drei; inherits the same width clamp */}
            <Scroll html>
              <div className="content-shell">
                {/* HERO ---------------------------------------------------- */}
                <section className="hero">
                  <h1>Jack&nbsp;Sydenham</h1>
                  <p>Full-stack&nbsp;Developer</p>
                </section>

                {/* PROJECTS ------------------------------------------------ */}
                <section className="projects">
                  {projectCycle.map((project) => (
                    <div
                      key={project}
                      className={`project-card ${
                        activeProject === project ? "active" : ""
                      }`}
                      onMouseEnter={() => setUserOverride(project)}
                      onMouseLeave={() => setUserOverride(null)}
                    >
                      <h3>{project}</h3>
                    </div>
                  ))}
                </section>

                {/* CONTACT ------------------------------------------------- */}
                <section className="contact">
                  <div className="contact-box">contact form coming soon…</div>
                </section>

                {/* ANCHOR FOR BOARD OFFSET -------------------------------- */}
                <section className="board-anchor-section">
                  <div ref={anchorRef} className="board-anchor" />
                </section>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
