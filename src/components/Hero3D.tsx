'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene
    const scene = new THREE.Scene();
    const w = el.clientWidth, h = el.clientHeight;
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Colors
    const GREEN  = new THREE.Color('#2E4432');
    const RED    = new THREE.Color('#DD2326');
    const YELLOW = new THREE.Color('#F6DE22');
    const WHITE  = new THREE.Color('#FFFFFF');

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(5, 8, 5);
    scene.add(dir);
    const redLight = new THREE.PointLight(RED.getHex(), 2, 10);
    redLight.position.set(-4, 1, 2);
    scene.add(redLight);
    const yellowLight = new THREE.PointLight(YELLOW.getHex(), 1.5, 10);
    yellowLight.position.set(4, 1, 2);
    scene.add(yellowLight);

    // ── LEFT BLOCK: Manufacturer (factory shape) ──
    const mfgGroup = new THREE.Group();
    mfgGroup.position.set(-3.8, 0, 0);

    // Main building
    const building = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 2, 0.8),
      new THREE.MeshStandardMaterial({ color: RED, roughness: 0.3, metalness: 0.4 })
    );
    mfgGroup.add(building);

    // Chimney
    const chimney = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 0.8),
      new THREE.MeshStandardMaterial({ color: GREEN, roughness: 0.5 })
    );
    chimney.position.set(-0.3, 1.4, 0);
    mfgGroup.add(chimney);

    // Roof ridge
    const roofGeo = new THREE.ConeGeometry(1.05, 0.6, 4);
    const roof = new THREE.Mesh(roofGeo, new THREE.MeshStandardMaterial({ color: new THREE.Color('#1A2A1D'), roughness: 0.4 }));
    roof.position.y = 1.3;
    roof.rotation.y = Math.PI / 4;
    mfgGroup.add(roof);

    // Windows
    for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) {
      const w = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.28, 0.05),
        new THREE.MeshStandardMaterial({ color: YELLOW, emissive: YELLOW, emissiveIntensity: 0.6 })
      );
      w.position.set(-0.32 + c * 0.68, 0.25 - r * 0.7, 0.43);
      mfgGroup.add(w);
    }
    scene.add(mfgGroup);

    // Label plane behind left card
    const mkLabel = (text: string, color: THREE.Color) => {
      const cv = document.createElement('canvas');
      cv.width = 512; cv.height = 128;
      const ctx = cv.getContext('2d')!;
      ctx.fillStyle = 'transparent';
      ctx.clearRect(0, 0, 512, 128);
      ctx.font = 'bold 52px Montserrat, Arial';
      ctx.fillStyle = '#' + color.getHexString();
      ctx.textAlign = 'center';
      ctx.fillText(text, 256, 80);
      const tex = new THREE.CanvasTexture(cv);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(3, 0.75),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
      );
      return m;
    };

    const mfgLabel = mkLabel('MANUFACTURER', WHITE);
    mfgLabel.position.set(-3.8, -1.8, 0);
    scene.add(mfgLabel);

    // ── CENTER: Ashoka A diamond mediator ──
    const centerGroup = new THREE.Group();

    // Octahedron (diamond) core
    const diamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.9, 0),
      new THREE.MeshStandardMaterial({ color: RED, roughness: 0.1, metalness: 0.7, emissive: RED, emissiveIntensity: 0.3 })
    );
    centerGroup.add(diamond);

    // Ring around diamond
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.06, 16, 64),
      new THREE.MeshStandardMaterial({ color: YELLOW, metalness: 0.8, roughness: 0.1, emissive: YELLOW, emissiveIntensity: 0.4 })
    );
    ring.rotation.x = Math.PI / 2;
    centerGroup.add(ring);

    // Second ring tilted
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.04, 16, 64),
      new THREE.MeshStandardMaterial({ color: WHITE, metalness: 0.6, roughness: 0.2, emissive: WHITE, emissiveIntensity: 0.1 })
    );
    ring2.rotation.z = Math.PI / 3;
    centerGroup.add(ring2);

    scene.add(centerGroup);

    const centerLabel = mkLabel('ASHOKA AGENCIES', YELLOW);
    centerLabel.position.set(0, -1.8, 0);
    scene.add(centerLabel);

    // ── RIGHT: Wholesaler (shop shape) ──
    const whlGroup = new THREE.Group();
    whlGroup.position.set(3.8, 0, 0);

    const shop = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.6, 0.8),
      new THREE.MeshStandardMaterial({ color: GREEN, roughness: 0.3, metalness: 0.4 })
    );
    whlGroup.add(shop);

    // Awning
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.18, 1),
      new THREE.MeshStandardMaterial({ color: YELLOW, roughness: 0.4 })
    );
    awning.position.set(0, 0.95, 0.1);
    whlGroup.add(awning);

    // Door
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.6, 0.05),
      new THREE.MeshStandardMaterial({ color: new THREE.Color('#1A2A1D') })
    );
    door.position.set(0, -0.52, 0.43);
    whlGroup.add(door);

    // Shop windows
    for (let i = 0; i < 2; i++) {
      const sw = new THREE.Mesh(
        new THREE.BoxGeometry(0.42, 0.38, 0.05),
        new THREE.MeshStandardMaterial({ color: WHITE, emissive: WHITE, emissiveIntensity: 0.15 })
      );
      sw.position.set(-0.43 + i * 0.88, 0.1, 0.43);
      whlGroup.add(sw);
    }

    // Flat roof parapet
    const parapet = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.22, 0.9),
      new THREE.MeshStandardMaterial({ color: RED, roughness: 0.5 })
    );
    parapet.position.y = 0.91;
    whlGroup.add(parapet);

    scene.add(whlGroup);

    const whlLabel = mkLabel('WHOLESALER', WHITE);
    whlLabel.position.set(3.8, -1.8, 0);
    scene.add(whlLabel);

    // ── FLOW PARTICLES along arcs ──
    const particleCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pProgress = new Float32Array(particleCount).map(() => Math.random());
    const pSide = new Uint8Array(particleCount).map(() => Math.random() > 0.5 ? 0 : 1); // 0=left→center, 1=center→right

    for (let i = 0; i < particleCount * 3; i++) pPos[i] = 0;
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));

    const pMat = new THREE.PointsMaterial({ color: YELLOW, size: 0.08, transparent: true, opacity: 0.9, sizeAttenuation: true });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── CONNECTING TUBES ──
    const mkTube = (fromX: number, toX: number, color: THREE.Color) => {
      const pts = [];
      for (let i = 0; i <= 20; i++) {
        const t = i / 20;
        const x = fromX + (toX - fromX) * t;
        const y = Math.sin(t * Math.PI) * 0.8;
        pts.push(new THREE.Vector3(x, y, 0));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.TubeGeometry(curve, 40, 0.03, 8, false);
      const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.5, emissive: color, emissiveIntensity: 0.3 });
      return new THREE.Mesh(geo, mat);
    };
    scene.add(mkTube(-2.8, -0.9, RED));
    scene.add(mkTube(0.9, 2.8, YELLOW));

    // ── BACKGROUND STARS ──
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(1200);
    for (let i = 0; i < 1200; i++) starPos[i] = (Math.random() - 0.5) * 40;
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.35 })));

    // ── MOUSE PARALLAX ──
    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ── ANIMATION LOOP ──
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Gentle parallax
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Center diamond spin
      centerGroup.rotation.y = t * 0.5;
      centerGroup.rotation.x = Math.sin(t * 0.3) * 0.2;

      // Buildings float
      mfgGroup.position.y = Math.sin(t * 0.7) * 0.15;
      whlGroup.position.y = Math.sin(t * 0.7 + Math.PI) * 0.15;

      // Particle flow
      const pos = pGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < particleCount; i++) {
        pProgress[i] += 0.004;
        if (pProgress[i] > 1) pProgress[i] = 0;
        const p = pProgress[i];
        const side = pSide[i];
        const fromX = side === 0 ? -2.8 : 0.9;
        const toX   = side === 0 ? -0.9 : 2.8;
        const x = fromX + (toX - fromX) * p;
        const y = Math.sin(p * Math.PI) * 0.8;
        pos.setXYZ(i, x, y, 0);
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', backgroundColor: '#1A2A1D' }}>
      {/* Three.js canvas mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Gradient overlay — top for navbar readability */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(180deg, rgba(26,42,29,0.6) 0%, rgba(26,42,29,0.0) 30%, rgba(26,42,29,0.0) 65%, rgba(26,42,29,0.85) 100%)'
      }} />

      {/* Hero copy — bottom left */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-16 pb-12 md:pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="flex items-center gap-2 mb-5 w-fit px-4 py-1.5 rounded-full"
          style={{ border: '1px solid rgba(246,222,34,0.4)', background: 'rgba(246,222,34,0.08)' }}>
          <span className="w-2 h-2 rounded-full" style={{ background: '#F6DE22', animation: 'pulse-dot 2s infinite' }} />
          <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: '#F6DE22' }}>Kidswear Trade Mediator · Est. India</span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}
          className="font-serif font-black uppercase leading-[0.88] mb-6"
          style={{ fontSize: 'clamp(2.8rem,8vw,7rem)', color: '#fff', letterSpacing: '-0.01em' }}>
          Your Trusted<br />
          <span style={{ color: '#DD2326' }}>Bridge</span> Between<br />
          Makers & <span style={{ color: '#F6DE22' }}>Markets.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.8 }}
          className="text-base md:text-lg max-w-xl mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Ashoka Agencies LLP connects verified kidswear manufacturers directly with wholesale buyers across India — ensuring quality, trust, and profitable trade partnerships.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
          className="flex flex-wrap gap-4">
          <a href="#services" className="px-8 py-3.5 rounded-full font-bold text-base uppercase tracking-wide transition-transform hover:scale-105"
            style={{ background: '#DD2326', color: '#fff' }}>Explore Our Services</a>
          <a href="#contact" className="px-8 py-3.5 rounded-full font-bold text-base uppercase tracking-wide border transition-all hover:bg-white/8"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)', color: '#fff' }}>Partner With Us</a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 right-10 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.35)' }}>Scroll</span>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          className="w-px h-8" style={{ background: 'linear-gradient(to bottom, rgba(246,222,34,0.7), transparent)' }} />
      </motion.div>
    </section>
  );
}
