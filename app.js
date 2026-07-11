import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// === ١. سیستەمێ وەرگێڕانا ١٠ زمانان (Localization Database) ===
const translations = {
  "ku-badini": {
    "nav-features": "تایبەتمەندی", "nav-plans": "پلان", "nav-fifty": "٥٠ خاڵ", "nav-blog": "بلۆگ", "nav-cta": "دەعوەت", "btn-login": "چوونەژوور",
    "hero-title": "زمانان ب ئاستێ لوتکەیی فێربە", "hero-desc": "ئەزموونەکا کەسایەتی کر یا فێربوونێ ب هاریکاریا AI-یێ پێشکەفتی. ژ Duolingo بلندتر، هەر زمان عالەمەک.",
    "hero-start": "بەلاش دەستپێکە", "hero-view-plans": "پلانێت مە بینە", "features-heading": "چی دکەت LinguaX-Ai تایبەت؟",
    "plans-heading": "پلانێت بهایێت گونجایی", "p1-title": "🆓 دەستپێکەر", "p2-title": "⭐ Plus", "p3-title": "👑 Premium",
    "btn-start-free": "بەلاش دەستپێکە", "btn-upgrade-plus": "Plus بگەهینە", "btn-upgrade-premium": "Premium بگەهینە", "plans-note": "💳 هەموو پلانان دەستپێکرنەکا ٧ ڕۆژان بێ بەرامبەر پێشکێشدکەن.",
    "fifty-heading": "٥٠ خاڵێت شۆڕشگێر کو کەسێ نەدیتینە", "btn-load-more": "زێدەتر نیشاندە", "pay-title": "گەهاندنا پۆڵا پێشکەفتی"
  },
  "ku-sorani": {
    "nav-features": "تایبەتمەندییەکان", "nav-plans": "پلانەکان", "nav-fifty": "٥٠ خاڵ", "nav-blog": "بلۆگ", "nav-cta": "بانگهێشت", "btn-login": "چوونەژوورەوە",
    "hero-title": "زمانەکان لە ئاستی لوتکە فێربە", "hero-desc": "ئەزموونێکی کەسایەتیکراوی فێربوون بە هاوکاری AI پێشکەوتوو. بەرزتر لە Duolingo.",
    "hero-start": "بەخۆڕایی دەستپێبکە", "hero-view-plans": "پلانەکانمان ببینە", "features-heading": "چی LinguaX-Ai تایبەت دەکات؟",
    "plans-heading": "پلانەکان بە نرخی گونجاو", "p1-title": "🆓 دەستپێکەر", "p2-title": "⭐ پڵەس", "p3-title": "👑 پڕیمیۆم",
    "btn-start-free": "بەخۆڕایی دەستپێبکە", "btn-upgrade-plus": "پڵەس بکڕە", "btn-upgrade-premium": "پڕیمیۆم بکڕە", "plans-note": "💳 هەموو پلانەکان تاقیکردنەوەی ٧ ڕۆژی بەخۆڕاییان هەیە.",
    "fifty-heading": "٥٠ خاڵی شۆڕشگێڕ کە کەس نەیتوانیوە بیبینێت", "btn-load-more": "زیاتر نیشان بدە", "pay-title": "پێشخستنی وەشان"
  },
  "en": {
    "nav-features": "Features", "nav-plans": "Plans", "nav-fifty": "50 Innovation X", "nav-blog": "Blog", "nav-cta": "Invite", "btn-login": "Sign In",
    "hero-title": "Learn Languages at the Peak Level", "hero-desc": "A personalized learning experience powered by advanced AI. Beyond Duolingo, every language is a universe.",
    "hero-start": "Start Free", "hero-view-plans": "View Plans", "features-heading": "What Makes LinguaX-Ai Special?",
    "plans-heading": "Affordable Premium Pricing", "p1-title": "🆓 Starter", "p2-title": "⭐ Plus", "p3-title": "👑 Premium",
    "btn-start-free": "Start Free", "btn-upgrade-plus": "Get Plus", "btn-upgrade-premium": "Go Premium", "plans-note": "💳 All plans offer a 7-day free trial. Cancel anytime.",
    "fifty-heading": "50 Revolutionary Frontiers Undiscovered", "btn-load-more": "Load More Features", "pay-title": "Upgrade Your Account"
  },
  "ar": {
    "nav-features": "الميزات", "nav-plans": "الخطط", "nav-fifty": "٥٠ نقطة", "nav-blog": "المدونة", "nav-cta": "دعوة", "btn-login": "تسجيل الدخول",
    "hero-title": "تعلم اللغات بمستوى القمة الأكاديمية", "hero-desc": "تجربة تعليمية مخصصة مدعومة بالذكاء الاصطناعي المتقدم. أبعد من دولينجو.",
    "hero-start": "ابدأ مجاناً", "hero-view-plans": "شاهد الخطط", "features-heading": "ما الذي يجعل LinguaX-Ai مميزاً؟",
    "plans-heading": "خطط بأسعار مناسبة للجميع", "p1-title": "🆓 المبتدئ", "p2-title": "⭐ بلس", "p3-title": "👑 بريميوم",
    "btn-start-free": "ابدأ مجاناً", "btn-upgrade-plus": "اشترك في بلس", "btn-upgrade-premium": "اشترك في بريميوم", "plans-note": "💳 جميع الخطط تشمل فترة تجريبية مجانية لمدة ٧ أيام.",
    "fifty-heading": "٥٠ ميزة ثورية لم يشهدها أحد من قبل", "btn-load-more": "عرض المزيد", "pay-title": "ترقية الحساب"
  }
};

