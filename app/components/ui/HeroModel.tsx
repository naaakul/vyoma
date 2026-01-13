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

  const initialRot = useRef(new THREE.Euler(9, 5, 9));

  const lastMoveTime = useRef<number>(performance.now());
  const prevMouse = useRef({ x: 0, y: 0 });

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;
    ref.current.rotation.copy(initialRot.current);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const onMove = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [isMobile]);

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (isMobile) {
      ref.current.rotation.y += delta * 0.6;
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.08);
      return;
    }

    const mx = mouse.current.x;
    const my = mouse.current.y;

    const moved =
      Math.abs(mx - prevMouse.current.x) > 0.0005 ||
      Math.abs(my - prevMouse.current.y) > 0.0005;

    if (moved) {
      lastMoveTime.current = performance.now();
      prevMouse.current = { x: mx, y: my };
    }

    const idleForMs = performance.now() - lastMoveTime.current;

    if (idleForMs > 1000) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, initialRot.current.x, 0.06);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, initialRot.current.y, 0.06);
    } else {
      const targetY = mx * 0.7;
      const targetX = -my * 0.35;

      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetY, 0.08);
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, targetX, 0.08);
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[1.5, 1.2, 0]}
    />
  );
}


export default function HeroModel() {
  return (
    <div className="w-96 h-[25rem] inset-0 z-50 ">
      <Canvas
        camera={{ position: [-1, -0.5, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <Environment preset="city" />

        <Bounds fit clip observe margin={1.2}>
          <Model />
        </Bounds>
      </Canvas>
    </div>
  );
}
