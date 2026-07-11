import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// === Globe Setup ===
const container = document.getElementById('globe-container');
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const earthMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
const earthSpecular = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
const earthNormal = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg');
const cloudMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png');

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

const cloudGeometry = new THREE.SphereGeometry(2.53, 64, 64);
const cloudMaterial = new THREE.MeshPhongMaterial({
  map: cloudMap,
  transparent: true,
  opacity: 0.3,
  blending: THREE.AdditiveBlending,
});
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.6;

function animate() {
  requestAnimationFrame(animate);
  clouds.rotation.y += 0.0005;
  globe.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// === Theme Toggle ===
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

document.querySelector('.hamburger').addEventListener('click', () => {
  alert('مینو دێ بەرێ ڤەکرنێ ڤەبیت - ئێمە ل سەر کارین');
});

// === 50 Features Data & Logic ===
const fiftyFeatures = [
  { id:1, group:"neuro", icon:"🧠", title:"Neuro-Sync Dashboard", desc:"پانێلەکا ڕاستەوخۆ یا پێلێت مێشکی دەمێ فێربوونێ." },
  { id:2, group:"neuro", icon:"🎯", title:"Focus Guardian", desc:"دەمێ بالڤەدایی، دەرسێ ڕادوەستینیت و مینی-بڕێکا ئارامبوونێ ددەت." },
  { id:3, group:"neuro", icon:"📈", title:"Grammar Insight Pulse", desc:"تشخیصا ڕێزمانا گران و پێشنیازا بەرفرەهترکرنێ." },
  { id:4, group:"neuro", icon:"😊", title:"Emotion-Adaptive Vocabulary", desc:"پەیڤێت گونجایی ب گۆرەی رۆحێ تە." },
  { id:5, group:"neuro", icon:"😴", title:"Mental Fatigue Meter", desc:"ماندوویا مێشکی تشخیصدکەت و دەمێ ڤەساندنێ دیاردکەت." },
  { id:6, group:"neuro", icon:"🔮", title:"Subconscious Anchor", desc:"پەیڤێت بنەڕەت بێ ئاگاداری بەرێ مێشکی ددەت." },
  { id:7, group:"neuro", icon:"🌊", title:"Flow State Optimizer", desc:"هەردەم د ئاستێ 'هەلوەسینا هزرێ'دا بمێنیت." },
  { id:8, group:"neuro", icon:"📊", title:"Brain Performance Report", desc:"ڕاپۆرتا چالاکیا مێشکی پاشی هەر دانیشتنەکێ." },
  { id:9, group:"twin", icon:"👤", title:"Twin Avatar Creator", desc:"ئاڤاتارەکێ 3D-یێ هاوشێوەی تە ب زمانێ ئارمانج." },
  { id:10, group:"twin", icon:"🏙️", title:"Life Simulation Engine", desc:"توێ دیجیتال د ژیانا ڕۆژانەدا ب ڤیدیۆیێت 3D." },
  { id:11, group:"twin", icon:"👥", title:"Shadow Me Mode", desc:"توێ دیجیتال پەیڤێت تە دووبارەدکەت و بەحسدکەت." },
  { id:12, group:"twin", icon:"🌐", title:"Twin Social Network", desc:"توێت دیجیتال پێکڤە کارتێکرنێ دکەن." },
  { id:13, group:"twin", icon:"🪞", title:"Personality Mirror", desc:"کەسایەتییا تە ب زمانێ ئارمانج دووبارە دبیت." },
  { id:14, group:"twin", icon:"📈", title:"Progress Twin Comparison", desc:"پێشکەفتنا خۆ بەراوردکەی دگەل توێ خۆ." },
  { id:15, group:"twin", icon:"📔", title:"Twin Diary", desc:"یاداشتێت ڤیدیۆیی یێت توێ ب زمانێ ئارمانج." },
  { id:16, group:"twin", icon:"🌜", title:"Nightly Twin Recap", desc:"کرۆکیا ژیانا توێ ب شەڤ." },
  { id:17, group:"geno", icon:"🧬", title:"Ancestry Language Tree", desc:"دارا زمانێت باپیران ژ DNA یان مێژوویێ." },
  { id:18, group:"geno", icon:"🧪", title:"Genetic Learning Style", desc:"شێوازێ فێربوونێ ب گۆرەی جیناتێت تە ئۆپتیمایزدکەت." },
  { id:19, group:"geno", icon:"🏺", title:"Heritage Revival Quests", desc:"ئەرکێت گەشتا چاندی بۆ زمانێت باپیران." },
  { id:20, group:"geno", icon:"📉", title:"DNA-Based Difficulty Curve", desc:"منحەنییا گرانیێ ب گۆرەی جیناتێت تە." },
  { id:21, group:"geno", icon:"🎵", title:"Epigenetic Trigger Audio", desc:"مۆسیقایێت تایبەت کو جیناتێت زمانێ چالاکدکەن." },
  { id:22, group:"geno", icon:"🗺️", title:"Cultural Geno-Map", desc:"خەریتەیا 3D یا چاندێت باپیران." },
  { id:23, group:"geno", icon:"📜", title:"Personalized Language Recipe", desc:"ڕێبەرەکا زمانان ب گۆرەی پڕۆفایلا تە." },
  { id:24, group:"dream", icon:"🌌", title:"Dream Induction Soundscapes", desc:"دەنگێت باینۆڕاڵ بۆ ئامادەکرنا خەونێت زمان." },
  { id:25, group:"dream", icon:"🗝️", title:"Lucid Language Quest", desc:"ئەرکەکا زمانی د ناڤ خەونێدا." },
  { id:26, group:"dream", icon:"🌉", title:"Dream-to-Lesson Bridge", desc:"خەونێ دکەتە دەرسەکا ئینتەرئەکتیڤ." },
  { id:27, group:"dream", icon:"💤", title:"REM Vocabulary Anchor", desc:"پەیڤ د بنا هزرێدا د دەمێ REM-ێدا جێدبن." },
  { id:28, group:"dream", icon:"📖", title:"Dream Journal Translation", desc:"خەونا تە وەردگێڕیت و ڕێزمانا وێ شەرح دکەت." },
  { id:29, group:"dream", icon:"🔄", title:"Nightly Progress Sync", desc:"هەژمارا پەیڤێت خەونێ بۆ ڕۆژا پاشی." },
  { id:30, group:"dream", icon:"⏰", title:"Sleep-Optimized Schedule", desc:"بەرنامێ ڕاهێنانێ بۆ باشترین دەمێ خەونێ." },
  { id:31, group:"economy", icon:"🪙", title:"DemX Token", desc:"تۆکن بۆ هەر خولەکەکا فێربوونێ." },
  { id:32, group:"economy", icon:"🏪", title:"Dialogue Marketplace", desc:"گوفتگۆیێت قوتابیان وەک وانە بفروشن." },
  { id:33, group:"economy", icon:"🖼️", title:"NFT Certificate", desc:"بەلگەنامە وەک NFT-یێت هونەری." },
  { id:34, group:"economy", icon:"🔥", title:"Learn-to-Earn Streak", desc:"زنجیرەکا ٣٠ ڕۆژان تۆکنێت دوبلێ." },
  { id:35, group:"economy", icon:"💰", title:"Community Bounties", desc:"ئەرکێت زمانی بەرامبەر DemX." },
  { id:36, group:"economy", icon:"📈", title:"Language Staking", desc:"سود وەرگرتن ژ دەمێ فێربوونێ." },
  { id:37, group:"economy", icon:"💼", title:"Freelance Integration", desc:"کارێت زمانێ فرێلانس بۆ تە." },
  { id:38, group:"economy", icon:"❤️", title:"Philanthropy Exchange", desc:"بەخشرنا تۆکنان بۆ کۆمەلگەهێت بێدەرفەت." },
  { id:39, group:"unspoken", icon:"👋", title:"Gesture Guru", desc:"کتێبخانەیا جەستە و دەستان بۆ هەر زمانەکی." },
  { id:40, group:"unspoken", icon:"🎙️", title:"Paralinguistic Analyzer", desc:"ڤەکۆلینا تۆن و ڕیتمێ دەنگی." },
  { id:41, group:"unspoken", icon:"↔️", title:"Cultural Proxemics Sim", desc:"مەودایێن کۆمەلایەتی و کارتێکرنا وان." },
  { id:42, group:"unspoken", icon:"🕺", title:"Body Language Avatar", desc:"ئاڤاتارەکێ 3D ب جەستەیا زمانەکی." },
  { id:43, group:"unspoken", icon:"🎮", title:"Non-Verbal Game", desc:"یاریا کارتێکرنا بێ پەیوان." },
  { id:44, group:"unspoken", icon:"🎩", title:"Etiquette Masterclass", desc:"کورسێت ئاداب و ڕەوشتێن نەنڤێسکی." },
  { id:45, group:"hybrid", icon:"🕶️", title:"Universal Language Overlay (AR)", desc:"AR-یێ زمانێ ل سەر جیهانێ ڕاستەقینە." },
  { id:46, group:"hybrid", icon:"🗣️", title:"Emotional Voice Cloning", desc:"دەنگێ تە ب هەستێن تە ب زمانێ ئارمانج." },
  { id:47, group:"hybrid", icon:"🏰", title:"Collaborative World-Building", desc:"جیهانەکا ڤێرچوەل یا زمانان پێکڤە." },
  { id:48, group:"hybrid", icon:"📚", title:"AI Story Weaver", desc:"چیڕۆکەکا درێژ یا کەسایەتی ب زمانێ ئارمانج." },
  { id:49, group:"hybrid", icon:"🃏", title:"Quantum Flashcards", desc:"فلاشکاردێت ٢٦-هۆکاری." },
  { id:50, group:"hybrid", icon:"🌌", title:"LinguaX Verse", desc:"مەتاڤێرسا زمانان، هەر زمان عالەمەک." }
];

const grid = document.getElementById('featuresGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let visibleCount = 20;
let currentFilter = 'all';

function renderFeatures(filter = 'all', count = visibleCount) {
  const filtered = filter === 'all'
    ? fiftyFeatures
    : fiftyFeatures.filter(f => f.group === filter);

  const toShow = filtered.slice(0, count);

  grid.innerHTML = toShow.map(f => `
    <div class="feature-card-fifty visible" data-group="${f.group}">
      <div class="feature-number">#${f.id.toString().padStart(2,'0')}</div>
      <div class="feature-icon-fifty">${f.icon}</div>
      <h3 class="feature-title-fifty">${f.title}</h3>
      <p class="feature-desc-fifty">${f.desc}</p>
    </div>
  `).join('');

  if (filtered.length > count) {
    loadMoreBtn.style.display = 'block';
  } else {
    loadMoreBtn.style.display = 'none';
  }
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = 20;
    renderFeatures(currentFilter, visibleCount);
  });
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 20;
  renderFeatures(currentFilter, visibleCount);
});

renderFeatures('all', 20);