// زێدەکرنا زمانێن دی یێن کورتکراوە بۆ تەمامکرنا هەر ١٠ زمانان
["tr","de","fa","es","fr","zh"].forEach(l => {
  translations[l] = translations["en"]; // دۆگمەک جێگر بۆ ئینگلیزی بۆ زمانێن دی
});

// === ٢. سیستەمێ خزنکرنا داتایێن فێرخوازی (State Database) ===
const UserState = {
  isLoggedIn: false,
  username: "Zaniyar Dildar",
  email: "",
  plan: "Free", 
  streak: 1,
  points: 50,
  currentLang: "ku-badini",

  save() {
    localStorage.setItem('linguax_core_user', JSON.stringify(this));
  },
  load() {
    const local = localStorage.getItem('linguax_core_user');
    if(local) Object.assign(this, JSON.parse(local));
  }
};

// === ٣. مەنتیقێ گۆڕینی زمانێ وێبسایتی ===
function applyLanguage(lang) {
  UserState.currentLang = lang;
  UserState.save();
  
  // ڕێکخستنا ئاراستەی (RTL و LTR) خودکار
  if(["en","tr","de","es","fr","zh"].includes(lang)) {
    document.body.classList.add('ltr');
  } else {
    document.body.classList.remove('ltr');
  }

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if(element.tagName === "SPAN" && element.classList.contains('gradient-text')) {
        element.textContent = translations[lang][key];
      } else {
        element.textContent = translations[lang][key];
      }
    }
  });
}

// === ٤. سیستەمێ ئەکاونت و لۆگینبوونێ ===
const authModal = document.getElementById('authModal');
const userZoneDesktop = document.getElementById('user-profile-zone');
const userZoneMobile = document.getElementById('user-profile-zone-mobile');

function updateAuthUI() {
  if(UserState.isLoggedIn) {
    const htmlBadge = `
      <div class="user-dashboard-badge" onclick="alert('بخێرهاتی ${UserState.username}! زنجێرا تە: ${UserState.streak} ڕۆژە')">
        <span>👤 ${UserState.username}</span>
        <span class="badge-plan">${UserState.plan}</span>
      </div>
    `;
    userZoneDesktop.innerHTML = htmlBadge;
    userZoneMobile.innerHTML = htmlBadge;
  }
}

document.getElementById('auth-btn').addEventListener('click', () => authModal.classList.add('active'));
document.getElementById('auth-btn-mobile').addEventListener('click', () => authModal.classList.add('active'));
document.getElementById('closeAuthModal').addEventListener('click', () => authModal.classList.remove('active'));

document.getElementById('authSubmitBtn').addEventListener('click', () => {
  const name = document.getElementById('authUsername').value;
  const email = document.getElementById('authEmail').value;
  if(!name || !email) return alert("تکایە خانەکان پڕبکەوە");
  
  UserState.isLoggedIn = true;
  UserState.username = name;
  UserState.email = email;
  UserState.save();
  updateAuthUI();
  authModal.classList.remove('active');
});

// === ٥. مۆدالا پارەدانێ (FIB, FastPay, USDT) ===
const paymentModal = document.getElementById('paymentModal');
const paymentArea = document.getElementById('payment-details-area');

