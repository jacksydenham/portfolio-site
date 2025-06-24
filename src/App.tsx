import { Canvas } from "@react-three/fiber";
import "./App.css";
import Coin from "./components/Coin";
import { Environment, OrbitControls } from "@react-three/drei";

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 4, 2]} intensity={1.2} castShadow />

      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
      >
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.2} />
      </mesh>

      <Coin position={[0, 0, 0]} />
      <OrbitControls />
      <Environment preset="studio" />
    </Canvas>
  );
}

export default App;
