import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// === Globe Setup ===
const container = document.getElementById('globe-container');
const scene = new THREE.Scene();
scene.background = null; // transparent

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Earth texture
const textureLoader = new THREE.TextureLoader();
const earthMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const earthSpecular = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
const earthNormal = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
const cloudMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

// Globe
const globeGeometry = new THREE.SphereGeometry(2.5, 64, 64);
const globeMaterial = new THREE.MeshPhongMaterial({
  map: earthMap,
  specularMap: earthSpecular,
  specular: new THREE.Color('grey'),
  shininess: 10,
  normalMap: earthNormal,
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Clouds
const cloudGeometry = new THREE.SphereGeometry(2.53, 64, 64);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: cloudMap,
  transparent: true,
  opacity: 0.3,
  blending: THREE.AdditiveBlending,
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

// Stars background
const starsGeometry = new THREE.BufferGeometry();
const starsCount = 800;
const starsPositions = new Float32Array(starsCount * 3);
for (let i = 0; i < starsCount * 3; i += 3) {
  starsPositions[i] = (Math.random() - 0.5) * 600;
  starsPositions[i+1] = (Math.random() - 0.5) * 400;
  starsPositions[i+2] = (Math.random() - 0.5) * 200 - 50;
}
starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));
const starsMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.25});
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// Controls (disable zoom and pan to keep simple)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  clouds.rotation.y += 0.0005;
  globe.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// === Theme Toggle ===
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  // Save preference
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

// Hamburger menu (placeholder)
document.querySelector('.hamburger').addEventListener('click', () => {
  alert('مینو دێ بەرێ ڤەکرنێ ڤەبیت - ئێمە ل سەر کارین');
});