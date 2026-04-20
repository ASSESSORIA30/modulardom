import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedural luxury modular house.
 * Two stacked cantilevered modules, glass facade, gold frame accents.
 */
function HouseMesh({ scrollRef }) {
  const group = useRef()
  const baseRotation = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return
    // Slow constant rotation + subtle breathing
    baseRotation.current += delta * 0.18
    const scrollOffset = scrollRef?.current ?? 0
    group.current.rotation.y = baseRotation.current + scrollOffset * 0.5
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  // Materials memoized
  const concreteMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#F7F4EE',
        roughness: 0.85,
        metalness: 0.05,
      }),
    []
  )
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#0A1628',
        roughness: 0.7,
        metalness: 0.1,
      }),
    []
  )
  const goldMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#C9A961',
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  )
  const glassMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#162A4A',
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        thickness: 0.3,
        ior: 1.4,
        transparent: true,
        opacity: 0.6,
      }),
    []
  )
  const woodMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#6B562A',
        roughness: 0.8,
        metalness: 0.02,
      }),
    []
  )

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Ground platform / foundation */}
      <mesh position={[0, -0.15, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.5, 0.12, 3.6]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      {/* Gold underline accent (plinth) */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[5.6, 0.02, 3.65]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* GROUND FLOOR MODULE (wider, darker wood + concrete) */}
      <group position={[0, 0.5, 0]}>
        {/* Main volume */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 1.1, 2.8]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        {/* Wood accent wall */}
        <mesh position={[1.4, 0, 1.41]}>
          <boxGeometry args={[1.6, 1.05, 0.02]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        {/* Large window front */}
        <mesh position={[-0.8, 0, 1.42]}>
          <boxGeometry args={[2.4, 0.9, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        {/* Window frame */}
        <mesh position={[-0.8, 0, 1.43]}>
          <boxGeometry args={[2.42, 0.92, 0.015]} />
          <meshStandardMaterial color="#0A1628" roughness={0.4} metalness={0.3} wireframe />
        </mesh>
        {/* Side window */}
        <mesh position={[2.26, 0, 0]}>
          <boxGeometry args={[0.03, 0.9, 1.6]} />
          <primitive object={glassMat} attach="material" />
        </mesh>

        {/* Door */}
        <mesh position={[-1.8, -0.15, 1.42]}>
          <boxGeometry args={[0.6, 0.8, 0.03]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[-1.58, -0.15, 1.43]}>
          <boxGeometry args={[0.03, 0.1, 0.02]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
      </group>

      {/* CANTILEVERED UPPER MODULE (offset, darker) */}
      <group position={[-0.6, 1.65, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.6, 1, 2.6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        {/* Long horizontal window */}
        <mesh position={[0, 0.05, 1.31]}>
          <boxGeometry args={[3.2, 0.55, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        {/* Gold frame around window */}
        <mesh position={[0, 0.05, 1.32]}>
          <boxGeometry args={[3.22, 0.57, 0.02]} />
          <meshStandardMaterial color="#C9A961" roughness={0.3} metalness={0.8} wireframe />
        </mesh>
        {/* Back window */}
        <mesh position={[0, 0.05, -1.31]}>
          <boxGeometry args={[3, 0.45, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
      </group>

      {/* ROOF */}
      <mesh position={[-0.6, 2.2, 0]} castShadow>
        <boxGeometry args={[3.7, 0.08, 2.7]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      {/* Gold line between floors (architectural reveal) */}
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[4.52, 0.04, 2.82]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      {/* Support columns (minimal) */}
      <mesh position={[1.9, 1.5, -1]} castShadow>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <primitive object={darkMat} attach="material" />
      </mesh>
      <mesh position={[1.9, 1.5, 1]} castShadow>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      {/* Small tree / plant for scale (stylized) */}
      <group position={[2.7, 0, 1.5]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.05, 0.5, 6]} />
          <meshStandardMaterial color="#4A3B1D" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.22, 8, 8]} />
          <meshStandardMaterial color="#2A3F66" roughness={0.8} />
        </mesh>
      </group>

      {/* Small pool / reflection pond */}
      <mesh position={[-2.5, -0.08, 0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 1.8]} />
        <meshPhysicalMaterial
          color="#0A1628"
          roughness={0}
          metalness={0}
          transmission={0.3}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
    </group>
  )
}

export default function ModularHouse3D({ scrollRef, className = '' }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [6, 3.5, 6.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#F7F4EE', 12, 22]} />

        <ambientLight intensity={0.35} />
        <directionalLight
          position={[8, 10, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <directionalLight position={[-5, 4, -3]} intensity={0.4} color="#C9A961" />
        <pointLight position={[0, 3, 3]} intensity={0.3} color="#E8D5A8" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <HouseMesh scrollRef={scrollRef} />
        </Float>

        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.45}
          scale={14}
          blur={2.5}
          far={5}
          color="#0A1628"
        />

        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
