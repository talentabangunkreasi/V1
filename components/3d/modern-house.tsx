'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'

function SimpleHouse({ isDarkMode }: { isDarkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  const wallColor = isDarkMode ? '#1a1a2e' : '#f0f0f0'
  const roofColor = isDarkMode ? '#2d2d44' : '#555555'
  const windowColor = isDarkMode ? '#ffdd44' : '#87ceeb'
  const groundColor = isDarkMode ? '#1a2a1a' : '#3a8a3a'

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.35}>
      {/* Ground - simple circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.8, 0]}>
        <circleGeometry args={[2.5, 12]} />
        <meshBasicMaterial color={groundColor} />
      </mesh>

      {/* Main house body */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[2, 1.4, 1.5]} />
        <meshBasicMaterial color={wallColor} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[2.3, 0.15, 1.8]} />
        <meshBasicMaterial color={roofColor} />
      </mesh>

      {/* Second floor */}
      <mesh position={[-0.2, 1.5, 0]}>
        <boxGeometry args={[1.4, 0.9, 1.5]} />
        <meshBasicMaterial color={wallColor} />
      </mesh>

      {/* Second roof */}
      <mesh position={[-0.2, 2.1, 0]}>
        <boxGeometry args={[1.6, 0.12, 1.7]} />
        <meshBasicMaterial color={roofColor} />
      </mesh>

      {/* Windows - front */}
      <mesh position={[0.4, 0.4, 0.76]}>
        <boxGeometry args={[0.6, 0.5, 0.02]} />
        <meshBasicMaterial color={windowColor} transparent opacity={isDarkMode ? 0.9 : 0.6} />
      </mesh>

      {/* Door */}
      <mesh position={[-0.4, 0.1, 0.76]}>
        <boxGeometry args={[0.4, 0.7, 0.02]} />
        <meshBasicMaterial color="#654321" />
      </mesh>

      {/* Second floor window */}
      <mesh position={[-0.2, 1.5, 0.76]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <meshBasicMaterial color={windowColor} transparent opacity={isDarkMode ? 0.9 : 0.6} />
      </mesh>

      {/* Simple lighting */}
      <ambientLight intensity={isDarkMode ? 0.5 : 1} />
      <directionalLight 
        position={[3, 5, 3]} 
        intensity={isDarkMode ? 0.3 : 0.8} 
        color={isDarkMode ? '#6688ff' : '#ffffff'}
      />
    </group>
  )
}

export function ModernHouse3D() {
  const { isDarkMode } = useAppStore()
  
  return (
    <div className="relative size-full min-h-[250px]">
      <Canvas
        camera={{ position: [3, 2, 3], fov: 35 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
        dpr={1}
      >
        <SimpleHouse isDarkMode={isDarkMode} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
      
      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
    </div>
  )
}
