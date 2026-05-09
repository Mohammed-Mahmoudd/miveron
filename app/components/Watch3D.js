"use client";

import { useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls, Float } from "@react-three/drei";

// Suppress the THREE.Clock deprecation warning coming from R3F internals
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
    originalWarn(...args);
  };
}

function WatchModel() {
  const watchRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    const t = time.current;
    if (watchRef.current) {
      // Gentle floating rotation
      watchRef.current.rotation.y = Math.sin(t / 4) / 4;
      watchRef.current.rotation.x = Math.cos(t / 4) / 8;
      
      // Animate second hand
      const secondHand = watchRef.current.children.find((c) => c.name === "secondHand");
      if (secondHand) secondHand.rotation.z = -t * (Math.PI / 30);
      
      // Animate minute hand (slower)
      const minuteHand = watchRef.current.children.find((c) => c.name === "minuteHand");
      if (minuteHand) minuteHand.rotation.z = -t * (Math.PI / 1800);
    }
  });

  return (
    <group ref={watchRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={1.2}>
      {/* CASE (Main Body) */}
      <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.4, 0.3, 64]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* BEZEL (Outer Ring) */}
      <mesh position={[0, 0.15, -0.1]} castShadow receiveShadow>
        <torusGeometry args={[1.45, 0.1, 32, 64]} />
        <meshStandardMaterial color="#222222" metalness={1} roughness={0.05} />
      </mesh>

      {/* DIAL (Face) */}
      <mesh position={[0, 0.16, -0.1]} receiveShadow>
        <cylinderGeometry args={[1.4, 1.4, 0.02, 64]} />
        <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
      </mesh>

      {/* HOUR MARKS (Ticks) */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i * Math.PI) / 6) * 1.2, 
            0.18, 
            Math.cos((i * Math.PI) / 6) * 1.2 - 0.1
          ]} 
          rotation={[0, -(i * Math.PI) / 6, 0]}
        >
          <boxGeometry args={[0.04, 0.02, 0.2]} />
          <meshStandardMaterial color={i % 3 === 0 ? "#D4AF37" : "#555"} metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* CROWN (Side Knob) */}
      <mesh position={[1.55, 0, -0.1]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 32]} />
        <meshStandardMaterial color="#333333" metalness={1} roughness={0.2} />
      </mesh>

      {/* STRAP (Top & Bottom) */}
      <mesh position={[0, -0.1, -1.9]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 2.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.1, 1.7]} rotation={[-Math.PI / 2.2, 0, 0]} castShadow>
        <boxGeometry args={[1.2, 0.15, 2.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>

      {/* WATCH HANDS */}
      {/* Hour Hand */}
      <mesh position={[0, 0.20, -0.1]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.08, 0.02, 1.0]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Minute Hand */}
      <mesh name="minuteHand" position={[0, 0.22, -0.1]}>
        <boxGeometry args={[0.05, 0.02, 1.6]} />
        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
      </mesh>

      {/* Second Hand */}
      <mesh name="secondHand" position={[0, 0.24, -0.1]}>
        <boxGeometry args={[0.02, 0.02, 1.8]} />
        <meshStandardMaterial color="#ff3333" metalness={0.2} roughness={0.5} />
      </mesh>

      {/* Center Pin */}
      <mesh position={[0, 0.26, -0.1]}>
        <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
      </mesh>
      
      {/* GLASS (Crystal) */}
      <mesh position={[0, 0.30, -0.1]}>
        <cylinderGeometry args={[1.45, 1.45, 0.05, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          opacity={1}
          transparent
          roughness={0}
          ior={1.5}
          thickness={0.5}
        />
      </mesh>
    </group>
  );
}

export default function Watch3D() {
  return (
    <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0, zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: "#000000" }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2.5} castShadow />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <WatchModel />
          </Float>
        </PresentationControls>

        <Environment preset="city" />
        <ContactShadows position={[0, -2, -2]} opacity={0.6} scale={10} blur={2.5} far={4} />
      </Canvas>
    </div>
  );
}
