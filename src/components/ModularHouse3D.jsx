
import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Procedural luxury modular house — OPTIMIZED
 * - Pauses rendering when scrolled out of viewport
 * - Lower DPR cap (1.5 instead of 2) — big perf win on Retina displays
 * - No expensive shadow maps (uses cheap ContactShadows instead)
 * - Simpler glass material (no transmission)
 * - Lower-poly decorative meshes
 */
function HouseMesh({ scrollRef }) {
  const group = useRef()
  const baseRotation = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return
    baseRotation.current += delta * 0.18
    const scrollOffset = scrollRef?.current ?? 0
    group.current.rotation.y = baseRotation.current + scrollOffset * 0.5
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  const concreteMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#F7F4EE', roughness: 0.85, metalness: 0.05 }),
    []
  )
  const darkMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#0A1628', roughness: 0.7, metalness: 0.1 }),
    []
  )
  const goldMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#C9A961', roughness: 0.25, metalness: 0.85 }),
    []
  )
  const glassMat = useMemo(
    () => new THREE.MeshStandardMaterial({
      color: '#162A4A',
      roughness: 0.1,
      metalness: 0.4,
      transparent: true,
      opacity: 0.55,
    }),
    []
  )
  const woodMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#6B562A', roughness: 0.8, metalness: 0.02 }),
    []
  )

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[5.5, 0.12, 3.6]} />
        <primitive object={darkMat} attach="material" />
      </mesh>
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[5.6, 0.02, 3.65]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      <group position={[0, 0.5, 0]}>
        <mesh>
          <boxGeometry args={[4.5, 1.1, 2.8]} />
          <primitive object={concreteMat} attach="material" />
        </mesh>
        <mesh position={[1.4, 0, 1.41]}>
          <boxGeometry args={[1.6, 1.05, 0.02]} />
          <primitive object={woodMat} attach="material" />
        </mesh>
        <mesh position={[-0.8, 0, 1.42]}>
          <boxGeometry args={[2.4, 0.9, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        <mesh position={[2.26, 0, 0]}>
          <boxGeometry args={[0.03, 0.9, 1.6]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        <mesh position={[-1.8, -0.15, 1.42]}>
          <boxGeometry args={[0.6, 0.8, 0.03]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[-1.58, -0.15, 1.43]}>
          <boxGeometry args={[0.03, 0.1, 0.02]} />
          <primitive object={goldMat} attach="material" />
        </mesh>
      </group>

      <group position={[-0.6, 1.65, 0]}>
        <mesh>
          <boxGeometry args={[3.6, 1, 2.6]} />
          <primitive object={darkMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.05, 1.31]}>
          <boxGeometry args={[3.2, 0.55, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
        <mesh position={[0, 0.05, -1.31]}>
          <boxGeometry args={[3, 0.45, 0.03]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
      </group>

      <mesh position={[-0.6, 2.2, 0]}>
        <boxGeometry args={[3.7, 0.08, 2.7]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[4.52, 0.04, 2.82]} />
        <primitive object={goldMat} attach="material" />
      </mesh>

      <mesh position={[1.9, 1.5, -1]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <primitive object={darkMat} attach="material" />
      </mesh>
      <mesh position={[1.9, 1.5, 1]}>
        <boxGeometry args={[0.12, 0.9, 0.12]} />
        <primitive object={darkMat} attach="material" />
      </mesh>

      <group position={[2.7, 0, 1.5]}>
        <mesh>
          <cylinderGeometry args={[0.04, 0.05, 0.5, 5]} />
          <meshStandardMaterial color="#4A3B1D" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.22, 6, 6]} />
          <meshStandardMaterial color="#2A3F66" roughness={0.8} />
        </mesh>
      </group>
    </group>
  )
}

function useInView(ref) {
  const [inView, setInView] = useState(true)
  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref])
  return inView
}

function useIsLowPower() {
  const [low, setLow] = useState(() => {
    if (typeof window === 'undefined') return false
    const coarse = window.matchMedia('(hover: none)').matches
    const small = window.innerWidth < 768
    return coarse || small
  })
  useEffect(() => {
    const onResize = () => {
      const coarse = window.matchMedia('(hover: none)').matches
      const small = window.innerWidth < 768
      setLow(coarse || small)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return low
}

/** Static SVG fallback — zero GPU cost, still on-brand */
function StaticHouseFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <svg
        viewBox="0 0 600 500"
        className="w-[85%] max-w-[520px] h-auto opacity-95"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse cx="300" cy="430" rx="220" ry="20" fill="#0A1628" opacity="0.12" />
        <rect x="80" y="390" width="440" height="16" fill="#0A1628" />
        <rect x="75" y="385" width="450" height="4" fill="#C9A961" />
        <rect x="100" y="280" width="400" height="110" fill="#F7F4EE" stroke="#0A1628" strokeWidth="1" />
        <rect x="340" y="285" width="150" height="100" fill="#6B562A" />
        <rect x="115" y="300" width="210" height="70" fill="#162A4A" opacity="0.7" />
        <line x1="185" y1="300" x2="185" y2="370" stroke="#0A1628" strokeWidth="0.5" />
        <line x1="255" y1="300" x2="255" y2="370" stroke="#0A1628" strokeWidth="0.5" />
        <rect x="140" y="330" width="40" height="55" fill="#0A1628" />
        <circle cx="173" cy="358" r="1.5" fill="#C9A961" />
        <rect x="95" y="276" width="410" height="4" fill="#C9A961" />
        <rect x="60" y="170" width="340" height="100" fill="#0A1628" />
        <rect x="80" y="200" width="300" height="40" fill="#162A4A" opacity="0.85" />
        <rect x="80" y="200" width="300" height="40" fill="none" stroke="#C9A961" strokeWidth="1" />
        <rect x="55" y="160" width="350" height="10" fill="#F7F4EE" />
        <rect x="395" y="270" width="8" height="120" fill="#0A1628" />
        <line x1="540" y1="390" x2="540" y2="350" stroke="#4A3B1D" strokeWidth="3" />
        <circle cx="540" cy="340" r="18" fill="#2A3F66" opacity="0.9" />
        <ellipse cx="140" cy="405" rx="50" ry="6" fill="#0A1628" opacity="0.4" />
      </svg>
    </div>
  )
}

export default function ModularHouse3D({ scrollRef, className = '' }) {
  const wrapRef = useRef(null)
  const inView = useInView(wrapRef)
  const isLowPower = useIsLowPower()

  if (isLowPower) {
    return (
      <div ref={wrapRef} className={className}>
        <StaticHouseFallback />
      </div>
    )
  }

  return (
    <div ref={wrapRef} className={className}>
      <Canvas
        frameloop={inView ? 'always' : 'never'}
        camera={{ position: [6, 3.5, 6.5], fov: 35 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        shadows={false}
      >
        <color attach="background" args={['transparent']} />
        <fog attach="fog" args={['#F7F4EE', 12, 22]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 10, 5]} intensity={1.5} />
        <directionalLight position={[-5, 4, -3]} intensity={0.4} color="#C9A961" />
        <pointLight position={[0, 3, 3]} intensity={0.3} color="#E8D5A8" />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <HouseMesh scrollRef={scrollRef} />
        </Float>

        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.4}
          scale={14}
          blur={2.2}
          far={5}
          resolution={256}
          color="#0A1628"
        />

        <Environment preset="sunset" resolution={64} />
      </Canvas>
    </div>
  )
}
