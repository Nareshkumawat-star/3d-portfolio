import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Preload, useFBX, Environment } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";

import CanvasLoader from "../loader";

const Avatar = ({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { scene, nodes } = useGLTF("/player.gltf") as any;
  const fbx = useFBX("/standing-greeting.fbx");
  const animations = fbx.animations;
  animations[0].name = "greeting";
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["greeting"]) {
      actions["greeting"].timeScale = 1.3;
      actions["greeting"].play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.y = isMobile ? -3.8 : -4.8;
    }

    // Head tracking logic
    // We target the head and neck bones to look at the mouse
    // Smooth head & neck rotation tracking with slightly reduced range to prevent clipping at large scales
    if (nodes.Head && nodes.Neck) {
      easing.dampE(
        nodes.Head.rotation,
        [state.pointer.y * 0.35, state.pointer.x * 0.5, 0], // Reduced influence for stability
        0.2, // Faster damping for smoother tracking
        delta
      );
      easing.dampE(
        nodes.Neck.rotation,
        [state.pointer.y * 0.15, state.pointer.x * 0.25, 0],
        0.2,
        delta
      );
    }
  });

  return (
    <primitive
      object={scene}
      ref={group}
      scale={isMobile ? 8.2 : isTablet ? 7.8 : 7.0} // Even larger scale
      position={[0, isMobile ? -5.8 : isTablet ? -6.2 : -6.8, 0]} // Adjusted Y for larger scale
      rotation={[0, -0.6, 0]}
    />
  );
};

const AvatarCanvas = () => {
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
      camera={{
        position: isMobile ? [0, 1.0, 7.5] : isTablet ? [0, 1.2, 12] : [0, 1, 14], // Closer camera for impactful view
        fov: isMobile ? 55 : isTablet ? 50 : 45,
      }}
      gl={{ preserveDrawingBuffer: true, alpha: true, powerPreference: "high-performance" }}
      className="w-full h-full cursor-pointer"
    >
      <Suspense fallback={<CanvasLoader />}>
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={isMobile ? [0, 1.8, 0] : isTablet ? [0, 1.6, 0] : [0, 1.5, 0]}
          enableDamping={true}
          dampingFactor={0.05}
        />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Avatar isMobile={isMobile} isTablet={isTablet} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default AvatarCanvas;
