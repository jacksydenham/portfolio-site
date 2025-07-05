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
  cHeight,
  CONTACT_Y_OFFSET_PX,
  HERO_LABEL_POS,
  HERO_Y_OFFSET_PX,
  hHeight,
  pHeight,
  PROJECT_LABEL_POS,
  SCROLL_BREAKS,
  sHeight,
} from "./config/config";
import ShowcaseCarousel from "./components/ShowcaseCarousel";
import { showcaseItems } from "./showcaseItems";
import TestimonialStrip from "./components/Testiomonials";
import emailjs from "@emailjs/browser";
import ProjectCard from "./components/ProjectCard";
import { projects } from "./projectData";

function ScrollScene({
  activeProject,
  anchorRef,
  setActiveTriggers,
  setHoveredTabletName,
}: {
  activeProject: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
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
  const showStartRef = useRef<number | null>(null);

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
  const projectsX = w * 0.18;
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
    const showcaseStart = SCROLL_BREAKS.projectsEnd;
    const showcaseEnd = SCROLL_BREAKS.showcaseEnd;
    const inShowcase = scrollY >= showcaseStart && scrollY < showcaseEnd;
    const inContact = scrollY >= SCROLL_BREAKS.showcaseEnd;

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
    if (inHero) {
      boardGroup.current.rotation.x = THREE.MathUtils.damp(
        boardGroup.current.rotation.x,
        targetTiltX,
        3,
        dt
      );
    }

    // spin board targets
    let YTarget = boardGroup.current.rotation.y;
    if (inProjects) YTarget = spinTargetY;
    else if (inHero) YTarget = 0;
    else if (inContact) YTarget = 6.28;

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

      boardGroup.current.rotation.x = THREE.MathUtils.damp(
        boardGroup.current.rotation.x,
        0.1,
        4,
        dt
      );

      boardGroup.current.rotation.y += yawAdd;
    } else if (inHero) {
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

    if (inHero || inProjects) {
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
        -1,
        1,
        dt
      );
    }

    // showcase anims
    if (inShowcase && boardGroup.current) {
      const elapsed = clock.getElapsedTime();

      if (showStartRef.current === null) {
        showStartRef.current = elapsed;
      }

      const sinceShow = Math.min(elapsed - showStartRef.current, 1);

      const initialSpeed = -1.6;
      const finalSpeed = -0.04;
      const t = sinceShow;
      const easeOutQuad = 1 - (1 - t) * (1 - t);
      const spinSpeed =
        initialSpeed + (finalSpeed - initialSpeed) * easeOutQuad;
      boardGroup.current.rotation.y += dt * spinSpeed;
      const targetPos = { x: 0.75, y: 0, z: 2 };
      boardGroup.current.position.x = THREE.MathUtils.damp(
        boardGroup.current.position.x,
        targetPos.x,
        4,
        dt
      );
      boardGroup.current.position.y = THREE.MathUtils.damp(
        boardGroup.current.position.y,
        targetPos.y,
        4,
        dt
      );
      boardGroup.current.position.z = THREE.MathUtils.damp(
        boardGroup.current.position.z,
        targetPos.z,
        4,
        dt
      );

      const targetRotX = 0;
      const targetRotZ = 0;
      boardGroup.current.rotation.x = THREE.MathUtils.damp(
        boardGroup.current.rotation.x,
        targetRotX,
        4,
        dt
      );
      boardGroup.current.rotation.z = THREE.MathUtils.damp(
        boardGroup.current.rotation.z,
        targetRotZ,
        4,
        dt
      );

      boardGroup.current.rotation.y += dt * spinSpeed;
    } else {
      showStartRef.current = null;
    }

    if (inContact && anchorRef.current) {
      boardGroup.current.scale.setScalar(scale);

      const targetY =
        -viewport.height / 2 + pxToWorld(CONTACT_Y_OFFSET_PX) + 0.32;
      const targetZ = 0.4;
      const targetX = contactX;

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
        1.25,
        2,
        dt
      );
      boardGroup.current.rotation.z = THREE.MathUtils.damp(
        boardGroup.current.rotation.z,
        THREE.MathUtils.degToRad(180),
        3,
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

  const [pages, setPages] = useState(3);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [activeTriggers, setActiveTriggers] = useState<string[] | null>(null);
  const [curated, setCurated] = useState<CuratedGroup[]>([]);
  const [hoveredTabletName, setHoveredTabletName] = useState<string | null>(
    null
  );

  useEffect(() => {
    const recalculate = () => {
      const totalPixels = hHeight + pHeight + sHeight + cHeight;
      setPages(totalPixels / window.innerHeight);
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
        (g) => g.title === hoveredMeta.primarySkill
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in every field.");
      return;
    }

    const form = e.currentTarget;
    const btn = form.querySelector("button");
    btn?.classList.add("glow-animate");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        {
          name,
          email,
          message,
          title: `Portfolio Contact: ${name}`,
          time: new Date().toLocaleString(),
          reply_to: email,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        toast.success("Message sent!");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        toast.error("Oops, something went wrong.");
        console.error("EmailJS error:", err.text || err);
      })
      .finally(() => {
        setTimeout(() => btn?.classList.remove("glow-animate"), 2000);
      });
  };

  function ContactButton() {
    const scrollData = useScroll();
    return (
      <a
        className="hero-btn hero-email"
        aria-label="Contact me"
        onClick={() =>
          scrollData.el.scrollTo({
            top: scrollData.el.scrollHeight,
            behavior: "auto",
          })
        }
      />
    );
  }

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
              setActiveTriggers={setActiveTriggers}
              setHoveredTabletName={setHoveredTabletName}
            />
            <Scroll html>
              <div className="content-shell">
                <section className="hero">
                  <div className="hero-heading">
                    <h1 className="hero-name">Jack Sydenham</h1>

                    {/* subtitle + action icons share one row */}
                    <div className="hero-subline">
                      <h2 className="hero-subtitle">
                        End-to-End Integrations&nbsp;&amp;&nbsp;Cloud Automation
                      </h2>

                      <div className="hero-links">
                        {/* Download résumé */}
                        <a
                          href="/Jack Sydenham FSD Resume 2025.pdf"
                          download
                          className="hero-btn hero-cv"
                        />

                        {/* GitHub */}
                        <a
                          href="https://github.com/JackSydenham"
                          target="_blank"
                          rel="noopener"
                          className="hero-btn hero-github"
                        />

                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/in/jack-sydenham-bb5a25284/"
                          target="_blank"
                          rel="noopener"
                          aria-label="LinkedIn"
                          className="hero-btn hero-linkedin"
                        />

                        <ContactButton />
                      </div>
                    </div>
                  </div>

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
                        <div className="hint-card">
                          Hover over icons to explore my skills!
                        </div>
                      </>
                    )}
                  </div>
                </section>

                <section className="projects">
                  {projects.map((proj) => (
                    <ProjectCard
                      key={proj.title}
                      data={proj}
                      isActive={activeProject === proj.title}
                      inProjects={Boolean((window as any).inProjects)}
                      onMouseEnter={() => setUserOverride(proj.title)}
                      onMouseLeave={() => setUserOverride(activeProject)}
                    />
                  ))}
                </section>

                <section className="showcase">
                  <h2 className="showcase-section-title">
                    Technical Highlights
                  </h2>
                  <ShowcaseCarousel items={showcaseItems} />
                </section>

                <TestimonialStrip />

                <section className="contact">
                  {/* Left: contact card frame */}
                  <div className="l-frame">
                    <div className="l-corner tl" />
                    <div className="l-corner tr" />
                    <div className="l-corner bl" />
                    <div className="l-corner br" />
                  </div>

                  {/* Right: contact form */}
                  <form className="contact-box" onSubmit={sendEmail}>
                    <div className="contact-heading">
                      <h2>Contact Me</h2>
                      <p>
                        {`Send me an email via this form and I'll be in touch!`}
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
                      placeholder="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="form-actions">
                      <button type="submit">Send</button>
                    </div>
                  </form>
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
