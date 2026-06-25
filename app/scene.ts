/**
 * scene.ts — Cinematic Three.js Environment
 * Devraj Singh Portfolio — v10
 *
 * KEY IMPROVEMENTS:
 *  — Scroll starts responding immediately (no dead zone at top)
 *  — Astronaut: auto-scaled to 3.2 units, wider fade window, properly lit
 *  — Eye: rich idle animation (breathing, slow pan, LED pulse) before any scroll
 *  — Idle floating particles: 3 slow-drifting orbs that add depth without noise
 *  — Camera path overhauled: tighter, more cinematic, eye exits gracefully
 *  — Clock-based animations run at all times — scene is never static
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

const P = {
  bg: 0x050507,
  violet: 0x6c63ff,
  purple: 0xa78bfa,
  cyan: 0x38bdf8,
  green: 0x34d399,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (lo: number, hi: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - lo) / (hi - lo)));
  return t * t * (3 - 2 * t);
};
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

// ── Chromatic aberration + vignette post shader ────────────────────────────
const GrainVignetteShader = {
  uniforms: {
    tDiffuse: { value: null },
    uAberration: { value: 0.0006 },
    uVignette: { value: 0.34 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uAberration;
    uniform float uVignette;
    varying vec2 vUv;
    void main() {
      vec2 centered = vUv - 0.5;
      float dist = length(centered);
      vec2 dir = centered * uAberration;
      float r = texture2D(tDiffuse, vUv - dir).r;
      float g = texture2D(tDiffuse, vUv).g;
      float b = texture2D(tDiffuse, vUv + dir).b;
      vec3 color = vec3(r, g, b);
      float vig = smoothstep(0.88, uVignette, dist);
      color *= mix(1.0, 0.32, vig);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

function createSpecularGlossinessPlugin() {
  return {
    name: 'KHR_materials_pbrSpecularGlossiness',
    getMaterialType() { return null; },
    extendMaterialParams() { return Promise.resolve(); },
  };
}

export function initCinematicScene(): void {

  const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement | null;
  if (!canvas) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const lowFi = prefersReducedMotion || isCoarsePointer || window.devicePixelRatio < 1 || window.innerWidth < 760;

  // ── Renderer ───────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, lowFi ? 1.25 : 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(P.bg, 1);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.55;

  // ── Scene ──────────────────────────────────────────────────────────────
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(P.bg, 0.016);

  // ── Camera — 34° FOV ──────────────────────────────────────────────────
  const camera = new THREE.PerspectiveCamera(34, window.innerWidth / window.innerHeight, 0.05, 200);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  });

  // ════════════════════════════════════════════════════════════════════════
  //  ENVIRONMENT MAP — studio EXR
  // ════════════════════════════════════════════════════════════════════════
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  // Warm dark fallback env so model is always lit even before EXR loads
  const fallbackEnvScene = new THREE.Scene();
  const fallbackSphere = new THREE.Mesh(
    new THREE.SphereGeometry(40, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0x0a0814, side: THREE.BackSide }),
  );
  fallbackEnvScene.add(fallbackSphere);
  const fallbackEnvRT = pmrem.fromScene(fallbackEnvScene, 0.0);
  scene.environment = fallbackEnvRT.texture;
  fallbackSphere.geometry.dispose();

  const exrLoader = new EXRLoader();
  exrLoader.load(
    '/studio_small_01_2k.exr',
    (hdrTexture) => {
      const envRT = pmrem.fromEquirectangular(hdrTexture);
      scene.environment = envRT.texture;
      hdrTexture.dispose();
      fallbackEnvRT.texture.dispose();
    },
    undefined,
    () => { /* silent fallback already in place */ },
  );

  // ════════════════════════════════════════════════════════════════════════
  //  HERO OBJECT — robotic eye
  //
  //  Position: center-right of hero composition.
  //  The eye is the visual anchor of the entire page load moment.
  // ════════════════════════════════════════════════════════════════════════
  const eyeGroup = new THREE.Group();
  eyeGroup.position.set(1.55, -0.18, -0.55);
  eyeGroup.rotation.y = -0.25;
  eyeGroup.rotation.x = 0.08;
  scene.add(eyeGroup);

  const gltfLoader = new GLTFLoader();
  gltfLoader.register(() => createSpecularGlossinessPlugin());

  gltfLoader.load(
    '/robotic_eye.glb',
    (gltf) => {
      const model = gltf.scene;
      model.scale.setScalar(24);

      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          if (!(mat instanceof THREE.MeshStandardMaterial)) return;
          const name = mat.name || '';

          if (name === 'Copper') {
            mat.envMapIntensity = 1.8;
            mat.roughness = Math.max(0.10, mat.roughness);
          } else if (name === 'Glass' || name === 'Camera_Lens') {
            mat.envMapIntensity = 2.2;
            mat.roughness = 0.0;
            mat.metalness = 0.0;
            mat.transparent = true;
            mat.opacity = 0.82;
          } else if (name === 'Metal' || name === 'Metal.001') {
            mat.envMapIntensity = 1.6;
          } else if (name === 'Light') {
            // Preserve original red LED emissive texture
            mat.emissiveIntensity = 1.5;
            mat.envMapIntensity = 1.5;
          } else if (name === 'White_Plastic') {
            mat.envMapIntensity = 1.0;
          } else {
            mat.envMapIntensity = 1.5;
          }
          mat.needsUpdate = true;
        });
      });

      eyeGroup.add(model);
    },
  );

  // ── LIGHTING RIG ───────────────────────────────────────────────────────
  const keyLight = new THREE.SpotLight(0xffffff, 95, 24, Math.PI * 0.22, 0.5, 1.0);
  keyLight.position.set(-2.5, 4.5, 6.5);
  keyLight.target.position.set(1.1, -0.10, -0.5);
  scene.add(keyLight);
  scene.add(keyLight.target);

  const lensSpot = new THREE.SpotLight(0xffffff, 75, 18, Math.PI * 0.06, 0.15, 1.5);
  lensSpot.position.set(-0.8, 1.6, 5.4);
  lensSpot.target.position.set(1.1, -0.10, -0.5);
  scene.add(lensSpot);
  scene.add(lensSpot.target);

  const rimLight = new THREE.PointLight(P.cyan, 28, 18);
  rimLight.position.set(7.0, 2.0, -5.5);
  scene.add(rimLight);

  const fillLight = new THREE.PointLight(P.violet, 5, 14);
  fillLight.position.set(-1.0, -3.5, 5.0);
  scene.add(fillLight);

  const ambient = new THREE.AmbientLight(0xffffff, 0.10);
  scene.add(ambient);

  // ════════════════════════════════════════════════════════════════════════
  //  IDLE AMBIENT ORBS — 3 slow-drifting glows behind the eye
  //  These give the hero life even before the user scrolls.
  //  Subtle, professional, not noisy.
  // ════════════════════════════════════════════════════════════════════════
  interface Orb { light: THREE.PointLight; baseX: number; baseY: number; baseZ: number; speed: number; phase: number; radius: number; }
  const orbs: Orb[] = [
    { light: new THREE.PointLight(P.violet, 1.8, 6), baseX: 2.5, baseY: 1.2, baseZ: -3.0, speed: 0.18, phase: 0.0, radius: 0.9 },
    { light: new THREE.PointLight(P.cyan, 1.4, 5), baseX: -0.5, baseY: -1.8, baseZ: -4.0, speed: 0.13, phase: 2.1, radius: 0.7 },
    { light: new THREE.PointLight(P.purple, 1.2, 4), baseX: 3.2, baseY: -0.6, baseZ: -2.5, speed: 0.22, phase: 4.3, radius: 0.6 },
  ];
  orbs.forEach(o => scene.add(o.light));

  // ════════════════════════════════════════════════════════════════════════
  //  ASTRONAUT — Environmental storytelling (Education section)
  //
  //  FIXED: Bounding box auto-scale to 3.2 scene units (imposing, space-filling)
  //  Position: slightly left of center, partially clipped for cinematic feel
  //  Fade: 0.52–0.62 in / 0.74–0.82 out (wider visible window)
  // ════════════════════════════════════════════════════════════════════════
  const astronautGroup = new THREE.Group();
  // Positioned at the Education section depth in the camera path
  astronautGroup.position.set(2.5, -10.4, -23.4);
  astronautGroup.visible = false;
  scene.add(astronautGroup);

  // Two lights for the astronaut: key + cyan rim
  const astronautKey = new THREE.SpotLight(0xffffff, 0, 24, Math.PI * 0.28, 0.5, 1.2);
  astronautKey.position.set(-3, -7, -16);
  astronautKey.target.position.set(1.8, -11.0, -27.0);
  scene.add(astronautKey);
  scene.add(astronautKey.target);

  const astronautRim = new THREE.PointLight(P.cyan, 0, 14);
  astronautRim.position.set(7, -8, -20);
  scene.add(astronautRim);

  gltfLoader.load(
    '/franz_viehbocks_sokol_space_suit.glb',
    (gltf) => {
      const model = gltf.scene;

      // Step 1: apply a rough scale so bounding box computes in real units
      model.scale.setScalar(1);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      // Target: 3.2 units tall — imposing, fills the right third of frame
      const targetSize = 5.6;
      const autoScale = targetSize / maxDim;
      model.scale.setScalar(autoScale);

      // Re-center model to its own bounding box center
      const box2 = new THREE.Box3().setFromObject(model);
      const center = box2.getCenter(new THREE.Vector3());
      model.position.sub(center);

      model.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.envMapIntensity = 1.2;
            mat.roughness = Math.max(mat.roughness, 0.45);
            mat.needsUpdate = true;
          }
        });
      });

      astronautGroup.add(model);
    },
  );

  // ════════════════════════════════════════════════════════════════════════
  //  SCROLL ZONE OBJECTS — ring, star, beacons
  // ════════════════════════════════════════════════════════════════════════
  const ringGroup = new THREE.Group();
  ringGroup.position.set(0.4, -13, -30);
  scene.add(ringGroup);
  const ringGeo = new THREE.TorusGeometry(4.2, 0.10, 8, 240);
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x12101e, metalness: 0.6, roughness: 0.32, envMapIntensity: 1.0 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI * 0.04;
  ring.rotation.y = Math.PI * 0.05;
  ringGroup.add(ring);
  const ringLightA = new THREE.PointLight(P.violet, 0, 9);
  const ringLightB = new THREE.PointLight(P.cyan, 0, 7);
  ringGroup.add(ringLightA);
  ringGroup.add(ringLightB);

  // Star sprite (contact section)
  const starCanvas = document.createElement('canvas');
  starCanvas.width = starCanvas.height = 128;
  const sc = starCanvas.getContext('2d')!;
  const grd = sc.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(168,139,250,1)');
  grd.addColorStop(0.12, 'rgba(108,99,255,0.9)');
  grd.addColorStop(0.4, 'rgba(56,189,248,0.3)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  sc.fillStyle = grd;
  sc.fillRect(0, 0, 128, 128);
  const starTex = new THREE.CanvasTexture(starCanvas);
  const starMat = new THREE.SpriteMaterial({ map: starTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
  const star = new THREE.Sprite(starMat);
  star.scale.setScalar(4.0);
  star.position.set(0, -22, -42);
  scene.add(star);
  const starLight = new THREE.PointLight(P.cyan, 0, 35);
  starLight.position.copy(star.position);
  scene.add(starLight);

  // Milestone beacons
  const beaconGroup = new THREE.Group();
  beaconGroup.position.set(1.8, -16.0, -34.0);
  scene.add(beaconGroup);
  const BEACON_COUNT = 4;
  const beaconGeo = new THREE.IcosahedronGeometry(0.09, 0);
  const beaconColors = [P.violet, P.cyan, P.purple, P.green];
  interface Beacon { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; idx: number }
  const beacons: Beacon[] = [];
  for (let i = 0; i < BEACON_COUNT; i++) {
    const color = beaconColors[i % beaconColors.length];
    const mat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.4, roughness: 0.4, metalness: 0.2 });
    const mesh = new THREE.Mesh(beaconGeo, mat);
    mesh.position.set(0, i * 1.1, 0);
    beaconGroup.add(mesh);
    beacons.push({ mesh, mat, idx: i });
  }
  const railGeo = new THREE.CylinderGeometry(0.012, 0.012, (BEACON_COUNT - 1) * 1.1, 5, 1, true);
  const railMat = new THREE.MeshStandardMaterial({ color: 0x14141f, metalness: 0.6, roughness: 0.4 });
  const rail = new THREE.Mesh(railGeo, railMat);
  rail.position.set(0, (BEACON_COUNT - 1) * 0.55, 0);
  beaconGroup.add(rail);
  const beaconLight = new THREE.PointLight(P.cyan, 0, 5);
  beaconGroup.add(beaconLight);

  // ════════════════════════════════════════════════════════════════════════
  //  POST-PROCESSING
  // ════════════════════════════════════════════════════════════════════════
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  let bloomPass: UnrealBloomPass | null = null;
  let grainPass: ShaderPass | null = null;

  if (!lowFi) {
    bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.24,   // slightly stronger — orbs and LED blooms
      0.15,
      0.88,
    );
    composer.addPass(bloomPass);
    grainPass = new ShaderPass(GrainVignetteShader);
    composer.addPass(grainPass);
  }

  // ════════════════════════════════════════════════════════════════════════
  //  CAMERA PATH — 5 waypoints
  //
  //  WP0 (hero, scroll=0):     tight on eye, slight left lean
  //  WP1 (about, ~0–0.20):     pull back gently, eye exits upper frame
  //  WP2 (capabilities ~0.20–0.45): wide pan, eye gone, capabilities depth
  //  WP3 (education ~0.45–0.72): astronaut reveal zone
  //  WP4 (contact ~0.72–1.0):  deep final push, star arrives
  // ════════════════════════════════════════════════════════════════════════
  interface WP { px: number; py: number; pz: number; lx: number; ly: number; lz: number }

  const path: WP[] = [
    //  WP0 — HERO: close on eye, center-right
    { px: -0.35, py: 0.15, pz: 4.8, lx: 1.55, ly: -0.15, lz: -0.55 },
    //  WP1 — ABOUT: pull back and descend, eye drifts above
    { px: -0.5, py: -1.2, pz: 7.8, lx: 0.3, ly: -1.5, lz: 0.0 },
    //  WP2 — CAPABILITIES/PROJECTS: wide arc, descending
    { px: 0.4, py: -5.5, pz: 9.0, lx: 0.2, ly: -10.0, lz: -22.0 },
    //  WP3 — EDUCATION: astronaut reveal — push into depth
    { px: 0.8, py: -11.0, pz: 5.8, lx: 1.8, ly: -11.0, lz: -27.0 },
    //  WP4 — CONTACT: deep space, star arrives
    { px: 0.0, py: -18.0, pz: 4.2, lx: 0.0, ly: -22.0, lz: -42.0 },
  ];

  // Break points: how far along [0,1] each waypoint starts
  // WP0–WP1: 0–0.20 (hero dwells longer before moving)
  // WP1–WP2: 0.20–0.46
  // WP2–WP3: 0.46–0.70
  // WP3–WP4: 0.70–1.0
  const breaks = [0, 0.20, 0.46, 0.70, 1.0];
  const cam: WP = { ...path[0] };

  // Entry dolly: cinematic push-in on load (fades out over ~4s)
  let entryDollyZ = 3.0;

  let rawMX = 0, rawMY = 0, smoothMX = 0, smoothMY = 0;
  const onMouseMove = (e: MouseEvent) => {
    rawMX = e.clientX / window.innerWidth - 0.5;
    rawMY = e.clientY / window.innerHeight - 0.5;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  let scrollRaw = 0, scrollSmooth = 0;
  const onScroll = () => {
    const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollRaw = window.scrollY / total;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  function getTarget(s: number): WP {
    let i = 0;
    for (; i < breaks.length - 2; i++) { if (s <= breaks[i + 1]) break; }
    const lo = breaks[i], hi = breaks[i + 1];
    const raw = Math.max(0, Math.min(1, (s - lo) / (hi - lo)));
    const t = easeInOutCubic(raw);
    const a = path[i], b = path[i + 1];
    return {
      px: lerp(a.px, b.px, t), py: lerp(a.py, b.py, t), pz: lerp(a.pz, b.pz, t),
      lx: lerp(a.lx, b.lx, t), ly: lerp(a.ly, b.ly, t), lz: lerp(a.lz, b.lz, t),
    };
  }

  // ── Eye fade: exits gracefully after hero section ──────────────────────
  // Fully visible until scroll=0.18, fades out by 0.28
  function getEyeFade(s: number): number {
    return 1.0 - smoothstep(0.18, 0.28, s);
  }

  let clock = 0;
  let rafId = 0;

  function tick() {
    rafId = requestAnimationFrame(tick);
    clock += 0.002;

    // ── Entry dolly — cinematic push-in (asymptotic decay) ──────────────
    entryDollyZ *= 0.991;

    // ── Scroll — faster lerp = more responsive feel ──────────────────────
    scrollSmooth += (scrollRaw - scrollSmooth) * 0.036;
    const tgt = getTarget(scrollSmooth);
    const L = 0.038;
    cam.px += (tgt.px - cam.px) * L;
    cam.py += (tgt.py - cam.py) * L;
    cam.pz += (tgt.pz - cam.pz) * L;
    cam.lx += (tgt.lx - cam.lx) * L;
    cam.ly += (tgt.ly - cam.ly) * L;
    cam.lz += (tgt.lz - cam.lz) * L;

    // ── Mouse parallax (hero only, fades with scroll) ────────────────────
    smoothMX += (rawMX - smoothMX) * 0.012;
    smoothMY += (rawMY - smoothMY) * 0.012;
    const pw = Math.max(0, 1 - scrollSmooth * 6.0) * (lowFi ? 0.2 : 1);

    camera.position.set(
      cam.px + smoothMX * 0.11 * pw,
      cam.py - smoothMY * 0.08 * pw,
      cam.pz + entryDollyZ,
    );
    camera.lookAt(cam.lx, cam.ly, cam.lz);

    // ══════════════════════════════════════════════════════════════════════
    //  EYE — rich idle animation (always running, even before any scroll)
    //
    //  Three independent oscillators:
    //   1. Vertical breathe: slow, heavy (0.38 Hz)
    //   2. Y-axis scan: ultra-slow lateral gaze (0.11 Hz, 0.06 rad range)
    //   3. X-axis tilt: imperceptible micro-rock (0.17 Hz, 0.012 rad)
    //
    //  Plus a "consciousness pulse" — emissive intensity of keyLight
    //  beats at a different frequency (0.55 Hz), not tied to breathe.
    //  This creates the sense the eye is "thinking".
    // ══════════════════════════════════════════════════════════════════════
    const eyeFade = getEyeFade(scrollSmooth);
    eyeGroup.visible = eyeFade > 0.01;

    if (eyeGroup.visible) {
      const breatheY = Math.sin(clock * 0.38 * Math.PI * 2) * 0.5 + 0.5; // 0–1
      const consciousness = Math.sin(clock * 0.55 * Math.PI * 2) * 0.5 + 0.5;

      // Vertical float — subtle but present
      eyeGroup.position.y = -0.10 + Math.sin(clock * 0.38 * Math.PI * 2) * 0.028;

      // Slow scan: eye "looks around" very deliberately
      eyeGroup.rotation.y = -0.42 + Math.sin(clock * 0.07 * Math.PI * 2) * 0.05;
      // Micro-tilt: barely noticeable, adds organic feel
      eyeGroup.rotation.x = 0.16 + Math.sin(clock * 0.17 * Math.PI * 2) * 0.012;

      // Apply fade (model becomes transparent as camera moves past it)
      eyeGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.transparent = true;
              mat.opacity = eyeFade;
            }
          });
        }
      });

      // Key light — "consciousness" breathing (independent frequency)
      keyLight.intensity = 68 + consciousness * 12;
      // Lens spot — slow fade with breathe for catch-light shimmer
      lensSpot.intensity = 58 + breatheY * 10;
      // Rim — counter-phase for sculptural depth cross-fade
      rimLight.intensity = 22 + (1 - breatheY) * 8;
    }

    // ══════════════════════════════════════════════════════════════════════
    //  IDLE AMBIENT ORBS — drift slowly in 3D space near the eye
    //  Only visible in hero section, fade out with scroll
    // ══════════════════════════════════════════════════════════════════════
    const orbFade = Math.max(0, 1 - scrollSmooth * 8.0);
    orbs.forEach((o) => {
      const angle = clock * o.speed + o.phase;
      o.light.position.set(
        o.baseX + Math.cos(angle) * o.radius,
        o.baseY + Math.sin(angle * 0.7) * o.radius * 0.6,
        o.baseZ + Math.sin(angle * 1.2) * o.radius * 0.4,
      );
      // Base intensity * fade — orbs disappear as user scrolls
      o.light.intensity = orbFade * (1.5 + Math.sin(clock * 0.9 + o.phase) * 0.4);
    });

    // ── RING ──────────────────────────────────────────────────────────────
    const ra = clock * 0.22;
    const rb = clock * -0.15;
    const rr = 4.6;
    ringLightA.position.set(Math.cos(ra) * rr, Math.sin(ra) * rr, 0.8);
    ringLightB.position.set(Math.cos(rb) * rr * 0.85, Math.sin(rb) * rr * 0.85, -0.6);
    const ringFade = smoothstep(0.42, 0.58, scrollSmooth)
      * (1 - smoothstep(0.86, 0.98, scrollSmooth));
    ringGroup.visible = ringFade > 0.005;
    ringLightA.intensity = 28 * ringFade;
    ringLightB.intensity = 18 * ringFade;
    if (ringGroup.visible) {
      ring.rotation.z = clock * 0.04; // slow ring spin
    }

    // ── STAR ──────────────────────────────────────────────────────────────
    const starFade = smoothstep(0.76, 0.90, scrollSmooth);
    const starBeat = Math.sin(clock * 1.2) * 0.5 + 0.5;
    starMat.opacity = starFade * (0.6 + starBeat * 0.4);
    star.scale.setScalar(4.0 + starBeat * 1.5);
    starLight.intensity = starFade * (3 + starBeat * 4);

    // ── MILESTONE BEACONS ─────────────────────────────────────────────────
    const beaconZoneT = smoothstep(0.62, 0.76, scrollSmooth)
      * (1 - smoothstep(0.88, 0.96, scrollSmooth));
    beaconGroup.visible = beaconZoneT > 0.005;
    const beaconProgress = smoothstep(0.62, 0.90, scrollSmooth) * BEACON_COUNT;
    beacons.forEach((b) => {
      const lit = smoothstep(b.idx - 0.3, b.idx + 0.3, beaconProgress);
      const pulse = Math.sin(clock * 1.8 + b.idx) * 0.5 + 0.5;
      b.mat.emissiveIntensity = (0.2 + lit * (1.6 + pulse * 0.6)) * beaconZoneT;
    });
    beaconLight.intensity = 8 * beaconZoneT;
    beaconLight.position.y = lerp(0, (BEACON_COUNT - 1) * 1.1, Math.min(1, beaconProgress / BEACON_COUNT));

    // ══════════════════════════════════════════════════════════════════════
    //  ASTRONAUT — Education section reveal
    //
    //  Fade in: 0.52–0.63   Fade out: 0.72–0.80
    //  Wider visible window = user has time to appreciate it
    //  Slow rotation + gentle float = floating in zero-G
    //  Key + rim lights ramp with fade for dramatic reveal
    // ══════════════════════════════════════════════════════════════════════
    const astronautFade = smoothstep(0.46, 0.56, scrollSmooth)
      * (1 - smoothstep(0.78, 0.90, scrollSmooth));
    astronautGroup.visible = astronautFade > 0.005;
    // Key light intensity: 0 → 22 with fade
    astronautKey.intensity = astronautFade * 28;
    astronautRim.intensity = astronautFade * 18;

    if (astronautGroup.visible) {
      // Zero-G float: gentle Y bob
      astronautGroup.position.set(
        2.5 + Math.sin(clock * 0.12) * 0.08,
        -10.7 + Math.sin(clock * 0.18) * 0.10,
        -23.4 + Math.cos(clock * 0.15) * 0.05
      );
      // Slow rotation on Y: 0.06 rad/s — languid, space-like
      const educationProgress = THREE.MathUtils.clamp(
        (scrollSmooth - 0.46) / (0.90 - 0.46),
        0,
        1
      );

      // Better initial angle (more front-facing)
      // Scroll slowly rotates the astronaut across the section
      astronautGroup.rotation.y = Math.PI * 1.5;
      // Small natural drift
      astronautGroup.rotation.x = Math.PI * .02;
      // Slight tilt toward viewer as it appears
      astronautGroup.rotation.z = Math.PI * 1.75;

      astronautGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mats = Array.isArray(child.material) ? child.material : [child.material];
          mats.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.transparent = true;
              mat.opacity = astronautFade;
            }
          });
        }
      });
    }

    if (bloomPass && grainPass) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  tick();

  // ── Teardown ───────────────────────────────────────────────────────────
  const dispose = () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('scroll', onScroll);
    [ringGeo, beaconGeo, railGeo].forEach((g) => g.dispose());
    [ringMat, starMat, railMat].forEach((m) => m.dispose());
    beacons.forEach((b) => { b.mesh.geometry.dispose(); b.mat.dispose(); });
    starTex.dispose();
    renderer.dispose();
    if (composer) composer.dispose();
  };
  window.addEventListener('beforeunload', dispose, { once: true });
}