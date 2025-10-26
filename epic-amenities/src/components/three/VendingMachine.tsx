'use client';

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import type { Group, Mesh, MeshStandardMaterial } from "three";
import { Color } from "three";

interface VendingMachineCanvasProps {
  accent?: string;
  baseColor?: string;
  autoRotate?: boolean;
  height?: number;
}

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t |= 0;
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticlesData(count: number, seed = 1337) {
  const random = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const x = (random() - 0.5) * 10;
    const y = random() * 6 - 1;
    const z = (random() - 0.5) * 8;
    const scale = 0.05 + random() * 0.12;
    const speed = 0.005 + random() * 0.01;
    return { position: [x, y, z] as [number, number, number], scale, speed };
  });
}

function Machine(props: { accent: string; baseColor: string }) {
  const group = useRef<Group>(null);
  const screen = useRef<Mesh>(null);
  const accentColor = useMemo(() => new Color(props.accent), [props.accent]);
  const baseColor = useMemo(() => new Color(props.baseColor), [props.baseColor]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
    }
    if (screen.current) {
      const material = screen.current.material as MeshStandardMaterial | MeshStandardMaterial[] | undefined;
      const targetMaterial = Array.isArray(material) ? material[0] : material;
      if (targetMaterial?.emissive) {
        targetMaterial.emissive.set(accentColor.clone().multiplyScalar(0.55));
        targetMaterial.emissiveIntensity = 1.6;
      }
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[2.4, 3.8, 1.5]} />
        <meshStandardMaterial color={baseColor} metalness={0.3} roughness={0.4} />
      </mesh>

      <mesh position={[0.9, 1.5, 0.76]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.4, 2.9, 0.1]} />
        <meshStandardMaterial color={accentColor} metalness={0.2} roughness={0.2} />
      </mesh>

      <mesh position={[0, 1.6, 0.78]} ref={screen}>
        <boxGeometry args={[1.6, 2.6, 0.08]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[-0.95, 1.2, 0.77]}>
        <boxGeometry args={[0.35, 1.6, 0.1]} />
        <meshStandardMaterial color={accentColor.clone().lerp(new Color("#ffffff"), 0.6)} />
      </mesh>

      <mesh position={[0, 3.1, 0.7]}>
        <boxGeometry args={[2.4, 0.5, 0.3]} />
        <meshStandardMaterial color={baseColor.clone().offsetHSL(0, 0, -0.12)} roughness={0.6} />
      </mesh>

      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[2.45, 0.4, 1.55]} />
        <meshStandardMaterial color={baseColor.clone().offsetHSL(0, 0, -0.15)} roughness={0.7} />
      </mesh>

      <mesh position={[0, -0.65, 0.96]}>
        <boxGeometry args={[1.8, 0.08, 0.08]} />
        <meshStandardMaterial color={accentColor} metalness={0.4} roughness={0.1} />
      </mesh>

      <mesh position={[0, 0, 0.78]}>
        <torusGeometry args={[0.35, 0.03, 12, 40]} />
        <meshStandardMaterial color={accentColor.clone().offsetHSL(-0.02, 0, 0.15)} metalness={0.8} roughness={0.15} />
      </mesh>

      <mesh position={[0, -1.6, 0]}>
        <boxGeometry args={[2.8, 0.2, 1.8]} />
        <meshStandardMaterial color={"#111827"} roughness={0.7} />
      </mesh>
    </group>
  );
}

const PARTICLE_DATA = createParticlesData(420, 1847);

function Particles() {
  const particles = useMemo(() => PARTICLE_DATA, []);

  const refs = useRef<(Mesh | null)[]>([]);

  useFrame(() => {
    refs.current.forEach((mesh, index) => {
      if (!mesh) return;
      mesh.position.y += (particles[index].speed ?? 0.01);
      if (mesh.position.y > 4) {
        mesh.position.y = -2;
      }
    });
  });

  return (
    <group>
      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) {
              refs.current[index] = el;
            }
          }}
          position={particle.position}
        >
          <sphereGeometry args={[particle.scale, 16, 16]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function VendingMachineCanvas({
  accent = "#f59e0b",
  baseColor = "#2563eb",
  autoRotate = false,
  height = 480,
}: VendingMachineCanvasProps) {
  return (
    <Canvas
      shadows
      className="rounded-[32px] bg-transparent"
      style={{ height }}
    >
      <color attach="background" args={["transparent"]} />
      <fog attach="fog" args={["#0f172a", 10, 28]} />
      <PerspectiveCamera makeDefault position={[6, 4, 7]} fov={42} />
      <directionalLight
        position={[4, 8, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.5} />
      <Float
        speed={2.2}
        rotationIntensity={0.6}
        floatIntensity={0.75}
      >
        <Machine accent={accent} baseColor={baseColor} />
      </Float>
      <Particles />
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.65, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
      <Environment preset="night" />
      {autoRotate && (
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1.2}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.8}
        />
      )}
    </Canvas>
  );
}

export function InspectMachineCanvas({
  accent = "#f59e0b",
  baseColor = "#2563eb",
  height = 420,
}: VendingMachineCanvasProps) {
  return (
    <Canvas
      shadows
      className="rounded-[24px] bg-[#040510]"
      style={{ height }}
    >
      <color attach="background" args={["#040510"]} />
      <PerspectiveCamera makeDefault position={[5, 3.4, 6]} fov={44} />
      <directionalLight position={[4, 7, 5]} intensity={1.4} castShadow />
      <ambientLight intensity={0.6} />
      <Machine accent={accent} baseColor={baseColor} />
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.6, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <shadowMaterial transparent opacity={0.35} />
      </mesh>
      <Environment preset="night" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
