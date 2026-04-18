import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import CanvasLoader from "../loader";

// Earth
const Earth = ({ isMobile }: { isMobile: boolean }) => {
  // import earth scene
  const earth = useGLTF("./planet/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 1.8 : 2.5}
      position-y={0}
      rotation-y={0}
    />
  );
};

// Earth Canvas
const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is Mobile
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      frameloop="demand"
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: isMobile ? [-4, 2, 8] : [-4, 3, 6],
      }}
      gl={{ preserveDrawingBuffer: true, alpha: true, powerPreference: "high-performance" }}
    >
      {/* Suspense show Canvas Loader on fallback */}
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          autoRotateSpeed={2.5}
          enableDamping={true}
          dampingFactor={0.05}
        />

        {/* Earth */}
        <Earth isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
