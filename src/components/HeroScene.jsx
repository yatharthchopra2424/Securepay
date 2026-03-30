import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const coreGeometry = new THREE.TorusKnotGeometry(1, 0.3, 140, 20);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x08d9b6,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x084b43,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(core);

    const haloGeometry = new THREE.RingGeometry(1.8, 2.05, 64);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8a3d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    halo.rotation.x = 1.2;
    scene.add(halo);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambient);

    const point = new THREE.PointLight(0xffffff, 2.5, 20);
    point.position.set(4, 3, 6);
    scene.add(point);

    const particleCount = 300;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xb3fff3,
      size: 0.03,
      transparent: true,
      opacity: 0.8,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let frameId;
    const animate = () => {
      core.rotation.x += 0.004;
      core.rotation.y += 0.006;
      halo.rotation.z += 0.003;
      particles.rotation.y += 0.0008;
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(frameId);
      coreGeometry.dispose();
      coreMaterial.dispose();
      haloGeometry.dispose();
      haloMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-scene" ref={mountRef} aria-hidden="true" />;
}
