// components/CoinBoard.tsx
import { coinMeta } from "./coinData";
import CoinInstance from "./CoinInstance";

export default function CoinBoard() {
  // adjust gap to taste
  const gapX = 1.4;
  const gapY = 1.4;

  return (
    <group>
      {coinMeta.map(({ name, gridX, gridY }) => (
        <CoinInstance
          key={name}
          name={name}
          // board origin at (0,0,0) — shift coins into view
          position={[gridX * gapX - 3.5, -gridY * gapY + 2, 0]}
          scale={0.8}
        />
      ))}
    </group>
  );
}
