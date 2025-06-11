
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Environment } from '@react-three/drei';
import { Mesh } from 'three';

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#c9a961" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}

function FloatingScale() {
  const meshRef = useRef<Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[-2, 0, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
        <meshStandardMaterial color="#1e40af" />
      </mesh>
      <mesh position={[-0.4, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.3]} />
        <meshStandardMaterial color="#c9a961" />
      </mesh>
      <mesh position={[0.4, 0.8, 0]}>
        <boxGeometry args={[0.6, 0.1, 0.3]} />
        <meshStandardMaterial color="#c9a961" />
      </mesh>
    </group>
  );
}

export const Hero3D = () => {
  return (
    <div className="h-96 w-full">
      <Canvas camera={{ position: [0, 0, 6] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Center>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={0.5}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            ADVOCACIA
            <meshStandardMaterial color="#1e40af" />
          </Text3D>
        </Center>
        
        <RotatingCube />
        <FloatingScale />
        
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};
