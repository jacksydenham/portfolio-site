/* eslint-disable @typescript-eslint/no-explicit-any */
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import "@fontsource/bebas-neue/400.css";
import "./styles/App.css";

// Components
import StarFieldCanvas from "./components/Stars";
import MobileWarning from "./components/mobileWarning";
import TestimonialStrip from "./components/Testiomonials";
import ScrollScene from "./components/ScrollScene";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ShowcaseSection from "./components/ShowcaseSection";
import ContactSection from "./components/ContactSection";

// Data & Config
import { curatedGroups, type CuratedGroup } from "./data/skillGroups";
import { TabletMeta } from "./data/tabletData";
import { hHeight, pHeight, sHeight, cHeight } from "./config/config";

export default function App() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [showQrOverlay, setShowQrOverlay] = useState(false);
  const [pages, setPages] = useState(3);

  const [activeProject, setActiveProject] = useState<string>("");
  const [activeTriggers, setActiveTriggers] = useState<string[] | null>(null);
  const [curated, setCurated] = useState<CuratedGroup[]>([]);
  const [hoveredTabletName, setHoveredTabletName] = useState<string | null>(null);

  // Mobile detection
  useEffect(() => {
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (isMobile) setShowQrOverlay(true);
  }, []);

  // Calculate scroll pages
  useEffect(() => {
    const recalculate = () => {
      const totalPixels = hHeight + pHeight + sHeight + cHeight;
      setPages(totalPixels / window.innerHeight);
    };
    recalculate();

    window.addEventListener("resize", recalculate);
    return () => window.removeEventListener("resize", recalculate);
  }, []);

  // Window bridge for scroll events
  useEffect(() => {
    (window as any).resetActiveProject = () => setActiveProject("");
    (window as any).setActiveProject = (project: string) =>
      setActiveProject(project);
  }, []);

  // Skills curation logic
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
      );
      if (primary) {
        final = [
          primary,
          ...matches.filter((g) => g.title !== primary.title),
        ];
      } else {
        final = matches;
      }
    } else {
      final = matches;
    }

    setCurated(final);
  }, [activeTriggers, hoveredTabletName]);

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

          <ScrollControls pages={pages}>
            <ScrollScene
              activeProject={activeProject}
              anchorRef={anchorRef}
              setActiveTriggers={setActiveTriggers}
              setHoveredTabletName={setHoveredTabletName}
            />
            <Scroll html>
              <div className="content-shell">
                <HeroSection curated={curated} />

                <ProjectsSection
                  activeProject={activeProject}
                  setActiveProject={setActiveProject}
                />

                <ShowcaseSection />

                <TestimonialStrip />

                <ContactSection anchorRef={anchorRef} />
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>

      {showQrOverlay && <MobileWarning setShowQrOverlay={setShowQrOverlay} />}
    </div>
  );
}
