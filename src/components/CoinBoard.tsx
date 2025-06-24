import Board from "./Board";
import { coinMeta } from "./coinData";
import CoinInstance from "./CoinInstance";
import { useRef, useLayoutEffect, useState } from "react";
import * as THREE from "three";

export default function CoinBoard() {
  const boardRef = useRef<THREE.Mesh>(null);
  const [gaps, setGaps] = useState<{ gapX: number; gapY: number } | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const cols = 6;
  const rows = 4;

  useLayoutEffect(() => {
    if (!boardRef.current) return;
    const box = new THREE.Box3().setFromObject(boardRef.current);
    const width = box.max.x - box.min.x;
    const height = box.max.z - box.min.z; // Z axis = board depth

    setGaps({
      gapX: (width / (cols - 1)) * 0.8,
      gapY: (height / (rows - 1)) * 0.8,
    });
  }, []);

  return (
    <group>
      <Board ref={boardRef} position={[0, 0, 0]} scale={0.75} />
      {gaps &&
        coinMeta.map(({ name, categories, gridX, gridY }) => {
          const x = (gridX - (cols - 1) / 2) * gaps.gapX;
          const z = (gridY - (rows - 1) / 2) * gaps.gapY;
          const isHovered =
            hoveredCategory !== null && categories.includes(hoveredCategory);

          return (
            <CoinInstance
              key={name}
              name={name}
              position={[x, 0.4, z]}
              scale={0.75}
              categories={categories}
              isHovered={isHovered}
              setHoveredCategory={setHoveredCategory}
            />
          );
        })}
    </group>
  );
}
