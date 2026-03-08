import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile } from "@/hooks/use-mobile";

function FloatingBlocks({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const isMobile = useIsMobile();
  const count = isMobile ? 150 : 450;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const sizeRoll = Math.random();
      let scale: number;
      if (sizeRoll < 0.4) scale = 0.04 + Math.random() * 0.08;
      else if (sizeRoll < 0.75) scale = 0.12 + Math.random() * 0.2;
      else if (sizeRoll < 0.92) scale = 0.3 + Math.random() * 0.5;
      else scale = 0.7 + Math.random() * 0.8;

      const spreadX = isMobile ? 18 : 30;
      const spreadY = isMobile ? 50 : 80;

      const colorRoll = Math.random();
      let color: THREE.Color;
      if (colorRoll < 0.3)
        color = new THREE.Color().setHSL(160 / 360, 0.7, 0.35 + Math.random() * 0.15);
      else if (colorRoll < 0.55)
        color = new THREE.Color().setHSL(170 / 360, 0.2, 0.3 + Math.random() * 0.15);
      else if (colorRoll < 0.8)
        color = new THREE.Color().setHSL(160 / 360, 0.1, 0.4 + Math.random() * 0.2);
      else
        color = new THREE.Color().setHSL(160 / 360, 0.84, 0.4 + Math.random() * 0.15);

      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spreadX,
          (Math.random() - 0.5) * spreadY,
          -5 + Math.random() * 10
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ),
        scale,
        speed: 0.08 + Math.random() * 0.25,
        rotSpeed: (Math.random() - 0.5) * 0.012,
        floatOffset: Math.random() * Math.PI * 2,
        color,
      });
    }
    temp.sort((a, b) => a.position.z - b.position.z);
    return temp;
  }, [count, isMobile]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorAttr = useMemo(() => {
    const colors = new Float32Array(count * 3);
    particles.forEach((p, i) => {
      colors[i * 3] = p.color.r;
      colors[i * 3 + 1] = p.color.g;
      colors[i * 3 + 2] = p.color.b;
    });
    return colors;
  }, [count, particles]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const mx = mouse.current.x;
    const my = mouse.current.y;

    particles.forEach((p, i) => {
      const parallaxFactor = (p.position.z + 3) / 6;
      const floatY = Math.sin(time * p.speed + p.floatOffset) * (0.2 + p.scale * 0.3);
      const floatX = Math.cos(time * p.speed * 0.7 + p.floatOffset) * (0.1 + p.scale * 0.15);

      dummy.position.set(
        p.position.x + floatX + mx * parallaxFactor * 0.6,
        p.position.y + floatY + my * parallaxFactor * 0.6,
        p.position.z
      );
      dummy.rotation.x = p.rotation.x + time * p.rotSpeed;
      dummy.rotation.y = p.rotation.y + time * p.rotSpeed * 1.4;
      dummy.rotation.z = p.rotation.z + time * p.rotSpeed * 0.6;
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("hsl(160, 30%, 35%)"),
        emissive: new THREE.Color("hsl(160, 60%, 15%)"),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.55,
        roughness: 0.3,
        metalness: 0.8,
        clearcoat: 0.4,
        side: THREE.DoubleSide,
      }),
    []
  );

  return (
    <instancedMesh ref={meshRef} args={[geometry, material, count]} frustumCulled={false}>
      <instancedBufferAttribute attach="instanceColor" args={[colorAttr, 3]} />
    </instancedMesh>
  );
}

function DotParticles({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = useIsMobile();
  const count = isMobile ? 80 : 250;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spreadX = isMobile ? 20 : 32;
    const spreadY = isMobile ? 50 : 80;
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spreadX;
      pos[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, [count, isMobile]);

  const basePositions = useRef(new Float32Array(positions));

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = positions[i3] + Math.sin(time * 0.2 + i * 0.5) * 0.15 + mouse.current.x * 0.08;
      arr[i3 + 1] = positions[i3 + 1] + Math.cos(time * 0.15 + i * 0.3) * 0.15 + mouse.current.y * 0.08;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={basePositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.04 : 0.03}
        color={new THREE.Color("hsl(160, 50%, 40%)")}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Syncs the Three.js camera Y position with the page scroll */
function ScrollTracker({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
  useFrame(({ camera }) => {
    // Map scroll pixels to 3D world units — adjust divisor to control parallax speed
    camera.position.y = -(scrollY.current / window.innerHeight) * 8;
  });
  return null;
}

function Scene({
  mouse,
  scrollY,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollY: React.MutableRefObject<number>;
}) {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2.0} color="hsl(160, 30%, 80%)" />
      <directionalLight position={[-3, -2, 4]} intensity={1.0} color="hsl(180, 40%, 70%)" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="hsl(160, 84%, 45%)" />
      <ScrollTracker scrollY={scrollY} />
      <FloatingBlocks mouse={mouse} />
      <DotParticles mouse={mouse} />
    </>
  );
}

const GlobalAnimatedBackground = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <Scene mouse={mouse} scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default GlobalAnimatedBackground;
