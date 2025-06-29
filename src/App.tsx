/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ScrollControls,
  Scroll,
  useScroll,
  Stats,
  Text,
} from "@react-three/drei";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import "@fontsource/bebas-neue/400.css";
import TabletBoard from "./components/TabletBoard";
import StarFieldCanvas from "./components/StarParticles";

function ScrollScene({
  activeProject,
  anchorRef,
}: {
  activeProject: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  // window height based positioning
  const pxToWorld = (px: number, vh: number) => (px / window.innerHeight) * vh;
  const HERO_Y_OFFSET_PX = 320;
  const CONTACT_Y_OFFSET_PX = 0;
  const CONTACT_X_OFFSET_PX = 215;

  const boardWrapper = useRef<THREE.Group>(null);
  const boardGroup = useRef<THREE.Group>(null);
  const projectsLabelRef = useRef<THREE.Mesh>(null);
  const heroLabelRef = useRef<THREE.Mesh>(null);
  const boardAnimTime = useRef(0);
  const idleTime = useRef(0);
  const hasSpun = useRef(false);

  const spinTargetY = Math.PI * 1.25;
  const projectSpinRate = THREE.MathUtils.degToRad(15);
  const wasInProjects = useRef(false);

  const scroll = useScroll();

  // window w/h track
  const { viewport } = useThree();
  const w = viewport.width;

  // scaled hero board y pos
  const heroBaseY =
    viewport.height / 2 - pxToWorld(HERO_Y_OFFSET_PX, viewport.height) - 0.5;
  const projectsBaseY = 0;
  const REF_W = 14;

  // section breakpoints
  const heroEnd = 0.05;
  const projectsEnd = 0.95;

  // board x disatcne from centre in sections
  const heroX = -w * 0.26;
  const projectsX = w * 0.22;
  const contactX =
    -viewport.width / 2.35 + pxToWorld(CONTACT_X_OFFSET_PX, viewport.height);

  // anims
  useFrame(({ clock }, dt) => {
    if (!boardGroup.current || !boardGroup.current) return;

    const { width } = viewport;
    const scale = width / REF_W;
    /* label size & offset relative to board */
    projectsLabelRef.current?.scale.setScalar(scale * 0.4);
    heroLabelRef.current?.scale.setScalar(scale * 0.4);

    boardGroup.current.scale.setScalar(scale);

    // time trackers
    boardAnimTime.current += dt;
    idleTime.current += dt;

    const scrollY = scroll.offset;
    const inHero = scrollY < heroEnd;
    const inProjects = scrollY >= heroEnd && scrollY < projectsEnd;
    (window as any).inProjects = inProjects;
    const inContact = scrollY >= projectsEnd;

    // Tablets wait after spinning / active project set
    if (inProjects && !wasInProjects.current) {
      (window as any).section2EntryTime = clock.getElapsedTime();

      setTimeout(() => {
        (window as any).setActiveProject?.("KeyDocs");
      }, 350);
      idleTime.current = 0;
    } else if (!inProjects && wasInProjects.current) {
      delete (window as any).section2EntryTime;
      (window as any).resetActiveProject?.();
    }

    wasInProjects.current = inProjects;

    projectsLabelRef.current!.visible = inProjects;
    heroLabelRef.current!.visible = inHero;
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

    boardGroup.current.rotation.x = THREE.MathUtils.damp(
      boardGroup.current.rotation.x,
      targetTiltX,
      3,
      dt
    );

    // spin board targets
    let YTarget = boardGroup.current.rotation.y;
    if (inProjects) YTarget = spinTargetY;
    else if (inHero) YTarget = 0;
    else if (inContact) YTarget = 0;

    // ease to default y orientation
    boardGroup.current.rotation.y = THREE.MathUtils.damp(
      boardGroup.current.rotation.y,
      YTarget,
      4,
      dt
    );

    // fuckass check for sonic Tablet
    if (
      !hasSpun.current &&
      Math.abs(boardGroup.current.rotation.y - spinTargetY) < 0.05
    ) {
      hasSpun.current = true;
    }

    // idle anim
    const LIFT_Y_UNITS = 0.5;
    let ZTarget = boardGroup.current.rotation.z;

    if (inProjects) {
      const fade = THREE.MathUtils.clamp(idleTime.current / 2, 0, 1);
      const liftY = LIFT_Y_UNITS * fade;
      const bobY = Math.sin(idleTime.current * 1.8) * 0.035 * fade;
      const yawAdd = projectSpinRate * dt * fade;
      ZTarget =
        Math.sin(idleTime.current * 1.6) * THREE.MathUtils.degToRad(1) * fade;

      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        projectsBaseY + liftY + bobY,
        4,
        dt
      );

      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        1,
        4,
        dt
      );

      boardGroup.current.rotation.y += yawAdd;
    } else {
      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        heroBaseY,
        4,
        dt
      );
    }

    boardGroup.current.rotation.z = THREE.MathUtils.damp(
      boardGroup.current.rotation.z,
      ZTarget,
      4,
      dt
    );

    if (!inContact) {
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        inProjects ? projectsX : heroX,
        4,
        dt
      );
    }

    if (inHero) {
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        0,
        2,
        dt
      );
    }

    // board pos
    // -- X --
    if (!inContact) {
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
        0,
        1,
        dt
      );
    }

    // stick board to contact
    if (inContact && anchorRef.current) {
      // lock scaling
      boardGroup.current.scale.setScalar(scale);

      // contact destination
      const targetY =
        -viewport.height / 2 + pxToWorld(CONTACT_Y_OFFSET_PX, viewport.height);
      const targetZ = 0.5;
      const targetX = contactX;

      // anims to fixed pos
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        targetX,
        2,
        dt
      );
      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        targetY,
        4,
        dt
      );
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        targetZ,
        4,
        dt
      );

      // contact rotations
      boardGroup.current.rotation.x = THREE.MathUtils.damp(
        boardGroup.current.rotation.x,
        1.35,
        1,
        dt
      );
      boardGroup.current.rotation.z = THREE.MathUtils.damp(
        boardGroup.current.rotation.z,
        THREE.MathUtils.degToRad(180),
        4,
        dt
      );
    }
  });

  return (
    <group ref={boardWrapper}>
      {/* board + label rotate together */}
      <group ref={boardGroup} position={[0, -0.4, 0]}>
        <TabletBoard
          currentSection={
            scroll.offset < heroEnd
              ? "hero"
              : scroll.offset < projectsEnd
              ? "projects"
              : "contact"
          }
          activeProject={activeProject}
        />

        <Text
          ref={projectsLabelRef as any}
          font="/fonts/Monts/Montserrat-ExtraBold.ttf"
          fontSize={2.35}
          lineHeight={4}
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#ffffff"
          rotation={[-Math.PI / 2, 45, Math.PI / 2]} // flat on board
          position={[1.8, 0.8, 0]}
        >
          PROJECTS
        </Text>

        <Text
          ref={heroLabelRef as any}
          font="/fonts/Monts/Montserrat-ExtraBold.ttf"
          fontSize={2.35}
          lineHeight={4}
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#ffffff"
          fillOpacity={0}
          material-transparent
          material-depthWrite={false}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
          position={[-3.7, 0.2, 0]}
        >
          SKILLS
        </Text>
      </group>

      <Text position={[0, 0, -50]} fontSize={0.1}>
        init
      </Text>
    </group>
  );
}

