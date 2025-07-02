import Board from "./Board";
import { TabletMeta } from "./TabletData";
import TabletInstance from "./TabletInstance";
import { useRef, useLayoutEffect, useState } from "react";
import * as THREE from "three";

export default function TabletBoard({
  currentSection,
  activeProject,
  setActiveTriggers,
  setHoveredTabletName,
}: {
  currentSection: "hero" | "projects" | "contact";
  activeProject: string;
  setActiveTriggers: (t: string[] | null) => void;  
  setHoveredTabletName: (name: string | null) => void;
}) {
  const boardRef = useRef<THREE.Mesh>(null);
  const [gaps, setGaps] = useState<{ gapX: number; gapY: number } | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const cols = 6;
  const rows = 4;

  useLayoutEffect(() => {
    if (!boardRef.current) return;
    const box = new THREE.Box3().setFromObject(boardRef.current);
    const width = box.max.x - box.min.x;
    const height = box.max.z - box.min.z;

    setGaps({
      gapX: (width / (cols - 1)) * 0.78,
      gapY: (height / (rows - 1)) * 0.68,
    });
  }, []);

  return (
    <group>
      <Board ref={boardRef} position={[0, 0, 0]} scale={1.5} />
      {gaps &&
        TabletMeta.map(({ name, categories, triggers, gridX, gridY, projects }) => {
          const isHovered =
            currentSection === "hero"
              ? hoveredCategory !== null && categories.includes(hoveredCategory)
              : projects?.includes(activeProject) ?? false;

          return (
            <TabletInstance
              key={name}
              name={name}
              position={[
                (gridX - (cols - 1) / 2) * gaps.gapX,
                0.15,
                (gridY - (rows - 1) / 2) * gaps.gapY,
              ]}
              currentSection={currentSection}
              scale={0.25}
              categories={categories}
              triggers={triggers}
              isHovered={isHovered}
              setHoveredCategory={
                currentSection !== "projects" ? setHoveredCategory : undefined
              }
              setActiveTriggers={setActiveTriggers}
              setHoveredTabletName={setHoveredTabletName}
            />
          );
        })}
    </group>
  );
}
