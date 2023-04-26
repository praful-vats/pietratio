import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import * as THREE from 'three';

function Sphere() {
  const [ref, api] = useBox(() => ({ mass: 1, position: [0,5,0] }));

  const handleKeyDown = (event) => {
    const { keyCode } = event;
    if (keyCode === 37) {
      // left arrow
      api.applyImpulse([-5, 0, 0], [0, 0, 0]);
    } else if (keyCode === 38) {
      // up arrow
      api.applyImpulse([0, 0, -5], [0, 0, 0]);
    } else if (keyCode === 39) {
      // right arrow
      api.applyImpulse([5, 0, 0], [0, 0, 0]);
    } else if (keyCode === 40) {
      // down arrow
      api.applyImpulse([0, 0, 5], [0, 0, 0]);
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  useFrame(() => {
    if (ref.current) {
      const velocity = ref.current.velocity;
      if (velocity && Math.abs(velocity.x) < 0.1) {
        velocity.x = 0;
      }
      if (velocity && Math.abs(velocity.z) < 0.1) {
        velocity.z = 0;
      }
    }
  });
  return (
    <mesh ref={ref} position={[0,5,0]}>
       <sphereBufferGeometry args={[5, 32, 32]} attach="geometry" />
       <meshStandardMaterial color="#ccaa88" attach="material" />
     </mesh>
  );
}

function Plane() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh  rotation={[-Math.PI / 2, 0, 0]}>
       <primitive object={new THREE.GridHelper(400, 400, 0xFFFFFF, 0xFFFFFF)} position={[0,-5.09,0]} rotation={[Math.PI / 10, 0, 0]} />
     </mesh>
  );
}

function CameraPosition() {
  const { camera } = useThree();
  camera.position.set(0, 50, 20); // set camera position inside the sphere
  return null;
}

export default function Ball() {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <Physics>
          <Sphere />
          <Plane /> 
        </Physics>
        <CameraPosition />
      </Canvas>
    </>
  );
}
