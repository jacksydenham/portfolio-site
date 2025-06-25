import Board from "./Board";
import { coinMeta } from "./coinData";
import CoinInstance from "./CoinInstance";
import { useRef, useLayoutEffect, useState } from "react";
import * as THREE from "three";

export default function CoinBoard({
  currentSection,
  activeProject,
}: {
  currentSection: "hero" | "projects";
  activeProject: string;
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
      gapX: (width / (cols - 1)) * 0.75,
      gapY: (height / (rows - 1)) * 0.75,
    });
  }, []);

  return (
    <group>
      <Board ref={boardRef} position={[0, 0, 0]} scale={0.6} />
      {gaps &&
        coinMeta.map(({ name, categories, gridX, gridY, projects }) => {
          const isHovered =
            currentSection === "hero"
              ? hoveredCategory !== null && categories.includes(hoveredCategory)
              : projects?.includes(activeProject) ?? false;

          return (
            <CoinInstance
              key={name}
              name={name}
              position={[
                (gridX - (cols - 1) / 2) * gaps.gapX,
                0.4,
                (gridY - (rows - 1) / 2) * gaps.gapY,
              ]}
              scale={0.75}
              categories={categories}
              isHovered={isHovered}
              setHoveredCategory={
                currentSection === "hero" ? setHoveredCategory : undefined
              }
            />
          );
        })}
    </group>
  );
}
