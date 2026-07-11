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
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});
document.getElementById('theme-toggle-mobile').addEventListener('click', () => {
  setTheme(!document.body.classList.contains('dark-mode'));
});

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    setTheme(true);
  } else {
    setTheme(false);
  }
});

// === Mobile Menu Toggle ===
const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  // Toggle icon between ☰ and ✕
  hamburger.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    hamburger.textContent = '☰';
  });
});

// Smooth scroll for desktop nav links (they're already anchors)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === 50 Features Data & Logic ===
const fiftyFeatures = [
  { id:1, group:"neuro", icon:"🧠", title:"Neuro-Sync Dashboard", desc:"پانێلەکا ڕاستەوخۆ یا پێلێت مێشکی دەمێ فێربوونێ.", longDesc: "تە دشێی چالاکیا مێشکێ خۆ ب شێوەیەکێ ڕاستەوخۆ ببینی: پێلێت Alpha, Beta, Theta, Gamma. دەمێ تە بالڤەدایی، سیستەم هەستیار دبیت و تە ئاگادار دکەت." },
  { id:2, group:"neuro", icon:"🎯", title:"Focus Guardian", desc:"دەمێ بالڤەدایی، دەرسێ ڕادوەستینیت و مینی-بڕێکا ئارامبوونێ ددەت.", longDesc: "ئەگەر مێشکێ تە ژ دەرسێ دوورکەڤیت، Focus Guardian دەرسێ ڕادوەستینیت و چەند خولەکەکا میدیتەیشنێ پێشکێش دکەت دا دیسان بالڤەدایی بیت." },
  { id:3, group:"neuro", icon:"📈", title:"Grammar Insight Pulse", desc:"تشخیصا ڕێزمانا گران و پێشنیازا بەرفرەهترکرنێ.", longDesc: "ئەم پێلێت N400 و P600 یێت مێشکێ تە ڤەکۆلین دکەین بۆ زانینا کا تە ڕێزمانەکا نوی ب راستی فامکری یان تەنها ژبەرکری. ئەگەر شاشیا تە یا بنیات هەبیت، دەرسەکا زێدە بۆ تە ڕێکدخەین." },
  { id:4, group:"neuro", icon:"😊", title:"Emotion-Adaptive Vocabulary", desc:"پەیڤێت گونجایی ب گۆرەی رۆحێ تە.", longDesc: "کەشفا هەستێت تە دکەین و پەیڤان پێشکێش دکەین کو ل گەل رۆحێ تە گونجای بن. ئەگەر تە بێزار بی، پەیڤێت ئارام؛ ئەگەر بەرهەڤوک بی، پەیڤێت وزەدار." },
  { id:5, group:"neuro", icon:"😴", title:"Mental Fatigue Meter", desc:"ماندوویا مێشکی تشخیصدکەت و دەمێ ڤەساندنێ دیاردکەت.", longDesc: "بێی ئەوەی تە هەست پێبکەی، ماندوویا مێشکی تە دپێڤیت و دەمێ باشترین بۆ ڤەساندنێ پێشنیاز دکەت، دا فێربوون بەرهەمدارتر بیت." },
  { id:6, group:"neuro", icon:"🔮", title:"Subconscious Anchor", desc:"پەیڤێت بنەڕەت بێ ئاگاداری بەرێ مێشکی ددەت.", longDesc: "دەمێ تە د مۆدێ ئارامبوونێ یان خەونێدا، سیستەم پەیڤان د بنا هزرا تەدا جێدکەت، و تە دشێی بێ ئەوەی کاربکەی فێرببی." },
  { id:7, group:"neuro", icon:"🌊", title:"Flow State Optimizer", desc:"هەردەم د ئاستێ 'هەلوەسینا هزرێ'دا بمێنیت.", longDesc: "ئاستێ ئالۆزیا دەرسان ب گۆرەی پێلێت مێشکێ تە ڕێکدخەت تا هەردەم د هەلوەسینا هزرێ دا بمێنی، نە زۆر سانەهی و نە زۆر گران." },
  { id:8, group:"neuro", icon:"📊", title:"Brain Performance Report", desc:"ڕاپۆرتا چالاکیا مێشکی پاشی هەر دانیشتنەکێ.", longDesc: "پاشی هەر وانەیەکێ، ڕاپۆرتەکا تێروتەسەل یا چالاکیا مێشکی و ئەدایێ فێربوونێ وەردگری، ب زانینا کو چ رێکا فێربوونێ بۆ تە باشترینە." },
  { id:9, group:"twin", icon:"👤", title:"Twin Avatar Creator", desc:"ئاڤاتارەکێ 3D-یێ هاوشێوەی تە ب زمانێ ئارمانج.", longDesc: "سێلفییەکێ وەرگری، و ئەم ئاڤاتارەکێ 3D یێ هاوشێوەی تە دروستدکەین کو ب زمانێ ئارمانج صحبەتدکەت و د ناڤ جیهانەکا ڤێرچوەلدا دژیت." },
  { id:10, group:"twin", icon:"🏙️", title:"Life Simulation Engine", desc:"توێ دیجیتال د ژیانا ڕۆژانەدا ب ڤیدیۆیێت 3D.", longDesc: "توێ دیجیتال دچیتە سەر کار، بازار، کافێ، و ژیانا ڕۆژانە ب زمانێ ئارمانج دژیت. تە دشێی تێماشا ڤیدیۆیێت ژیانا وی بکەی و فێرببی." },
  { id:11, group:"twin", icon:"👥", title:"Shadow Me Mode", desc:"توێ دیجیتال پەیڤێت تە دووبارەدکەت و بەحسدکەت.", longDesc: "دەمێ تە دەرسەکێ دبینیت، توێ دیجیتال هەر پەیڤەکا تە دووبارەدکەت و پاشی ب زمانێ ئارمانج بەحسدکەت، وەک سێبەرەکێ فێربوونێ." },
  { id:12, group:"twin", icon:"🌐", title:"Twin Social Network", desc:"توێت دیجیتال پێکڤە کارتێکرنێ دکەن.", longDesc: "توێت دیجیتال یێت هەمی بەکارهێنەران پێکڤە کارتێکرنێ دکەن، هەڤالیێت نوی پەیدادکەن، و تە دشێی تێماشا گوفتگۆیێت وان بکەی و فێرببی." },
  { id:13, group:"twin", icon:"🪞", title:"Personality Mirror", desc:"کەسایەتییا تە ب زمانێ ئارمانج دووبارە دبیت.", longDesc: "AI کەسایەتییا تە (ئینترۆڤێرت/ئێکسترۆڤێرت، مەنتیقی/هەستدار) ب زمانێ ئارمانج شێوەسازی دکەت، و تە دشێی خۆ ب زمانەکێ دی ببینی." },
  { id:14, group:"twin", icon:"📈", title:"Progress Twin Comparison", desc:"پێشکەفتنا خۆ بەراوردکەی دگەل توێ خۆ.", longDesc: "توێ دیجیتال ب خۆ پێشڤەدچیت. هەر هەیڤەکێ، تە دشێی پێشکەفتنا خۆ بەراوردی توێ دیجیتال بکەی و پێشکەفتنا خۆ ببینی." },
  { id:15, group:"twin", icon:"📔", title:"Twin Diary", desc:"یاداشتێت ڤیدیۆیی یێت توێ ب زمانێ ئارمانج.", longDesc: "هەر ڕۆژ، توێ دیجیتال یاداشتەکا ڤیدیۆیی تۆماردکەت. تە دشێی تێماشاکەی، شاشیا ڕاستکەی، و پەیڤێت نوی فێرببی." },
  { id:16, group:"twin", icon:"🌜", title:"Nightly Twin Recap", desc:"کرۆکیا ژیانا توێ ب شەڤ.", longDesc: "هەر ئێڤار، کرۆکیەکا ڤیدیۆیی یا ژیانا توێ دیجیتال وەردگری، ب پەیڤێت سەرەکی یێت ڕۆژێ. ڕێکەکا خۆش بۆ دووبارەکرنێ." },
  { id:17, group:"geno", icon:"🧬", title:"Ancestry Language Tree", desc:"دارا زمانێت باپیران ژ DNA یان مێژوویێ.", longDesc: "ئەگەر داتایێت DNA-یێت تە هەبن، یان تەنها مێژوویا باپیران، ئەم دارەکا زمانان بۆ تە دروستدکەین و ڕێیا فێربوونا زمانان نیشانددەین." },
  { id:18, group:"geno", icon:"🧪", title:"Genetic Learning Style", desc:"شێوازێ فێربوونێ ب گۆرەی جیناتێت تە ئۆپتیمایزدکەت.", longDesc: "بەرێ جیناتێت BDNF و COMT، ئەم دزانین کا تە ب شێوەیەکێ بصری، سەمعی، یان کینێستاتیک باشتر فێردبی، و دەرسان ب گۆرەی وێ ڕێکدخەین." },
  { id:19, group:"geno", icon:"🏺", title:"Heritage Revival Quests", desc:"ئەرکێت گەشتا چاندی بۆ زمانێت باپیران.", longDesc: "بۆ هەر زمانەکێ باپیران، ئەرکەکا گەشتا چاندی دروست دبیت: فێربوونا چێکرنا خوارنەکا کەلەپوری، یان گۆرانییەکا زارۆکیێ." },
  { id:20, group:"geno", icon:"📉", title:"DNA-Based Difficulty Curve", desc:"منحەنییا گرانیێ ب گۆرەی جیناتێت تە.", longDesc: "هندەک کەس ژ بۆماوەیی خۆ توندتر فێردبن، ئەم منحەنییا گرانیێ ب گۆرەی جیناتێت تە ڕێکدخەین دا هەردەم گونجایی بیت." },
  { id:21, group:"geno", icon:"🎵", title:"Epigenetic Trigger Audio", desc:"مۆسیقایێت تایبەت کو جیناتێت زمانێ چالاکدکەن.", longDesc: "پێلێت دەنگی یێت تایبەت بۆ هەر زمانەکێ، بۆ چالاککرنا جیناتێت نەوەکی و بەرفرەهکرنا بنەئاگا." },
  { id:22, group:"geno", icon:"🗺️", title:"Cultural Geno-Map", desc:"خەریتەیا 3D یا چاندێت باپیران.", longDesc: "خەریتەیەکا 3D یا جیهانێ دەردخەت کو چاندێت باپیرێت تە چاوا ب زمان ڤە گرێداینە و تە دەستنیشان دکەت." },
  { id:23, group:"geno", icon:"📜", title:"Personalized Language Recipe", desc:"ڕێبەرەکا زمانان ب گۆرەی پڕۆفایلا تە.", longDesc: "ڕێبەرەکا تایبەت یا فێربوونا زمانان ب گۆرەی هەمی پڕۆفایلا جینەتیکی و چاندی یا تە، وەک ڕەتێتەکا کەسایەتی." },
  { id:24, group:"dream", icon:"🌌", title:"Dream Induction Soundscapes", desc:"دەنگێت باینۆڕاڵ بۆ ئامادەکرنا خەونێت زمان.", longDesc: "پاشی هەر دەرسەکێ، دەنگێت باینۆڕاڵ و نارەسییێت ڤیبراسیۆنی بۆ دەمێ نڤستنێ پێشکێشدکەین کو خەونان ئامادەبکەن." },
  { id:25, group:"dream", icon:"🗝️", title:"Lucid Language Quest", desc:"ئەرکەکا زمانی د ناڤ خەونێدا.", longDesc: "د ناڤ خەونەکا لوسید دا، تە دێ ئەرکەکا زمانی وەربگری: گەشتا بازاڕی، گوفتگۆیا کەسەکێ ناودار. ئەم هاریکاریا تە دکەین بۆ ئەو خەونان." },
  { id:26, group:"dream", icon:"🌉", title:"Dream-to-Lesson Bridge", desc:"خەونێ دکەتە دەرسەکا ئینتەرئەکتیڤ.", longDesc: "پاشی هەلستنێ، خەونا خۆ بەحسکە و ئەم وێ بەردەوام دکەینە دەرسەکا ئینتەرئەکتیڤ و پەیڤێت نوی تێدا." },
  { id:27, group:"dream", icon:"💤", title:"REM Vocabulary Anchor", desc:"پەیڤ د بنا هزرێدا د دەمێ REM-ێدا جێدبن.", longDesc: "دەمێ تە د قوناغا REM-ێدا، ئەم ب دەنگەکێ نزم پەیڤێت سەرەکی دووبارە دکەین، دا د بنا هزرا تەدا جێببن." },
  { id:28, group:"dream", icon:"📖", title:"Dream Journal Translation", desc:"خەونا تە وەردگێڕیت و ڕێزمانا وێ شەرح دکەت.", longDesc: "خەونا خۆ ب زمانێ دایکی بنڤێسە، ئەم وێ وەردگێڕینە زمانێ ئارمانج و ڕێزمانا وێ بۆ تە شەرح دکەین." },
  { id:29, group:"dream", icon:"🔄", title:"Nightly Progress Sync", desc:"هەژمارا پەیڤێت خەونێ بۆ ڕۆژا پاشی.", longDesc: "پاشی هەر شەڤەکێ، ئەم هەژمارا پەیڤێت د خەونێدا هاتینە بکارئینان دکەین و بۆ بەرنامێ ڕۆژا پاشی زێدەدکەین." },
  { id:30, group:"dream", icon:"⏰", title:"Sleep-Optimized Schedule", desc:"بەرنامێ ڕاهێنانێ بۆ باشترین دەمێ خەونێ.", longDesc: "بەرنامەکێ ڕاهێنانێ ددەینە تە کو چ دەمێ شەڤێ گونجاییە بۆ خەونێت زمان، ب گۆرەی ریتمێ سیرکادیان یێ تە." },
  { id:31, group:"economy", icon:"🪙", title:"DemX Token", desc:"تۆکن بۆ هەر خولەکەکا فێربوونێ.", longDesc: "بۆ هەر خولەکەکا فێربوونا چالاک، تۆکنێت DemX بەدەست دئینی. پاشی دشێی بۆ پلانێت پریمیوم، یان بۆ کڕینا وانەیان بکاربینی." },
  { id:32, group:"economy", icon:"🏪", title:"Dialogue Marketplace", desc:"گوفتگۆیێت قوتابیان وەک وانە بفروشن.", longDesc: "قوتابیێت پێشکەفتی دشێن سێشنێت گوفتگۆیا ڕاستەوخۆ ب زمانێ ئارمانج وەک وانە بفروشنە دەستپێکەران." },
  { id:33, group:"economy", icon:"🖼️", title:"NFT Certificate", desc:"بەلگەنامە وەک NFT-یێت هونەری.", longDesc: "بەلگەنامەیێت CEFR وەک NFT-یێت هونەری یێت بەرهەمێ هونەرمەندان د بلۆکچەینێدا تۆماردبن و بهایێت کۆمکرنێ هەنە." },
  { id:34, group:"economy", icon:"🔥", title:"Learn-to-Earn Streak", desc:"زنجیرەکا ٣٠ ڕۆژان تۆکنێت دوبلێ.", longDesc: "زنجیرەکا فێربوونا ٣٠ ڕۆژان بێ برێکدان، تۆکنێت دوبلێ دەستەبەردکەت و دشێی بۆ خەلاتێت ڕاستەقینە بگەهۆڕی." },
  { id:35, group:"economy", icon:"💰", title:"Community Bounties", desc:"ئەرکێت زمانی بەرامبەر DemX.", longDesc: "ئەرکێت زمانی وەک وەرگێڕان یان دروستکرنا ناڤەرۆک بۆ بەکارهێنەرێت دی پێشنیاز بکەن و DemX بەرامبەر وەرگرن." },
  { id:36, group:"economy", icon:"📈", title:"Language Staking", desc:"سود وەرگرتن ژ دەمێ فێربوونێ.", longDesc: "هندی پتر دەمێ خۆ بۆ فێربوونێ سەرفکەی، ئێکەمێن سودێ (APY) بەدەست دئینی. فێربوون دبیتە وەبەرهێنان." },
  { id:37, group:"economy", icon:"💼", title:"Freelance Integration", desc:"کارێت زمانێ فرێلانس بۆ تە.", longDesc: "بەرێ پڕۆفایلا تە، ئەم کارێت وەرگێڕانێ یان مامۆستایەتیێ یێت فرێلانس بۆ تە ڕێکدخەین و تە ب بازاڕێ ڤە گرێددەین." },
  { id:38, group:"economy", icon:"❤️", title:"Philanthropy Exchange", desc:"بەخشرنا تۆکنان بۆ کۆمەلگەهێت بێدەرفەت.", longDesc: "دشێی تۆکنێت DemX یێت خۆ بەخشی بەرنامێت فێربوونا زمانان بۆ کۆمەلگەهێت بێدەرفەت، و پێکڤە جیهانەکا باشتر دروستبکەین." },
  { id:39, group:"unspoken", icon:"👋", title:"Gesture Guru", desc:"کتێبخانەیا جەستە و دەستان بۆ هەر زمانەکی.", longDesc: "فێربوونا جەستە و دەستان یێت تایبەت ب هەر زمانەکی: چاوا سلاڤدکەی، چاوا هەستێت خۆ دەردبینی، بێی پەیڤان." },
  { id:40, group:"unspoken", icon:"🎙️", title:"Paralinguistic Analyzer", desc:"ڤەکۆلینا تۆن و ڕیتمێ دەنگی.", longDesc: "تۆن، ڕیتم، و لەرزینا دەنگێ تە ڤەکۆلین دکەین و دبێژین کا چەند وەک زیرەکێ زمانێ دەردکەڤیت، و شاشیا ڕاستدکەین." },
  { id:41, group:"unspoken", icon:"↔️", title:"Cultural Proxemics Sim", desc:"مەودایێن کۆمەلایەتی و کارتێکرنا وان.", longDesc: "فێربوونا مەودایێن کۆمەلایەتی (نێزیک، دوور) بۆ هەر زمان و چاندەکێ. ب سیناریۆیێت واقعی، تە دشێی رەفتارا گونجایی هەلبژێری." },
  { id:42, group:"unspoken", icon:"🕺", title:"Body Language Avatar", desc:"ئاڤاتارەکێ 3D ب جەستەیا زمانەکی.", longDesc: "ئاڤاتارەکێ 3D هەر پەیڤەکێ ب جەستەیا گونجایی یا زمانەکی (ب نموونە، ئیتالی یان ژاپۆنی) نیشانددەت. تە دشێی لەبەربکەی." },
  { id:43, group:"unspoken", icon:"🎮", title:"Non-Verbal Game", desc:"یاریا کارتێکرنا بێ پەیوان.", longDesc: "یارییەکا ئینتەرئەکتیڤ کو تە دشێی بێ پەیڤان، تەنها ب جەستە و دەستان، ئیدعا بکەی و AI تە تێدگەهیت و بەرامبەری تە کارتێکرنێ دکەت." },
  { id:44, group:"unspoken", icon:"🎩", title:"Etiquette Masterclass", desc:"کورسێت ئاداب و ڕەوشتێن نەنڤێسکی.", longDesc: "کورسێت تایبەت یێت ئاداب و ڕەوشتێن نەنڤێسکی: چاوا سلاڤدان، دەستهلێکرن، دیاری، و ڕێزگرتن بۆ هەر زمان و چاندەکێ." },
  { id:45, group:"hybrid", icon:"🕶️", title:"Universal Language Overlay (AR)", desc:"AR-یێ زمانێ ل سەر جیهانێ ڕاستەقینە.", longDesc: "ب کامێرا مۆبایلێ، دەق و ئاماژە ل سەر جیهانێ ڕاستەقینە ب زمانێ ئارمانج نیشانددەت. وەک گوگڵ گۆگڵز، بەلێ بۆ زمانان." },
  { id:46, group:"hybrid", icon:"🗣️", title:"Emotional Voice Cloning", desc:"دەنگێ تە ب هەستێن تە ب زمانێ ئارمانج.", longDesc: "دەنگێ تە کلۆندکەین و ب زمانێ ئارمانج ب هەمان هەست و کەسایەتییا تە صحبەتدکەین. تە دشێی خۆ ب زمانەکێ دی گوهداری بکەی." },
  { id:47, group:"hybrid", icon:"🏰", title:"Collaborative World-Building", desc:"جیهانەکا ڤێرچوەل یا زمانان پێکڤە.", longDesc: "بەکارهێنەر پێکڤە جیهانەکا ڤێرچوەل ب زمانەکێ دروستدکەن (وەک Minecraft). هاریکاری و فێربوون د ناڤ یاریێدا." },
  { id:48, group:"hybrid", icon:"📚", title:"AI Story Weaver", desc:"چیڕۆکەکا درێژ یا کەسایەتی ب زمانێ ئارمانج.", longDesc: "بەرێ بەرژەوەندییێت تە، چیڕۆکەکا درێژ و بەردەوام ب زمانێ ئارمانج دروست دبیت. هەر دەرسەک بەشەک ژێیە، و تە دشێی ڕێیا چیرۆکێ بگوهوری." },
  { id:49, group:"hybrid", icon:"🃏", title:"Quantum Flashcards", desc:"فلاشکاردێت ٢٦-هۆکاری.", longDesc: "فلاشکاردێت AI-یێ کو ب گۆرەی ٢٦ هۆکارێت دروستەکی (جین، مێشک، دەم، جێگەه، هەست...) کارتێن تایبەت پێشکێشدکەن. هەر کارتەک ژ هەمی ئالیان بۆ تە ئۆپتیمایزە." },
  { id:50, group:"hybrid", icon:"🌌", title:"LinguaX Verse", desc:"مەتاڤێرسا زمانان، هەر زمان عالەمەک.", longDesc: "بچیتە ناڤ مەتاڤێرسا مە یا زمانان. هەر زمان عالەمەکێ تایبەت، و تە دشێی ب هاوڕێیان ڤە سەرکێشی بکەی. فێربوونا زمانان وەک ژیانەکا دووێ." }
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
    <div class="feature-card-fifty visible" data-group="${f.group}" data-id="${f.id}">
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

  // Add click event to open modal
  document.querySelectorAll('.feature-card-fifty').forEach(card => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openModal(id);
    });
  });
}

// Modal logic
const modal = document.getElementById('featureModal');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalActionBtn = document.getElementById('modalActionBtn');
const closeModalBtn = document.getElementById('closeModal');

function openModal(id) {
  const feature = fiftyFeatures.find(f => f.id === id);
  if (!feature) return;
  modalIcon.textContent = feature.icon;
  modalTitle.textContent = feature.title;
  modalDescription.textContent = feature.longDesc;
  modalActionBtn.textContent = `"${feature.title}" چالاک بکە`;
  modal.classList.add('active');
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = 20;
    renderFeatures(currentFilter, visibleCount);
  });
});

// Load more
loadMoreBtn.addEventListener('click', () => {
  visibleCount += 20;
  renderFeatures(currentFilter, visibleCount);
});

// Initial render
renderFeatures('all', 20);
