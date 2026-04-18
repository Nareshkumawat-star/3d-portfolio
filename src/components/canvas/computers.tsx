import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import CanvasLoader from "../loader";

type ComputersProps = {
  isMobile: boolean;
  isTablet: boolean;
};

// Computers
const Computers = ({ isMobile, isTablet }: ComputersProps) => {
  // Import scene
  const computer = useGLTF("./desktop_pc/scene.gltf");

  return (
    // Mesh
    <mesh>
      {/* Light */}
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.42 : isTablet ? 0.55 : 0.75}
        position={isMobile ? [0, -3.5, -1.0] : isTablet ? [0, -3.4, -1.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

// Computer Canvas
const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
      setIsTablet(window.innerWidth > 500 && window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{
        position: isMobile || isTablet ? [0, 1, 15] : [20, 3, 5],
        fov: isMobile || isTablet ? 50 : 25,
      }}
      gl={{ preserveDrawingBuffer: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Canvas Loader show on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
        />
        {/* Show Model */}
        <Computers isMobile={isMobile} isTablet={isTablet} />
      </Suspense>

      {/* Preload all */}
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