document.querySelectorAll('.plan-card button').forEach((btn, idx) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(idx === 0) return alert("تە ئەڤ پلانە یا هەی!");
    paymentModal.classList.add('active');
  });
});

document.getElementById('closePaymentModal').addEventListener('click', () => {
  paymentModal.classList.remove('active');
  paymentArea.style.display = 'none';
});

document.querySelectorAll('.payment-method-card').forEach(card => {
  card.addEventListener('click', () => {
    const method = card.dataset.method;
    paymentArea.style.display = 'block';
    
    if(method === 'fib') {
      paymentArea.innerHTML = `
        <h4>پارەدان ب ڕێیا بانکێ FIB</h4>
        <p>کۆدێ QR یێ خوارێ سڕ بکە د ئەپێ FIB دا بۆ ناردنا پارەی:</p>
        <div style="background:#fff; padding:10px; width:130px; margin:10px auto; text-align:center; font-weight:bold; color:#000; border:2px solid #000;">[FIB QR CODE]</div>
        <button class="btn-primary btn-sm" id="confirmPayBtn">من پارە نارد</button>
      `;
    } else if(method === 'fastpay') {
      paymentArea.innerHTML = `
        <h4>پارەدان ب ڕێیا FastPay</h4>
        <p>بڕی پارەی پێویست بنێره بۆ ڤێ ژمارێ:</p>
        <p dir="ltr" style="font-weight:bold; color:#8b5cf6; text-align:center; font-size:1.2rem; margin:5px 0;">+964 750 121 3000</p>
        <input type="text" id="txId" placeholder="ژمارەی گواستنەوە (Transaction ID)" class="neumorph-inset input-field">
        <button class="btn-primary btn-sm" id="confirmPayBtn">پشتڕاستکرن</button>
      `;
    } else if(method === 'usdt') {
      paymentArea.innerHTML = `
        <h4>پارەدان ب ڕێیا USDT (TRC20)</h4>
        <p>کڕپتۆ بنێره بۆ ڤێ ناونیشانا وۆلێتێ:</p>
        <code dir="ltr" style="display:block; background:#1a1d29; color:#fff; padding:10px; border-radius:8px; font-size:0.8rem; word-break:break-all;">TYX24J12130KRDxxxxxxZANIYARxxxxxx</code>
        <button class="btn-primary btn-sm" style="margin-top:10px;" id="confirmPayBtn">پێشکەشکردنی داواکاری</button>
      `;
    }

    document.getElementById('confirmPayBtn').addEventListener('click', () => {
      alert("سوپاس! داواکاریا تە هاتە وەرگرتن، پشتی پشتڕاستکرنێ د مێژویا ١ کاتژمێر دا پۆڵا تە دێ بیتە Plus/Premium.");
      UserState.plan = "Plus ⭐";
      UserState.isLoggedIn = true;
      UserState.save();
      updateAuthUI();
      paymentModal.classList.remove('active');
    });
  });
});

// === ٦. Three.js Globe Setup ===
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
  map: earthMap, specularMap: earthSpecular, specular: new THREE.Color('grey'), shininess: 10, normalMap: earthNormal,
});
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

const cloudGeometry = new THREE.SphereGeometry(2.53, 64, 64);
const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudMap, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(clouds);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false; controls.enablePan = false; controls.autoRotate = true; controls.autoRotateSpeed = 0.6;

