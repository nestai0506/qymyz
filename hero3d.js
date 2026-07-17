/* ============================================================
   HERO 3D — Three.js фон эффектісі (тек десктопта жүктеледі)

   Hero-ның артқы қабатында жарқыраған алтын нысан қалқиды.
   Фото мен ожау анимациясы бұрынғыдай орнында қалады —
   бұл тек қосымша «премиум» жарқыл.

   ⚠️ Мобильде бұл файл МҮЛДЕМ жүктелмейді (index.html-ді қараңыз),
      сондықтан телефондағы жылдамдыққа әсері жоқ.
   ============================================================ */
import * as THREE from 'three';
import { EffectComposer }  from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass }      from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass }      from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ============================================================
   ⚙️ CONFIG — БАРЛЫҚ ТҮС ЖӘНЕ GLOW ПАРАМЕТРЛЕРІ ОСЫ ЖЕРДЕ
   Брендинг өзгерсе — тек осы объектіні түзетесіз.
   ============================================================ */
const CONFIG = {
  // --- Түстер (сайттың қоңыр-алтын палитрасына бейімделген) ---
  gold:   0xF5B942,   // негізгі алтын-сары
  brown:  0x8B5E3C,   // қоңыр (emissive екінші реңі)

  // --- Материал: балдай жылтыр металл ---
  material: {
    metalness: 0.95,          // жоғары → металл жарқыл
    roughness: 0.16,          // төмен → айналық
    emissiveIntensity: 0.42,  // өз жарығы (Bloom осыны көтереді)
    envIntensity: 0.75,       // ⚠️ envmap-сыз metalness жоғары нысан ҚАРА болады
  },

  // --- Пішін (фон акценті — сондықтан шағын) ---
  shape: {
    radius: 0.78, tube: 0.22,
    tubularSegments: 160, radialSegments: 22,   // десктоп сапасы
    p: 2, q: 3,                                  // TorusKnot түйіні
    waveAmp: 0.05,                               // сұйықтық толқынының күші
    waveSpeed: 0.9,
  },

  // --- Bloom (мәтін оқылымды қалатындай орташа деңгей) ---
  bloom: { strength: 0.5, radius: 0.7, threshold: 0.84 },

  // --- Жарық ---
  lights: {
    ambient: { color: 0xFFD9A0, intensity: 0.35 },
    key:     { color: 0xF5B942, intensity: 55, pos: [ 3.5,  3.0,  4.0] },  // алтын-сары
    rim:     { color: 0x8B5E3C, intensity: 30, pos: [-3.5, -1.5, -2.0] },  // қоңыр
  },

  // --- Орналасуы (жоғарғы оң жақ бұрыш — ожауға кедергі жасамайды) ---
  layout:  { x: 3.5, y: 1.75, z: -2.6, cameraZ: 6.0, fov: 45 },
  motion:  {
    parallax: 0.5,      // тінтуірге ілесу
    ease: 0.05,         // жұмсақтық
    autoRotate: 0.13,   // үнемі баяу айналу
    scrollRecede: 4.0,  // скроллда артқа шегінуі
    scrollShrink: 0.55, // скроллда кішіреюі
    scrollEase: 0.06,
  },

  canvasOpacity: 0.62,  // жалпы «әлсіздігі» (фотоны басып қалмауы үшін)
};

/* ---------- Кенеп ---------- */
const canvas = document.getElementById('hero3d');
const hero = document.getElementById('hero');
if (!canvas || !hero) throw new Error('hero3d: canvas немесе hero табылмады');

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
  });
} catch (e) {
  canvas.style.display = 'none';        // WebGL жоқ → фото мен ожау қала береді
  throw e;
}

const size = () => ({ w: hero.clientWidth, h: hero.clientHeight });
let { w, h } = size();

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(w, h, false);
renderer.setClearAlpha(0);                       // мөлдір → фотоның үстінде тұрады
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;

const scene = new THREE.Scene();                 // background жоқ — мөлдір

/* Айнала бейнесі — металдың жарқырауы үшін міндетті */
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = CONFIG.material.envIntensity;
pmrem.dispose();

const camera = new THREE.PerspectiveCamera(CONFIG.layout.fov, w / h, 0.1, 100);
camera.position.z = CONFIG.layout.cameraZ;

