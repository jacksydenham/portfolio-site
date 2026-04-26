import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import { useRef } from "react";
import TabletBoard from "./TabletBoard";
import {
  HERO_LABEL_POS,
  PROJECT_LABEL_POS,
  BOARD_REF_WIDTH_UNITS,
} from "../config/config";
import { useBoardAnimation } from "../hooks/useBoardAnimation";

interface ScrollSceneProps {
  activeProject: string;
  anchorRef: React.RefObject<HTMLDivElement | null>;
  setActiveTriggers: (t: string[] | null) => void;
  setHoveredTabletName: (name: string | null) => void;
}

export default function ScrollScene({
  activeProject,
  anchorRef,
  setActiveTriggers,
  setHoveredTabletName,
}: ScrollSceneProps) {
  const boardGroup = useRef<THREE.Group>(null);
  const projectsLabelRef = useRef<THREE.Mesh>(null);
  const heroLabelRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const { inHero, inProjects, pxToWorld } = useBoardAnimation(
    boardGroup,
    anchorRef
  );

  const scale = viewport.width / BOARD_REF_WIDTH_UNITS;

  // Position labels relative to the board
  const updateLabelVisibility = () => {
    if (projectsLabelRef.current) {
      projectsLabelRef.current.visible = inProjects;
      projectsLabelRef.current.position.set(
        (pxToWorld(PROJECT_LABEL_POS.x) * 0.8) / scale,
        (pxToWorld(PROJECT_LABEL_POS.y) * 0.8) / scale,
        0
      );
    }
    if (heroLabelRef.current) {
      heroLabelRef.current.visible = inHero;
      heroLabelRef.current.position.set(
        (pxToWorld(HERO_LABEL_POS.x) * 0.8) / scale,
        (pxToWorld(HERO_LABEL_POS.y) * 0.8) / scale,
        0
      );
    }
  };

  // We call this in the render cycle for simple reactive updates
  updateLabelVisibility();

  return (
    <group ref={boardGroup}>
      <TabletBoard
        currentSection={
          inHero ? "hero" : inProjects ? "projects" : "contact"
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
        scale={0.4}
        rotation={[-Math.PI / 2, 45, Math.PI / 2]}
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
        scale={0.4}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        SKILLS
      </Text>
    </group>
  );
}
