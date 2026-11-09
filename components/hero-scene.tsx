"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

/*
 * "An early idea → something people can use", in particles.
 * Each particle has two homes: a loose cloud (the idea) and a place on one of
 * three tilted orbits (the product). Scrolling the hero morphs one into the
 * other; the pointer tilts the whole system.
 */

const COUNT = 2600;
const RINGS = [
  { r: 1.55, tiltX: 0.38, tiltZ: -0.22, share: 0.26 },
  { r: 2.3, tiltX: -0.18, tiltZ: 0.3, share: 0.34 },
  { r: 3.05, tiltX: 0.12, tiltZ: -0.08, share: 0.4 },
];

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uFade;
  attribute vec3 aChaos;
  attribute vec3 aOrder;
  attribute float aSize;
  attribute float aDelay;
  attribute float aSpeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  vec3 rotY(vec3 p, float a) { float c = cos(a), s = sin(a); return vec3(c*p.x + s*p.z, p.y, -s*p.x + c*p.z); }

  void main() {
    float p = clamp((uProgress - aDelay) / 0.6, 0.0, 1.0);
    p = p * p * (3.0 - 2.0 * p);

    // the idea drifts; the product orbits
    vec3 chaos = aChaos + 0.12 * vec3(
      sin(uTime * 0.55 + aDelay * 41.0),
      cos(uTime * 0.47 + aDelay * 29.0),
      sin(uTime * 0.39 + aDelay * 17.0));
    vec3 order = rotY(aOrder, uTime * aSpeed);
    vec3 pos = mix(chaos, order, p);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * uPixelRatio * (32.0 / -mv.z);

    vColor = aColor;
    float depth = clamp(1.25 - (-mv.z - 5.5) * 0.22, 0.25, 1.0);
    vAlpha = mix(0.75, 0.95, p) * depth * uFade;
  }
`;

const fragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.6) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function ringMatrix(tiltX: number, tiltZ: number) {
  return new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(tiltX, 0, tiltZ));
}

export default function HeroScene({ trigger = "#top" }: { trigger?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the page still works without the scene
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 0, 8.2);

    // ---- particles
    const chaos = new Float32Array(COUNT * 3);
    const order = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const delay = new Float32Array(COUNT);
    const speed = new Float32Array(COUNT);
    const color = new Float32Array(COUNT * 3);

    const lilac = new THREE.Color("#dad1f9");
    const deep = new THREE.Color("#8f7fe0");
    const signal = new THREE.Color("#ffb547");
    const v = new THREE.Vector3();
    const mats = RINGS.map((r) => ringMatrix(r.tiltX, r.tiltZ));

    for (let i = 0; i < COUNT; i++) {
      // cloud: denser in the middle
      const u = Math.random(), w = Math.random();
      const th = 2 * Math.PI * u, ph = Math.acos(2 * w - 1);
      const rad = 3.0 * Math.cbrt(Math.random()) ** 1.3;
      chaos.set([rad * Math.sin(ph) * Math.cos(th) * 1.25, rad * Math.cos(ph) * 0.85, rad * Math.sin(ph) * Math.sin(th)], i * 3);

      // orbit
      const pick = Math.random();
      const k = pick < RINGS[0].share ? 0 : pick < RINGS[0].share + RINGS[1].share ? 1 : 2;
      const a = Math.random() * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.07;
      v.set(Math.cos(a) * (RINGS[k].r + jitter), (Math.random() - 0.5) * 0.04, Math.sin(a) * (RINGS[k].r + jitter)).applyMatrix4(mats[k]);
      order.set([v.x, v.y, v.z], i * 3);

      const node = i < 7; // a few bright "products" on the outer orbit
      if (node) {
        const na = (i / 7) * Math.PI * 2;
        v.set(Math.cos(na) * RINGS[2].r, 0, Math.sin(na) * RINGS[2].r).applyMatrix4(mats[2]);
        order.set([v.x, v.y, v.z], i * 3);
      }
      size[i] = node ? 10 : 1.4 + Math.random() * 2.2;
      delay[i] = Math.random() * 0.4;
      speed[i] = node ? 0.06 : 0.04 + k * 0.012 + Math.random() * 0.01;
      const c = i === 0 ? signal : node ? lilac : Math.random() < 0.55 ? deep : lilac;
      color.set([c.r, c.g, c.b], i * 3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(order, 3));
    geo.setAttribute("aChaos", new THREE.BufferAttribute(chaos, 3));
    geo.setAttribute("aOrder", new THREE.BufferAttribute(order, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    geo.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(color, 3));

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: reduce ? 1 : 0 },
      uPixelRatio: { value: dpr },
      uFade: { value: reduce ? 1 : 0 },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);

    // faint orbit lines that appear as the product takes shape
    const lineMat = new THREE.LineBasicMaterial({ color: 0xdad1f9, transparent: true, opacity: 0 });
    const lines = RINGS.map((r, k) => {
      const pts = Array.from({ length: 160 }, (_, j) => {
        const a = (j / 160) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(a) * r.r, 0, Math.sin(a) * r.r).applyMatrix4(mats[k]);
      });
      return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
    });

    const group = new THREE.Group();
    group.add(points, ...lines);
    group.position.x = 0.55;
    group.rotation.set(0.2, -0.4, 0);
    scene.add(group);

    // ---- size
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // ---- inputs: scroll progress and pointer
    let target = reduce ? 1 : 0;
    const st = reduce
      ? null
      : ScrollTrigger.create({
          trigger,
          start: "top top",
          end: "+=320",
          onUpdate: (self) => (target = self.progress),
        });
    if (!reduce) gsap.to(uniforms.uFade, { value: 1, duration: 2, ease: "power2.out", delay: 0.2 });

    const pointer = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.x = e.clientX / window.innerWidth - 0.5;
      pointer.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onPointer);

    // ---- loop, paused when off screen
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    const render = () => renderer.render(scene, camera);
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;
      uniforms.uProgress.value += (target - uniforms.uProgress.value) * 0.06;
      lineMat.opacity = Math.max(0, uniforms.uProgress.value - 0.5) * 0.35;
      group.rotation.y += (-0.4 + pointer.x * 0.5 + t * 0.04 - group.rotation.y) * 0.04;
      group.rotation.x += (0.2 + pointer.y * 0.3 - group.rotation.x) * 0.04;
      render();
    };
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    if (reduce) {
      lineMat.opacity = 0.18;
      render();
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      st?.kill();
      window.removeEventListener("pointermove", onPointer);
      geo.dispose();
      mat.dispose();
      lineMat.dispose();
      lines.forEach((l) => l.geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [trigger]);

  return (
    <div
      ref={host}
      aria-hidden
      className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent_0%,#000_28%,#000_100%)]"
    />
  );
}
