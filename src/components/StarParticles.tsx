import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function StarFieldCanvas({
  spawnRate = 0.000003,
  maxSpeed = 20,
  maxSize = 2.5,
}: {
  spawnRate?: number;
  maxSpeed?: number;
  maxSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stars = useRef<Star[]>([]);
  const raf = useRef<number | null>(null);
  const spawnAcc = useRef(0);

  /* ── off-screen dot sprite ── */
  const sprite = useRef<HTMLCanvasElement | null>(null);
  if (!sprite.current) {
    const s = document.createElement("canvas");
    s.width = 10;
    s.height = 10;
    const g = s.getContext("2d")!;
    g.fillStyle = "#fff";
    g.beginPath();
    g.arc(5, 5, 5, 0, Math.PI * 2);
    g.fill();
    sprite.current = s;
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const spawnStar = (w: number, h: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = maxSpeed * (0.5 + Math.random() * 0.3);
      stars.current.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 4 + Math.random() * 3,
        size: 0.5 + Math.random() * maxSize,
      });
    };

    let last = performance.now();
    const targetDt = 1 / 30;
    let accumulator = 0;

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      accumulator += dt;

      const { width: w, height: h } = canvas;
      const want = w * h * spawnRate * dt;
      spawnAcc.current += want;
      while (spawnAcc.current >= 1) {
        spawnStar(w, h);
        spawnAcc.current -= 1;
      }

      if (accumulator >= targetDt) {
        accumulator -= targetDt;

        ctx.clearRect(0, 0, w, h);

        stars.current = stars.current.filter((s) => {
          s.life += dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;

          const fadeInDur = 0.5;
          const fadeOutDur = 0.8;

          const fadeIn = Math.min(s.life / fadeInDur, 1);
          const fadeOut =
            1 - Math.max((s.life - (s.maxLife - fadeOutDur)) / fadeOutDur, 0);
          const alpha = fadeIn * fadeOut;

          if (alpha <= 0) return false;
          ctx.globalAlpha = alpha;

          const d = s.size;
          ctx.drawImage(sprite.current!, s.x - d / 2, s.y - d / 2, d, d);

          return s.x > -50 && s.x < w + 50 && s.y > -50 && s.y < h + 50;
        });
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", setSize);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [spawnRate, maxSpeed, maxSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -2,
        pointerEvents: "none",
        background: "#000",
      }}
    />
  );
}