/* ---------- Жарық ---------- */
const L = CONFIG.lights;
scene.add(new THREE.AmbientLight(L.ambient.color, L.ambient.intensity));
const key = new THREE.PointLight(L.key.color, L.key.intensity, 40, 2);
key.position.set(...L.key.pos); scene.add(key);
const rim = new THREE.PointLight(L.rim.color, L.rim.intensity, 40, 2);
rim.position.set(...L.rim.pos); scene.add(rim);

/* ============================================================
   НЫСАН — TorusKnot + сұйықтық толқыны (shader)
   ============================================================ */
const S = CONFIG.shape;
const geo = new THREE.TorusKnotGeometry(S.radius, S.tube, S.tubularSegments, S.radialSegments, S.p, S.q);

const mat = new THREE.MeshStandardMaterial({
  color: CONFIG.gold,
  emissive: CONFIG.brown,
  emissiveIntensity: CONFIG.material.emissiveIntensity,
  metalness: CONFIG.material.metalness,
  roughness: CONFIG.material.roughness,
});

/* Стандарт материалға сұйықтық толқынын қосамыз (вершиналарды толқындату) */
mat.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = { value: 0 };
  shader.uniforms.uAmp  = { value: S.waveAmp };
  shader.vertexShader = `
    uniform float uTime;
    uniform float uAmp;
  ` + shader.vertexShader.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
     float wave = sin(position.x * 2.6 + uTime * ${S.waveSpeed.toFixed(2)})
                * cos(position.y * 2.2 + uTime * 0.7)
                + sin(position.z * 3.0 - uTime * 0.5) * 0.5;
     transformed += normalize(normal) * wave * uAmp;`
  );
  mat.userData.shader = shader;
};

const knot = new THREE.Mesh(geo, mat);
knot.position.set(CONFIG.layout.x, CONFIG.layout.y, CONFIG.layout.z);
scene.add(knot);

/* ============================================================
   BLOOM
   ============================================================ */
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(
  new THREE.Vector2(w, h), CONFIG.bloom.strength, CONFIG.bloom.radius, CONFIG.bloom.threshold
);
composer.addPass(bloom);
composer.addPass(new OutputPass());
composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
composer.setSize(w, h);

canvas.style.opacity = CONFIG.canvasOpacity;

/* ============================================================
   ИНТЕРАКТИВ
   ============================================================ */
const target = { x: 0, y: 0 };
const smooth = { x: 0, y: 0 };
let scrollT = 0, scrollS = 0;

addEventListener('pointermove', (e) => {
  if (e.pointerType === 'touch') return;
  target.x = (e.clientX / innerWidth  - 0.5) * 2;
  target.y = (e.clientY / innerHeight - 0.5) * 2;
}, { passive: true });

addEventListener('scroll', () => {
  // Hero-дан өнімдерге өткен сайын 0 → 1
  scrollT = Math.min(1, Math.max(0, scrollY / Math.max(1, hero.clientHeight)));
}, { passive: true });

addEventListener('resize', () => {
  ({ w, h } = size());
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
  composer.setSize(w, h);
  bloom.resolution.set(w, h);
}, { passive: true });

/* ============================================================
   ЦИКЛ
   ============================================================ */
const clock = new THREE.Clock();
let visible = true;
const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
io.observe(hero);

function tick() {
  requestAnimationFrame(tick);
  if (!visible || document.hidden) return;   // Hero көрінбесе — рендер жоқ (батарея үнемі)

  const t = clock.getElapsedTime();
  const M = CONFIG.motion;

  // шейдер уақыты (сұйықтық толқыны)
  if (mat.userData.shader) mat.userData.shader.uniforms.uTime.value = t;

  // тінтуірге жұмсақ ілесу
  smooth.x += (target.x - smooth.x) * M.ease;
  smooth.y += (target.y - smooth.y) * M.ease;

  knot.rotation.y = t * M.autoRotate + smooth.x * M.parallax;
  knot.rotation.x = t * M.autoRotate * 0.6 + smooth.y * M.parallax * 0.5;

  // скроллда артқа шегініп, кішірейеді
  scrollS += (scrollT - scrollS) * M.scrollEase;
  knot.position.z = CONFIG.layout.z - scrollS * M.scrollRecede;
  knot.position.y = CONFIG.layout.y + scrollS * 0.5;
  knot.scale.setScalar(1 - scrollS * M.scrollShrink);
  canvas.style.opacity = String(CONFIG.canvasOpacity * (1 - scrollS * 0.7));

  composer.render();
}
tick();
