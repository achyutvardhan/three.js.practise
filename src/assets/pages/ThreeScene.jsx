import { React, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export default function ThreeScene() {
  const sceneRef = useRef();
  useEffect(() => {
    //scene
    const scene = new THREE.Scene();

    // geometry
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const planeGeometry = new THREE.PlaneGeometry(30,30);
    const planeMaterial = new THREE.MeshStandardMaterial({color: 'black',side : THREE.DoubleSide })
    const planeMesh =  new THREE.Mesh(planeGeometry,planeMaterial)
    scene.add(planeMesh);
    planeMesh.receiveShadow =true;
    planeMesh.rotation.x = -0.5*Math.PI;

    const sphereGeo = new THREE.SphereGeometry(4,50,50)
    const sphereMat = new THREE.MeshStandardMaterial({color: 'blue' })
    const Sphere = new THREE.Mesh(sphereGeo,sphereMat);
    scene.add(Sphere);
   Sphere.castShadow =true;

    const grid =  new THREE.GridHelper(30)
    scene.add(grid);
    // size
    const size = {
      width: innerWidth,
      height: innerHeight,
    };

    //LIGHT
    const light = new THREE.AmbientLight('white');
    light.position.set(10, 10, 10);
    scene.add(light);
    

    // const dLight =  new THREE.DirectionalLight(0xffff,0.8);
    // scene.add(dLight);
    // dLight.position.set(-30,50,0)
    // dLight.castShadow =true;
    // const dirHelper =  new THREE.DirectionalLightHelper(dLight,5);
    // scene.add(dirHelper);

    const spotLight = new THREE.SpotLight(0xfffff);
    scene.add(spotLight);
    spotLight.position.set(-100,100,0);
    spotLight.castShadow = true;
    spotLight.angle = 0.2;
    const spotHelper = new THREE.SpotLightHelper(spotLight)
    scene.add(spotHelper)
    
    //axes helper
    const axesHelper = new THREE.AxesHelper(15); // 5 is the length of the axis
    scene.add(axesHelper);



    // camera
    const camera = new THREE.PerspectiveCamera(
      45,
      size.width / size.height,
      0.1,
      1000
    );

    //fog
    scene.fog = new THREE.FogExp2('white',0.01)

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(size.width, size.height);
    sceneRef.current.appendChild(renderer.domElement);
     
    renderer.shadowMap.enabled =true;
    //orbit
    const orbit = new OrbitControls(camera, renderer.domElement);

    camera.position.set(-10, 30, 30);
    Sphere.position.set(-10,10,0);
    orbit.update();
  
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      Sphere.rotation.z +=0.04;
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
