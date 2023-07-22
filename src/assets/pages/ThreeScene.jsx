import { React, useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const sceneRef = useRef();
  useEffect(() => {
    //scene
    const scene = new THREE.Scene();

    // geometry
    const geometry = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({  color: 0x00ff00 });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // size
    const size = {
      width: innerWidth,
      height: innerHeight,                                                                                                                                
    };

    //LIGHT
    const light = new THREE.PointLight(0xffffff,1,100)
    light.position.set(10,10,10)
    scene.add(light);
    // camera
    const camera = new THREE.PerspectiveCamera(
      70,
      size.width / size.height,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.width, size.height);
    sceneRef.current.appendChild(renderer.domElement);

    camera.position.z = 20;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();
    
  }, []);
  return (
    <>
      <div ref={sceneRef} />
    </>
  );
}
