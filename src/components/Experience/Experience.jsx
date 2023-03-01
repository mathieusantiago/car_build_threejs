import {
  Float,
  MeshReflectorMaterial,
  PresentationControls,
  Stage,
} from "@react-three/drei";
import React, { Suspense, useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useThree } from "@react-three/fiber";

const Experience = () => {
  const gltf = useLoader(GLTFLoader, "./scene.gltf");
  const { camera } = useThree();
  const gltfRef = useRef();

  useEffect(() => {
    const handleScroll = (event) => {
      const delta = event.deltaY;
      const zoomSpeed = 0.1;
      camera.position.z += delta * zoomSpeed;
    };
    

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [camera]);

  const handleKeyDown = (event) => {
    console.log(gltfRef.current.rotation);
    gltfRef.current.position.y = 0.48;
    const speed = 0.5;
    const currentPosition = gltfRef.current.position.clone();
    switch (event.key) {
      case "ArrowUp":
        gltfRef.current.position.setZ(currentPosition.z + speed);
        break;
      case "ArrowDown":
        gltfRef.current.position.setZ(currentPosition.z - speed);
        break;
      case "ArrowLeft":
        gltfRef.current.position.setX(currentPosition.x - speed);
        break;
      case "ArrowRight":
        gltfRef.current.rotation.setX(currentPosition.x + speed);
        break;
      default:
        break;
    }
  };

  return (
    <PresentationControls
      speed={1.5}
      global
      polar={[-0.1, Math.PI / 4]}
      rotation={[Math.PI / 8, Math.PI / 4, 0]}
    >
      <Stage environment="city" intensity={0.6} castShadow={false}>
        <Suspense fallback={null}>
          <primitive object={gltf.scene} ref={gltfRef} />
        </Suspense>
      </Stage>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh>
    </PresentationControls>
  );
};

export default Experience;
