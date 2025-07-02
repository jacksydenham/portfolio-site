/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
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
import toast, { Toaster } from "react-hot-toast";
import { curatedGroups, type CuratedGroup } from "./skillGroups";
import { TabletMeta } from "./components/TabletData";
import {
  BOARD_REF_WIDTH_UNITS,
  CONTACT_Y_OFFSET_PX,
  HERO_LABEL_POS,
  HERO_Y_OFFSET_PX,
  PROJECT_LABEL_POS,
  SCROLL_BREAKS,
} from "./config/config";

function ScrollScene({
  activeProject,
  anchorRef,
  showPreview,
  setActiveTriggers,
  setHoveredTabletName,
}: {
  activeProject: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  showPreview: boolean;
  setActiveTriggers: (t: string[] | null) => void;
  setHoveredTabletName: (name: string | null) => void;
}) {
  const pxToWorld = (px: number) => (px / window.innerHeight) * viewport.height;

  const boardWrapper = useRef<THREE.Group>(null);
  const boardGroup = useRef<THREE.Group>(null);
  const projectsLabelRef = useRef<THREE.Mesh>(null);
  const heroLabelRef = useRef<THREE.Mesh>(null);
  const boardAnimTime = useRef(0);
  const idleTime = useRef(0);
  const previewRef = useRef<THREE.Mesh>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [opacity] = useState(0);

  const spinTargetY = Math.PI * 1.2;
  const projectSpinRate = THREE.MathUtils.degToRad(15);
  const wasInProjects = useRef(false);

  const slideTextures = useLoader(THREE.TextureLoader, [
    "/textures/mgs3.png",
    "/textures/aintnoway.png",
  ]);
  slideTextures.forEach((t) => {
    t.flipY = false;
    t.colorSpace = THREE.SRGBColorSpace;
  });

  const scroll = useScroll();

  // window w/h track
  const { viewport } = useThree();
  const w = viewport.width;

  // scaled hero board y pos
  const heroBaseY = viewport.height / 2 - pxToWorld(HERO_Y_OFFSET_PX) - 0.55;
  const projectsBaseY = 0;

  // board x disatcne from centre in sections
  const heroX = -w * 0.26;
  const projectsX = w * 0.165;
  const contactX = w * -0.282;

  // anims
  useFrame(({ clock }, dt) => {
    if (!boardGroup.current || !boardGroup.current) return;

    const { width } = viewport;
    const scale = width / BOARD_REF_WIDTH_UNITS;

    projectsLabelRef.current?.scale.setScalar(0.4);
    heroLabelRef.current?.scale.setScalar(0.4);
    projectsLabelRef.current?.position.set(
      pxToWorld(PROJECT_LABEL_POS.x) / scale,
      pxToWorld(PROJECT_LABEL_POS.y) / scale,
      0
    );
    heroLabelRef.current?.position.set(
      pxToWorld(HERO_LABEL_POS.x) / scale,
      pxToWorld(HERO_LABEL_POS.y) / scale,
      0
    );

    boardGroup.current.scale.setScalar(scale);

    // time trackers
    boardAnimTime.current += dt;
    idleTime.current += dt;

    const scrollY = scroll.offset;
    const inHero = scrollY < SCROLL_BREAKS.heroEnd;
    const inProjects =
      scrollY >= SCROLL_BREAKS.heroEnd && scrollY < SCROLL_BREAKS.projectsEnd;
    (window as any).inProjects = inProjects;
    (window as any).inHero = inHero;
    const inContact = scrollY >= SCROLL_BREAKS.projectsEnd;

    // Tablets wait after spinning / active project set
    if (inProjects && !wasInProjects.current) {
      (window as any).section2EntryTime = clock.getElapsedTime();

      setTimeout(() => {
        (window as any).setActiveProject?.("KeyDocs");
      }, 100);
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
    } else if (boardAnimTime.current < 2) {
      const t = boardAnimTime.current / 2;
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
        1.75,
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
        1,
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
        -viewport.height / 2 + pxToWorld(CONTACT_Y_OFFSET_PX) + 0.32;
      const targetZ = 0.4;
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
        -THREE.MathUtils.degToRad(180),
        4,
        dt
      );
    }

    // project images opacity
    if (previewRef.current) {
      const mat = previewRef.current.material as THREE.MeshStandardMaterial;

      // fade opacity
      const targetOpacity = activeProject === "KeyDocs" ? 1 : 0;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, targetOpacity, 4, dt);

      // update texture if changed
      if (mat.map !== slideTextures[currentSlide]) {
        mat.map = slideTextures[currentSlide];
        mat.needsUpdate = true;
      }
    }
  });

  useEffect(() => {
    if (activeProject !== "KeyDocs") return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideTextures.length);
    }, 4000); // change every 4s

    return () => clearInterval(interval);
  }, [activeProject, slideTextures.length]);

  return (
    <group ref={boardWrapper}>
      <group ref={boardGroup} position={[2, heroBaseY, 0]}>
        <TabletBoard
          currentSection={
            scroll.offset < SCROLL_BREAKS.heroEnd
              ? "hero"
              : scroll.offset < SCROLL_BREAKS.projectsEnd
              ? "projects"
              : "contact"
          }
          activeProject={activeProject}
          setActiveTriggers={setActiveTriggers}
          setHoveredTabletName={setHoveredTabletName}
        />

        {showPreview && (
          <group>
            <mesh
              position={[0, 1.4, 2.2]}
              rotation={[Math.PI * 2, Math.PI * 2, Math.PI]}
              ref={previewRef}
            >
              <planeGeometry args={[4, 2]} />
              <meshStandardMaterial
                side={THREE.DoubleSide}
                metalness={0.9}
                roughness={0.8}
                transparent
                opacity={opacity}
              />
            </mesh>
          </group>
        )}

        <Text
          ref={projectsLabelRef as any}
          font="/fonts/Monts/Montserrat-ExtraBold.ttf"
          fontSize={1.35}
          lineHeight={4}
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#ccc"
          color="#ccc"
          rotation={[-Math.PI / 2, 45, Math.PI / 2]} // flat on board
        >
          PROJECTS
        </Text>

        <Text
          ref={heroLabelRef as any}
          font="/fonts/Monts/Montserrat-ExtraBold.ttf"
          fontSize={1.35}
          lineHeight={4}
          anchorX="center"
          anchorY="top"
          outlineWidth={0.02}
          outlineColor="#ccc"
          fillOpacity={0}
          material-transparent
          material-depthWrite={false}
          rotation={[-Math.PI / 2, 0, Math.PI / 2]}
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
  const [showPreview, setShowPreview] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [activeTriggers, setActiveTriggers] = useState<string[] | null>(null);
  const [curated, setCurated] = useState<CuratedGroup[]>([]);
  const [hoveredTabletName, setHoveredTabletName] = useState<string | null>(
    null
  );
  
  // const [hasHovered, setHasHovered] = useState(false);
  // const funFacts = [
  //   "💀 I have a 2.6 GPA!!",
  //   "😛 I'm a fraud",
  //   "👨‍🦯 0 classs/lectures attended in 2024, 8 distinctions.",
  //   "🤠 I can't sustain a healthy relationship",
  //   "🎧 My go-to coding soundtrack is raw backshots 10 hours.",
  // ];
  // const [factIndex, setFactIndex] = useState(0);
  // 
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setFactIndex((i) => (i + 1) % funFacts.length);
  //   }, 4000); // switch every 4s
  //   return () => clearInterval(timer);
  // }, [funFacts.length]);

  useEffect(() => {
    const recalculate = () => {
      const sectionHeights = 800 + 800 + 380;
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
    }, 3000);

    return () => clearTimeout(nextTimer);
  }, [userOverride, isHovering]);

  // typa shit they actually teach at uni WOW!
  useEffect(() => {
    const inHero = (window as any).inHero;
    if (!activeTriggers || !inHero) {
      setCurated([]);
      return;
    }

    const activeNames = TabletMeta.filter((t) =>
      t.categories.some((c) => activeTriggers.includes(c))
    ).map((t) => t.name);

    const matches = curatedGroups.filter((g) =>
      g.items.every((n) => activeNames.includes(n))
    );

    const hoveredMeta = hoveredTabletName
      ? TabletMeta.find((t) => t.name === hoveredTabletName)
      : null;

    let final: CuratedGroup[];
    if (hoveredMeta) {
      const primary = curatedGroups.find(
        (g) => g.title === hoveredMeta.primarySkill,
        // setHasHovered(true)
      );
      if (primary) {
        final = [primary, ...matches.filter((g) => g.title !== primary.title)];
      } else {
        final = matches;
      }
    } else {
      final = matches;
    }

    setCurated(final);
  }, [activeTriggers, hoveredTabletName]);

  type ProjectName = "KeyDocs" | "Carer Manager Plus" | "SmartBoard";
  const projectCycle: ProjectName[] = [
    "KeyDocs",
    "Carer Manager Plus",
    "SmartBoard",
  ];

  const projectColours: Record<ProjectName, [string, string, string]> = {
    KeyDocs: ["#2b79d7", "#0541F8", "#5ECBFF"],
    "Carer Manager Plus": ["#e67e22", "#bf5700", "#FFE0B2"],
    SmartBoard: [
      "var(--theme-color)",
      "var(--theme-color)",
      "var(--theme-color)",
    ],
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in every field.");
      return;
    }

    const btn = e.currentTarget;
    btn.classList.add("glow-animate");
    toast.success("Message sent!");

    setTimeout(() => {
      btn.classList.remove("glow-animate");
    }, 2000);
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
            <ScrollScene
              activeProject={activeProject}
              anchorRef={anchorRef}
              showPreview={showPreview}
              setActiveTriggers={setActiveTriggers}
              setHoveredTabletName={setHoveredTabletName}
            />
            <Scroll html>
              <div className="content-shell">
                <section className="hero">
                  <h1 className="hero-name">Jack Sydenham</h1>

                  <div className="hero-role">
                    <span className="full">FULL</span>
                    <span className="stack">STACK</span>
                  </div>

                  <div className="skills-info-box">
                    {curated.length > 0 ? (
                      <>
                        {/* primary group */}
                        <h3 className="skills-info-heading">
                          {curated[0].title}
                        </h3>
                        <p className="skills-info-text">{curated[0].blurb}</p>

                        {/* supplementary groups */}
                        {curated.slice(1).map((g) => (
                          <div key={g.title} className="skills-supplementary">
                            <h4 className="skills-supp-heading">{g.title}</h4>
                            <p className="skills-supp-text">{g.blurb}</p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div>
                          <h2 className="skills-info-heading">About Me</h2>

                          <p className="skills-info-text">
                            I'm a final-year Software Engineering student at
                            RMIT and Full Stack Developer. During my first
                            professional role at Astral Consulting, I mastered
                            integrating complex environments, combining multiple
                            custom react web apps with a sharepoint automation
                            processes built in Power Automate. I thrive on
                            weaving AI-driven features into modern web
                            applications. I excel in agile teams, taking
                            end-to-end ownership to ship production-ready
                            software.
                          </p>
                        </div>
                        {/* {hasHovered === false ? ( */}
                          <div className="hint-card">
                            Hover over icons to explore my skills!
                          </div>
                        {/* ) : (
                          <div className="hint-card next-step">
                            <span key={factIndex} className="fun-fact">
                              {funFacts[factIndex]}
                            </span>
                          </div>
                        )} */}
                      </>
                    )}
                  </div>
                </section>

                <section className="projects">
                  <button
                    onClick={() => setShowPreview((prev) => !prev)}
                    className="image-toggle"
                  >
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </button>
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
                          setUserOverride(project);
                        }}
                      >
                        <div className="card-header">
                          <h3 className="card-title">{project}</h3>
                          {project === "KeyDocs" && (
                            <span className="card-subtitle">Astral IP</span>
                          )}
                        </div>{" "}
                        {project === "KeyDocs" && (
                          <ul className="card-desc">
                            <li>
                              Purpose: end-to-end doc control
                              <ul>
                                <li>
                                  Convert any file → PDF, stamp revision footer
                                </li>
                                <li>
                                  Enforce version sequence & retention rules
                                </li>
                              </ul>
                            </li>
                            <li>
                              SharePoint integration
                              <ul>
                                <li>
                                  Stores PDFs in version-controlled libraries
                                </li>
                                <li>Surfaced via custom SPFx web-parts</li>
                              </ul>
                            </li>
                            <li>
                              Stack
                              <ul>
                                <li>React / Next.js UI (Shadcn components)</li>
                                <li>tRPC + Zod for type-safe API validation</li>
                                <li>Prisma ORM ↔ Dataverse tables</li>
                              </ul>
                            </li>
                            <li>
                              Workflow automation
                              <ul>
                                <li>
                                  Power Automate triggers on upload & approval
                                </li>
                                <li>Email alerts & audit logging</li>
                              </ul>
                            </li>
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </section>

                <section className="contact">
                  {/* Left: contact card frame */}
                  <div className="l-frame">
                    <div className="l-corner tl" />
                    <div className="l-corner tr" />
                    <div className="l-corner bl" />
                    <div className="l-corner br" />
                  </div>

                  {/* Right: contact form */}
                  <div className="contact-box">
                    <div className="contact-heading">
                      <h2>Contact Me</h2>
                      <p>
                        {`This form will send me an email and I'll be in touch!`}
                      </p>
                    </div>
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        style: {
                          margin: "16px",
                          background: "#111",
                          color: "#fff",
                          border: "1px solid #333",
                        },
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                      rows={4}
                      placeholder="Your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="form-actions">
                      <button type="submit" onClick={handleClick}>
                        Send
                      </button>
                    </div>
                  </div>
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
