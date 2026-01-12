"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Environment, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < breakpoint);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoint]);

  return isMobile;
}

function Model() {
  const { scene } = useGLTF("/models/hero.glb");
  const ref = useRef<THREE.Group>(null);

  const isMobile = useIsMobile();

  // Store initial rotation (original pose)
  const initialRot = useRef(new THREE.Euler(0, 0, 0));

  // tracks last time mouse moved
  const lastMoveTime = useRef<number>(performance.now());
  const prevMouse = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!ref.current) return;

    // ✅ MOBILE: infinite auto rotate, no interaction
    if (isMobile) {
      ref.current.rotation.y += delta * 0.6; // speed
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.08);
      return;
    }

    // ✅ DESKTOP: mouse-follow rotation
    const mx = state.mouse.x;
    const my = state.mouse.y;

    // detect mouse movement
    const moved =
      Math.abs(mx - prevMouse.current.x) > 0.0005 ||
      Math.abs(my - prevMouse.current.y) > 0.0005;

    if (moved) {
      lastMoveTime.current = performance.now();
      prevMouse.current = { x: mx, y: my };
    }

    const idleForMs = performance.now() - lastMoveTime.current;

    if (idleForMs > 1000) {
      // ✅ If idle > 1.5s: smoothly return to original rotation
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        initialRot.current.x,
        0.06
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        initialRot.current.y,
        0.06
      );
    } else {
      // ✅ follow mouse while active
      const targetY = mx * 0.7;
      const targetX = -my * 0.35;

      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.08);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.08);
    }
  });

  return <primitive ref={ref} object={scene} />;
}

export default function HeroModel() {
  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // ✅ transparent bg
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="city" />

        <Bounds fit clip observe margin={2.8}>
          <Model />
        </Bounds>
      </Canvas>
    </div>
  );
}
