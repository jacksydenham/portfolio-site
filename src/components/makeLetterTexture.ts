// components/makeLetterTexture.ts
import * as THREE from "three";

// Skip the cache (for debugging only)
export function makeLetterTexture(letter: string): THREE.Texture {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.clearRect(0, 0, size, size);

  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size * 0.48, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.textAlign = "right";
  ctx.font = "bold 160px 'Bebas Neue', sans-serif";
  ctx.fillText(letter, size - 350, size - 320);

  return new THREE.CanvasTexture(canvas);
}

