"use client";

import { Component, type ReactNode, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { scrollState } from "@/lib/scrollState";

function Atmosphere() {
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    const p = scrollState.progress;
    camera.position.x = Math.sin(t * 0.07) * 0.12 + (p - 0.5) * 0.18;
    camera.position.y = 0.12 + Math.cos(t * 0.05) * 0.06;
    camera.position.z = 4.1 - p * 0.25;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 3.2, 9]} />
      <ambientLight intensity={0.12} />
      <spotLight
        position={[3.2, 3.4, 2.4]}
        intensity={18}
        color="#fff4ea"
        angle={0.5}
        penumbra={1}
      />
      <spotLight
        position={[-3.4, 1.2, -1.6]}
        intensity={22}
        color="#c81e3a"
        angle={0.55}
        penumbra={1}
      />
      <pointLight position={[0, -1.4, 2]} intensity={4} color="#ffffff" />
      <Sparkles
        count={48}
        scale={[9, 5, 4]}
        size={1.6}
        speed={0.12}
        opacity={0.28}
        color="#d45454"
      />
    </>
  );
}

class WebGLGuard extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function ProductScene() {
  const dpr = useMemo<[number, number]>(() => [1, 1.5], []);

  return (
    <WebGLGuard>
      <Canvas
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.15, 4.2], fov: 32 }}
      >
        <Atmosphere />
      </Canvas>
    </WebGLGuard>
  );
}
