import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, OrbitControls, Preload, useFBX } from "@react-three/drei";
import CanvasLoader from "../loader";

const Avatar = ({ isMobile }: { isMobile: boolean }) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/player.gltf");
  const fbx = useFBX("/standing-greeting.fbx");
  const animations = fbx.animations;
  animations[0].name = "greeting";
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions["greeting"]) {
      actions["greeting"].timeScale = 1.3;
      actions["greeting"].play();
    }
  }, [actions, animations]);

  useFrame(() => {
    if (group.current) {
      group.current.position.y = isMobile ? -2.5 : -3.2;
    }
  });

  return (
    <primitive
      object={scene}
      ref={group}
      scale={isMobile ? 4.2 : 3.5}
      position={[0, isMobile ? -2.5 : -3.2, 0]}
      rotation={[0, -0.6, 0]}
    />
  );
};

const AvatarCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event: any) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      camera={{
        position: isMobile ? [0, 1, 7] : [0, 0, 14],
        fov: isMobile ? 50 : 40,
      }}
      gl={{ preserveDrawingBuffer: true }}
      className="cursor-pointer"
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* On mobile: disable all orbit controls so man stays fixed */}
        <OrbitControls
          enableZoom={false}
          enableRotate={!isMobile}
          enablePan={!isMobile}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0.2, 0]}
        />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight
          position={[-10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <Avatar isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default AvatarCanvas;