function animate() {
  requestAnimationFrame(animate);
  clouds.rotation.y += 0.0005;
  globe.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

// === ٧. ٥٠ خاڵێت شۆڕشگێر (Data & Render) ===
const fiftyFeatures = [
  { id:1, group:"neuro", icon:"🧠", title:"Neuro-Sync Dashboard", desc:"پانێلەکا ڕاستەوخۆ یا پێلێت مێشکی دەمێ فێربوونێ.", longDesc: "تە دشێی چالاکیا مێشکێ خۆ ب شێوەیەکێ ڕاستەوخۆ ببینی: پێلێت Alpha, Beta, Theta, Gamma. دەمێ تە بالڤەدایی، سیستەم هەستیار دبیت و تە ئاگادار دکەت." },
  { id:2, group:"neuro", icon:"🎯", title:"Focus Guardian", desc:"دەمێ بالڤەدایی، دەرسێ ڕادوەستینیت و مینی-بڕێکا ئارامبوونێ ددەت.", longDesc: "ئەگەر مێشکێ تە ژ دەرسێ دوورکەڤیت، Focus Guardian دەرسێ ڕادوەستینیت و چەند خولەکەکا میدیتەیشنێ پێشکێش دکەت دا دیسان بالڤەدایی بیت." },
  { id:3, group:"neuro", icon:"📈", title:"Grammar Insight Pulse", desc:"تشخیصا ڕێزمانا گران و پێشنیازا بەرفرەهترکرنێ.", longDesc: "ئەم پێلێت N400 و P600 یێت مێشکێ تە ڤەکۆلین دکەین بۆ زانینا کا تە ڕێزمانەکا نوی ب راستی فامکری یان تەنها ژبەرکری." },
  { id:4, group:"neuro", icon:"😊", title:"Emotion-Adaptive Vocabulary", desc:"پەیڤێت گونجایی ب گۆرەی رۆحێ تە.", longDesc: "کەشفا هەستێت تە دکەین و پەیڤان پێشکێش دکەین کو ل گەل رۆحێ تە گونجای بن. ئەگەر تە بێزار بی، پەیڤێت ئارام." },
  { id:5, group:"neuro", icon:"😴", title:"Mental Fatigue Meter", desc:"ماندوویا مێشکی تشخیصدکەت و دەمێ ڤەساندنێ دیاردکەت.", longDesc: "بێی ئەوەی تە هەست پێبکەی، ماندوویا مێشکی تە دپێڤیت و دەمێ باشترین بۆ ڤەساندنێ پێشنیاز دکەت." },
  { id:50, group:"hybrid", icon:"🌌", title:"LinguaX Verse", desc:"مەتاڤێرسا زمانان، هر زمان عالەمەک.", longDesc: "بچیتە ناڤ مەتاڤێرسا مە یا زمانان. هەر زمان عالەمەکێ تایبەت، و تە دشێی ب هاوڕێیان ڤە سەرکێشی بکەی. فێربوونا زمانان وەک ژیانەکا دووێ." }
];

const grid = document.getElementById('featuresGrid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let visibleCount = 4;

function renderFeatures(filter = 'all', count = visibleCount) {
  const filtered = filter === 'all' ? fiftyFeatures : fiftyFeatures.filter(f => f.group === filter);
  const toShow = filtered.slice(0, count);

  grid.innerHTML = toShow.map(f => `
    <div class="feature-card-fifty visible" data-id="${f.id}">
      <div class="feature-number">#${f.id.toString().padStart(2,'0')}</div>
      <div class="feature-icon-fifty">${f.icon}</div>
      <h3 class="feature-title-fifty">${f.title}</h3>
      <p class="feature-desc-fifty">${f.desc}</p>
    </div>
  `).join('');

  loadMoreBtn.style.display = filtered.length > count ? 'block' : 'none';
  
  document.querySelectorAll('.feature-card-fifty').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.id)));
  });
}

const modal = document.getElementById('featureModal');
function openModal(id) {
  const feature = fiftyFeatures.find(f => f.id === id);
  if (!feature) return;
  document.getElementById('modalIcon').textContent = feature.icon;
  document.getElementById('modalTitle').textContent = feature.title;
  document.getElementById('modalDescription').textContent = feature.longDesc;
  modal.classList.add('active');
}

document.getElementById('closeModal').addEventListener('click', () => modal.classList.remove('active'));

// === ٨. پێکڤەگرێدانا ڕووداوان (Event Listeners) ===
document.getElementById('lang-selector').addEventListener('change', (e) => applyLanguage(e.target.value));
document.getElementById('lang-selector-mobile').addEventListener('change', (e) => applyLanguage(e.target.value));

document.getElementById('theme-toggle').addEventListener('click', () => document.body.classList.toggle('dark-mode'));
document.getElementById('theme-toggle-mobile').addEventListener('click', () => document.body.classList.toggle('dark-mode'));

const hamburger = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  hamburger.textContent = mobileMenu.classList.contains('active') ? '✕' : '☰';
});

document.getElementById('viewPlansBtn').addEventListener('click', () => {
  document.getElementById('plans').scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFeatures(btn.dataset.filter, visibleCount);
  });
});

loadMoreBtn.addEventListener('click', () => {
  visibleCount += 4;
  renderFeatures('all', visibleCount);
});

// دهستپێکرنا ئەپێ
UserState.load();
updateAuthUI();
applyLanguage(UserState.currentLang);
document.getElementById('lang-selector').value = UserState.currentLang;
renderFeatures('all', 4);