export default function App() {
  const [userOverride, setUserOverride] = useState<string>("");
  const anchorRef = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);
  const [pages, setPages] = useState(3);

  useEffect(() => {
    const recalculate = () => {
      const sectionHeights = 800 + 800 + 340;
      setPages(sectionHeights / window.innerHeight);
    };

    recalculate();
    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, []);

  // unselect project
  useEffect(() => {
    (window as any).resetActiveProject = () => setUserOverride("");
    (window as any).setActiveProject = (project: string) =>
      setUserOverride(project);
  }, []);

  const activeProject = userOverride;

  useEffect(() => {
    if (!userOverride || isHovering) return;

    const projectNames = ["KeyDocs", "Carer Manager Plus", "SmartBoard"];
    const nextTimer = setTimeout(() => {
      const currentIndex = projectNames.indexOf(userOverride);
      const nextIndex = (currentIndex + 1) % projectNames.length;
      (window as any).setActiveProject?.(projectNames[nextIndex]);
    }, 3500);

    return () => clearTimeout(nextTimer);
  }, [userOverride, isHovering]);

  type ProjectName = "KeyDocs" | "Carer Manager Plus" | "SmartBoard";
  const projectCycle: ProjectName[] = [
    "KeyDocs",
    "Carer Manager Plus",
    "SmartBoard",
  ];

  const projectColours: Record<ProjectName, [string, string, string]> = {
    KeyDocs: ["#2b79d7", "#0541F8", "#5ECBFF"],
    "Carer Manager Plus": ["#e67e22", "#bf5700", "#FFE0B2"],
    SmartBoard: ["#d32f2f", "#a40000", "#ff6f61"],
  };

  return (
    <div className="page-root">
      <StarFieldCanvas />
      <div className="canvas-column">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 50 }}
          gl={{ powerPreference: "low-power", antialias: false }}
          dpr={[1, Math.min(window.devicePixelRatio, 1.5)]}
        >
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 10, 5]} intensity={4} />
          <directionalLight
            position={[-20, -4, 4]}
            intensity={1}
            color={"#e0e0ff"}
          />

          <Stats />

          <ScrollControls pages={pages}>
            <ScrollScene activeProject={activeProject} anchorRef={anchorRef} />
            <Scroll html>
              <div className="content-shell">
                <section className="hero">
                  <h1 className="hero-name">Jack Sydenham</h1>

                  <div className="hero-role">
                    <span className="full">FULL</span>
                    <span className="stack">STACK</span>
                  </div>
                </section>

                <section className="projects">
                  {projectCycle.map((project) => {
                    const [c1, c2, c3] = projectColours[project];
                    return (
                      <div
                        key={project}
                        className={`project-card ${
                          activeProject === project ? "active" : ""
                        }`}
                        style={
                          {
                            "--c1": c1,
                            "--c2": c2,
                            "--c3": c3,
                          } as React.CSSProperties
                        }
                        onMouseEnter={() => {
                          if (!(window as any).inProjects) return;
                          setUserOverride(project);
                          setIsHovering(true);
                        }}
                        onMouseLeave={() => {
                          setUserOverride(activeProject);
                        }}
                      >
                        <h3>{project}</h3>
                      </div>
                    );
                  })}
                </section>

                <section className="contact">
                  <div className="l-frame">
                    <div className="l-corner tl" />
                    <div className="l-corner tr" />
                    <div className="l-corner bl" />
                    <div className="l-corner br" />
                  </div>
                  <div className="contact-box">contact form coming soon…</div>
                </section>
                <section className="board-anchor">
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
