// ═══════════════════════════════════════════════════
//  THREE.JS — FULL 3D HERO SCENE
// ═══════════════════════════════════════════════════
(function () {
  const canvas = document.getElementById("three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    58,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(4, 0, 18);

  // ── CARD GROUP ──
  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardGeo = new THREE.BoxGeometry(7.5, 4.7, 0.2);
  const cardMat = new THREE.MeshPhongMaterial({
    color: 0x2d1b69,
    specular: 0x8b5cf6,
    shininess: 90,
    transparent: true,
    opacity: 0.93,
  });
  const card = new THREE.Mesh(cardGeo, cardMat);
  cardGroup.add(card);

  // gradient face
  const faceGeo = new THREE.PlaneGeometry(7.5, 4.7);
  const faceMat = new THREE.MeshBasicMaterial({
    color: 0x5b21b6,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });
  const face = new THREE.Mesh(faceGeo, faceMat);
  face.position.z = 0.11;
  cardGroup.add(face);

  // shiny edge
  const edgeMat = new THREE.LineBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.6,
  });
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(cardGeo),
    edgeMat,
  );
  cardGroup.add(edges);

  // chip
  const chipGeo = new THREE.BoxGeometry(1.05, 0.82, 0.07);
  const chipMat = new THREE.MeshPhongMaterial({
    color: 0xd4a020,
    specular: 0xffd700,
    shininess: 130,
  });
  const chip = new THREE.Mesh(chipGeo, chipMat);
  chip.position.set(-2.4, 0.95, 0.13);
  cardGroup.add(chip);
  // chip lines
  [-0.2, 0, 0.2].forEach((dy) => {
    const g = new THREE.PlaneGeometry(0.88, 0.04);
    const m = new THREE.MeshBasicMaterial({
      color: 0xb08010,
      transparent: true,
      opacity: 0.55,
    });
    const l = new THREE.Mesh(g, m);
    l.position.set(-2.4, 0.95 + dy, 0.17);
    cardGroup.add(l);
  });

  // number dots
  const dg = new THREE.SphereGeometry(0.06, 6, 6);
  const dm = new THREE.MeshBasicMaterial({
    color: 0xa78bfa,
    transparent: true,
    opacity: 0.65,
  });
  for (let g = 0; g < 4; g++)
    for (let d = 0; d < 4; d++) {
      const dot = new THREE.Mesh(dg, dm);
      dot.position.set(-3.1 + g * 1.95 + d * 0.26, -0.85, 0.13);
      cardGroup.add(dot);
    }

  // name bar
  const nb = new THREE.Mesh(
    new THREE.PlaneGeometry(2.6, 0.11),
    new THREE.MeshBasicMaterial({
      color: 0xc4b5fd,
      transparent: true,
      opacity: 0.38,
    }),
  );
  nb.position.set(-1.9, -1.6, 0.13);
  cardGroup.add(nb);

  // circles (network)
  [
    [-0.28, 0xee3333],
    [0.28, 0xff9900],
  ].forEach(([ox, col]) => {
    const rg = new THREE.RingGeometry(0.38, 0.6, 32);
    const rm = new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: 0.72,
      side: THREE.DoubleSide,
    });
    const rc = new THREE.Mesh(rg, rm);
    rc.position.set(2.7 + ox, 1.22, 0.13);
    cardGroup.add(rc);
  });

  // inner glow plane
  const glowGeo = new THREE.PlaneGeometry(7.5, 4.7);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x2255ff,
    transparent: true,
    opacity: 0.04,
    depthWrite: false,
  });
  const glowPlane = new THREE.Mesh(glowGeo, glowMat);
  glowPlane.position.z = 0.12;
  cardGroup.add(glowPlane);

  cardGroup.position.set(9.5, 0, 0);
  cardGroup.rotation.y = -0.3;
  cardGroup.rotation.x = 0.1;

  // ── CARD 2 ──
  const c2g = new THREE.Group();
  scene.add(c2g);
  const c2geo = new THREE.BoxGeometry(7.5, 4.7, 0.15);
  c2g.add(
    new THREE.Mesh(
      c2geo,
      new THREE.MeshPhongMaterial({
        color: 0x2d1b69,
        transparent: true,
        opacity: 0.6,
      }),
    ),
  );
  c2g.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(c2geo),
      new THREE.LineBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.32,
      }),
    ),
  );
  c2g.position.set(10.5, 1.3, -1.3);
  c2g.rotation.set(0.06, -0.18, 0.1);

  // ── CARD 3 ──
  const c3g = new THREE.Group();
  scene.add(c3g);
  const c3geo = new THREE.BoxGeometry(7.5, 4.7, 0.12);
  c3g.add(
    new THREE.Mesh(
      c3geo,
      new THREE.MeshPhongMaterial({
        color: 0x1e1b4b,
        transparent: true,
        opacity: 0.4,
      }),
    ),
  );
  c3g.add(
    new THREE.LineSegments(
      new THREE.EdgesGeometry(c3geo),
      new THREE.LineBasicMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.22,
      }),
    ),
  );
  c3g.position.set(8.3, -1.1, -2.4);
  c3g.rotation.set(0.18, -0.5, -0.1);

  // ── PARTICLES ──
  const N = 2200;
  const pos = new Float32Array(N * 3),
    col = new Float32Array(N * 3),
    sz = new Float32Array(N);
  const pal = [
    new THREE.Color(0x6d28d9),
    new THREE.Color(0xa855f7),
    new THREE.Color(0x7c3aed),
    new THREE.Color(0xa855f7),
    new THREE.Color(0x8b5cf6),
    new THREE.Color(0xc084fc),
  ];
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 65;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 45;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 32 - 4;
    const c = pal[Math.floor(Math.random() * pal.length)];
    col[i * 3] = c.r;
    col[i * 3 + 1] = c.g;
    col[i * 3 + 2] = c.b;
    sz[i] = Math.random() * 2.4 + 0.4;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const pm = new THREE.PointsMaterial({
    size: 0.11,
    vertexColors: true,
    transparent: true,
    opacity: 0.52,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(pg, pm);
  scene.add(particles);

  // ── ORBS ──
  function addOrb(color, x, y, z, r, wi = true) {
    const g = new THREE.SphereGeometry(r, 32, 32);
    const m = new THREE.MeshPhongMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.16,
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    if (wi) {
      const wm = new THREE.Mesh(
        g.clone(),
        new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.06,
        }),
      );
      wm.position.copy(mesh.position);
      wm.scale.setScalar(1.05);
      scene.add(wm);
    }
    return mesh;
  }
  const orb1 = addOrb(0x6d28d9, -11, 4, -9, 3.8);
  const orb2 = addOrb(0xa855f7, 13, -5, -11, 2.9);
  const orb3 = addOrb(0x7c3aed, -3, -9, -13, 4.4);

  // ── TORII ──
  function addTorus(r, tube, color, x, y, z, rx, ry, rz, op = 0.3) {
    const m = new THREE.Mesh(
      new THREE.TorusGeometry(r, tube, 16, 100),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: op }),
    );
    m.position.set(x, y, z);
    m.rotation.set(rx, ry, rz);
    scene.add(m);
    return m;
  }
  const t1 = addTorus(
    2.4,
    0.06,
    0x8b5cf6,
    3.8,
    0,
    0.35,
    Math.PI / 2.2,
    0,
    0,
    0.38,
  );
  const t2 = addTorus(
    3.2,
    0.04,
    0x7c3aed,
    3.8,
    0,
    0.35,
    Math.PI / 2.8,
    0,
    0.3,
    0.2,
  );
  const t3 = addTorus(
    4.0,
    0.03,
    0xa855f7,
    3.8,
    0,
    0.35,
    Math.PI / 2.5,
    0.4,
    0.1,
    0.12,
  );

  // ── GRID ──
  const grid = new THREE.GridHelper(70, 35, 0x3b1d8a, 0x1e1240);
  grid.position.y = -8;
  grid.material.transparent = true;
  grid.material.opacity = 0.22;
  scene.add(grid);

  // ── EXTRA 3D GEOMETRY: Floating Octahedra ──
  const octa1Mat = new THREE.MeshPhongMaterial({ color: 0x7c3aed, emissive: 0x4c1d95, emissiveIntensity: 0.3, transparent: true, opacity: 0.35, wireframe: false });
  const octa1 = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), octa1Mat);
  octa1.position.set(-10, 5, -5);
  scene.add(octa1);
  const octa1Wire = new THREE.Mesh(new THREE.OctahedronGeometry(0.95, 0), new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.5 }));
  octa1Wire.position.copy(octa1.position);
  scene.add(octa1Wire);

  const octa2 = new THREE.Mesh(new THREE.OctahedronGeometry(1.3, 0), new THREE.MeshPhongMaterial({ color: 0x8b5cf6, emissive: 0x6d28d9, emissiveIntensity: 0.25, transparent: true, opacity: 0.25 }));
  octa2.position.set(14, -3, -8);
  scene.add(octa2);
  const octa2Wire = new THREE.Mesh(new THREE.OctahedronGeometry(1.35, 0), new THREE.MeshBasicMaterial({ color: 0xc4b5fd, wireframe: true, transparent: true, opacity: 0.4 }));
  octa2Wire.position.copy(octa2.position);
  scene.add(octa2Wire);

  // ── EXTRA: Floating Icosahedra ──
  const ico1 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 0), new THREE.MeshPhongMaterial({ color: 0x6d28d9, emissive: 0x4c1d95, emissiveIntensity: 0.4, transparent: true, opacity: 0.2 }));
  ico1.position.set(-14, -4, -6);
  scene.add(ico1);
  const ico1Wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.15, 0), new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.45 }));
  ico1Wire.position.copy(ico1.position);
  scene.add(ico1Wire);

  const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 0), new THREE.MeshPhongMaterial({ color: 0xa855f7, emissive: 0x7c3aed, emissiveIntensity: 0.3, transparent: true, opacity: 0.3 }));
  ico2.position.set(11, 7, -4);
  scene.add(ico2);
  const ico2Wire = new THREE.Mesh(new THREE.IcosahedronGeometry(0.75, 0), new THREE.MeshBasicMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.5 }));
  ico2Wire.position.copy(ico2.position);
  scene.add(ico2Wire);

  // ── EXTRA: Small floating spheres cluster ──
  const smallSpheres = [];
  const sPositions = [[-7,2,-3],[9,4,-5],[-5,-5,-7],[7,-6,-4],[-12,1,-6],[12,3,-7]];
  sPositions.forEach(([x,y,z], i) => {
    const r = 0.25 + Math.random() * 0.2;
    const colors = [0x7c3aed, 0x8b5cf6, 0xa855f7, 0x6d28d9, 0xc084fc, 0x4c1d95];
    const sm = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), new THREE.MeshPhongMaterial({ color: colors[i % colors.length], emissive: 0x3b1d8a, emissiveIntensity: 0.6, transparent: true, opacity: 0.6 }));
    sm.position.set(x, y, z);
    scene.add(sm);
    smallSpheres.push({ mesh: sm, offset: i * 1.2 });
  });

  // ── EXTRA: A second torus at different angle ──
  const t4 = addTorus(1.8, 0.08, 0xa855f7, -8, 3, -5, Math.PI / 3, Math.PI / 4, 0, 0.25);
  const t5 = addTorus(5.0, 0.025, 0x6d28d9, 3.8, 0, 0.35, Math.PI / 2, Math.PI / 5, 0, 0.1);

  // ── EXTRA: Wireframe cube ──
  const wCubeGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
  const wCube = new THREE.LineSegments(new THREE.EdgesGeometry(wCubeGeo), new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.3 }));
  wCube.position.set(-9, -3, -4);
  scene.add(wCube);

  const wCube2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.8, 1.8, 1.8)), new THREE.LineBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.25 }));
  wCube2.position.set(10, -5, -6);
  scene.add(wCube2);

  // ── LIGHTS ──
  scene.add(new THREE.AmbientLight(0x0f0a1e, 1.3));
  const bl = new THREE.PointLight(0x6d28d9, 3.5, 32);
  bl.position.set(5, 5, 9);
  scene.add(bl);
  const cl = new THREE.PointLight(0xa855f7, 2.2, 28);
  cl.position.set(-7, -3, 7);
  scene.add(cl);
  const pl = new THREE.PointLight(0x7c3aed, 2.0, 22);
  pl.position.set(-2, 7, 5);
  scene.add(pl);

  // ── MOUSE ──
  let mx = 0,
    my = 0;
  document.addEventListener("mousemove", (e) => {
    mx = (e.clientX / window.innerWidth - 0.5) * 2;
    my = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function render() {
    requestAnimationFrame(render);
    t += 0.008;

    // cards float
    cardGroup.position.y = Math.sin(t) * 0.6;
    cardGroup.rotation.y = -0.3 + mx * 0.13 + Math.sin(t * 0.4) * 0.04;
    cardGroup.rotation.x = 0.1 - my * 0.07;

    c2g.position.y = 1.3 + Math.sin(t + 0.9) * 0.42;
    c2g.rotation.z = 0.1 + Math.sin(t * 0.5) * 0.03;

    c3g.position.y = -1.1 + Math.sin(t + 1.7) * 0.46;
    c3g.rotation.z = -0.1 + Math.sin(t * 0.55) * 0.025;

    // torus spin
    t1.rotation.z = t * 0.32;
    t2.rotation.z = -t * 0.19;
    t3.rotation.z = t * 0.13;
    t3.rotation.y = t * 0.08;
    if(typeof t4 !== 'undefined'){t4.rotation.z = -t * 0.24; t4.rotation.x = t * 0.15;}
    if(typeof t5 !== 'undefined'){t5.rotation.z = t * 0.07; t5.rotation.x = -t * 0.04;}
    // octahedra spin
    if(typeof octa1 !== 'undefined'){octa1.rotation.x=t*0.4;octa1.rotation.y=t*0.35;octa1.rotation.z=t*0.2;octa1Wire.rotation.copy(octa1.rotation);}
    if(typeof octa2 !== 'undefined'){octa2.rotation.x=-t*0.3;octa2.rotation.y=t*0.45;octa2Wire.rotation.copy(octa2.rotation);}
    // icosahedra spin
    if(typeof ico1 !== 'undefined'){ico1.rotation.x=t*0.25;ico1.rotation.y=-t*0.4;ico1Wire.rotation.copy(ico1.rotation);}
    if(typeof ico2 !== 'undefined'){ico2.rotation.x=-t*0.35;ico2.rotation.z=t*0.28;ico2Wire.rotation.copy(ico2.rotation);}
    // small spheres float
    if(typeof smallSpheres !== 'undefined'){smallSpheres.forEach(({mesh,offset})=>{mesh.position.y+=Math.sin(t*0.8+offset)*0.01;mesh.rotation.y=t*0.5+offset;});}
    // wireframe cubes spin
    if(typeof wCube !== 'undefined'){wCube.rotation.x=t*0.22;wCube.rotation.y=t*0.3;wCube.rotation.z=t*0.15;}
    if(typeof wCube2 !== 'undefined'){wCube2.rotation.x=-t*0.18;wCube2.rotation.y=-t*0.25;wCube2.rotation.z=t*0.12;}

    // orbs breathe
    [orb1, orb2, orb3].forEach((o, i) => {
      const s = 1 + Math.sin(t * 0.7 + i) * 0.055;
      o.scale.setScalar(s);
    });

    // particles drift
    particles.rotation.y = t * 0.011;
    particles.rotation.x = t * 0.004;

    // light pulse
    bl.intensity = 3.2 + Math.sin(t * 1.2) * 0.9;
    cl.intensity = 2.2 + Math.sin(t * 0.8 + 1) * 0.65;
    pl.intensity = 2.0 + Math.sin(t * 1.1 + 2) * 0.55;

    // camera drift
    camera.position.x = mx * 0.55;
    camera.position.y = -my * 0.38;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  render();
})();

// ─── SCROLL REVEAL ────────
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.1, rootMargin: "0px 0px -36px 0px" },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// ─── NAV ────────
window.addEventListener("scroll", () =>
  document.getElementById("nav").classList.toggle("scrolled", scrollY > 50),
);

// ─── SMOOTH SCROLL ────────
document.querySelectorAll('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (!id || id === '#' || id.startsWith('javascript')) return;
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }),
);

// ─────────────────────────────────────────────────────────────
//  PREMIUM MICRO-INTERACTIONS
// ─────────────────────────────────────────────────────────────

// ── CURSOR GLOW ──
(function () {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;
  let visible = false;
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
    if (!visible) {
      visible = true;
      glow.style.opacity = '1';
    }
  });
  document.addEventListener('mouseleave', () => {
    visible = false;
    glow.style.opacity = '0';
  });
})();

// ── BUTTON RIPPLE ──
(function () {
  function addRipple(e) {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top  - size / 2;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
  document.querySelectorAll('.btn-cta-main, .btn-cta-big, .btn-nav, .btn-form, .send-btn').forEach((btn) => {
    btn.addEventListener('click', addRipple);
  });
})();

// ── COUNTER ANIMATION FOR HERO METRICS ──
(function () {
  const targets = [
    { el: null, query: '.metric-val', targets: [] }
  ];

  // collect metric-val elements
  const metricEls = document.querySelectorAll('.metric-val');
  if (!metricEls.length) return;

  function animateCounter(el, duration) {
    const raw = el.textContent.trim();
    // parse out numeric part
    const match = raw.match(/[\d,.]+/);
    if (!match) return;
    const numStr = match[0].replace(/,/g, '');
    const finalNum = parseFloat(numStr);
    if (isNaN(finalNum)) return;

    const prefix = raw.slice(0, raw.indexOf(match[0]));
    const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
    const isFloat = numStr.includes('.');
    const decimals = isFloat ? (numStr.split('.')[1] || '').length : 0;
    const start = performance.now();

    function frame(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * finalNum;
      let display;
      if (isFloat) {
        display = current.toFixed(decimals);
      } else {
        display = Math.round(current).toLocaleString();
      }
      el.textContent = prefix + display + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Store original values
  const originals = [];
  metricEls.forEach((el) => originals.push(el.textContent.trim()));

  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        const vals = parent.querySelectorAll('.metric-val');
        vals.forEach((el, i) => {
          el.textContent = originals[i] || el.textContent;
          animateCounter(el, 1600);
        });
        metricObserver.unobserve(parent);
      }
    });
  }, { threshold: 0.4 });

  const metricsContainer = document.querySelector('.hero-metrics');
  if (metricsContainer) metricObserver.observe(metricsContainer);
})();

// ── PARALLAX TILT ON HERO PANEL ──
(function () {
  const panel = document.querySelector('.hero-panel');
  if (!panel) return;
  const inner = panel.querySelector(':scope > div');
  if (!inner) return;

  document.addEventListener('mousemove', (e) => {
    const rect = panel.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    const rotX = -dy * 6;
    const rotY =  dx * 6;
    inner.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.01)`;
  });

  panel.addEventListener('mouseleave', () => {
    inner.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
  });
})();

// ── SECURITY SCORE BAR ANIMATION ──
(function () {
  const fill = document.getElementById('score-fill');
  if (!fill) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => fill.classList.add('animate'), 200);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const bar = document.getElementById('security-score-bar');
  if (bar) obs.observe(bar);
})();
// ─── LIVE TRANSACTION TICKER ────────
(function () {
  const scroll = document.getElementById('lt-scroll');
  if (!scroll) return;

  const names = ['Rahul M.','Priya S.','Alice K.','Bob T.','Sneha R.','Arjun K.','Marcus J.','Riya P.','Dev S.','Ananya B.','Kenji T.','Layla H.'];
  const actions = ['sent','received','transferred','paid','topped up'];
  const amounts = [420, 1200, 500, 850, 2500, 750, 3200, 180, 990, 1550, 670, 4100, 320, 2200];
  const types = ['UPI', 'Voice Pay ⚡', 'Instant', 'Card', 'Net Banking'];
  const colors = ['rgba(74,222,128,0.15)', 'rgba(96,165,250,0.15)', 'rgba(167,139,250,0.15)', 'rgba(251,191,36,0.15)', 'rgba(6,182,212,0.15)'];
  const textColors = ['#4ade80', '#60a5fa', '#a78bfa', '#fbbf24', '#22d3ee'];

  function makeItems() {
    const items = [];
    for (let i = 0; i < 16; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const amount = amounts[Math.floor(Math.random() * amounts.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const isOut = action === 'sent' || action === 'transferred' || action === 'paid';
      const ci = Math.floor(Math.random() * colors.length);
      items.push({ name, action, amount, type, isOut, bg: colors[ci], tc: textColors[ci] });
    }
    return items;
  }

  function renderTicker() {
    const items = [...makeItems(), ...makeItems()]; // duplicate for seamless loop
    const inner = document.createElement('div');
    inner.className = 'lt-items';
    items.forEach(tx => {
      const el = document.createElement('div');
      el.className = 'lt-item';
      el.innerHTML = `<span class="lt-ico" style="background:${tx.bg};color:${tx.tc};font-size:0.7rem">${tx.isOut ? '↑' : '↓'}</span><span><strong style="color:rgba(238,242,255,0.9)">${tx.name}</strong> ${tx.action}</span><span class="lt-amt${tx.isOut ? ' out' : ''}">${tx.isOut ? '−' : '+'}₹${tx.amount.toLocaleString()}</span><span style="color:rgba(238,242,255,0.35);font-size:0.72rem">${tx.type}</span>`;
      inner.appendChild(el);
    });
    scroll.innerHTML = '';
    scroll.appendChild(inner);
    // adjust animation speed to content width
    const duration = items.length * 1.4;
    inner.style.animationDuration = duration + 's';
  }

  renderTicker();
  // Refresh ticker every 30s with new random data
  setInterval(renderTicker, 30000);
})();

// ─── HAMBURGER MENU ────────
(function () {
  const btn = document.getElementById('hamburger');
  if (!btn) return;

  // Build mobile nav dynamically
  const mobileNav = document.createElement('div');
  mobileNav.className = 'mobile-nav';
  mobileNav.innerHTML = `
    <a href="#features">Features</a>
    <a href="#voice">Voice Pay</a>
    <a href="#how">How It Works</a>
    <a href="#trust">Security</a>
    <a href="#pricing">Pricing</a>
    <div class="mobile-nav-btns">
      <button class="btn-ghost mobile-signin">Sign In</button>
      <button class="btn-nav mobile-signup">Get Started</button>
    </div>
  `;
  document.getElementById('nav').after(mobileNav);

  let open = false;
  function toggle() {
    open = !open;
    btn.classList.toggle('open', open);
    mobileNav.classList.toggle('open', open);
  }

  btn.addEventListener('click', (e) => { e.stopPropagation(); toggle(); });

  // close on link click
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => { if (open) toggle(); });
  });

  // close on outside click
  document.addEventListener('click', (e) => {
    if (open && !mobileNav.contains(e.target) && e.target !== btn) toggle();
  });

  // wire mobile auth buttons (wait for main auth to init)
  document.addEventListener('DOMContentLoaded', () => {}, { once: true });
  setTimeout(() => {
    mobileNav.querySelector('.mobile-signin')?.addEventListener('click', () => {
      document.querySelector('.btn-ghost:not(.mobile-signin)')?.click();
      if (open) toggle();
    });
    mobileNav.querySelector('.mobile-signup')?.addEventListener('click', () => {
      document.querySelector('.btn-nav:not(.mobile-signup)')?.click();
      if (open) toggle();
    });
  }, 500);
})();

// ─── IMPROVED COUNTER ANIMATIONS ────────
(function() {
  // Stat cards in trust section
  const bigNum = document.querySelector('.big-num');
  if (bigNum) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim(); // e.g. "10,000+"
        const match = raw.match(/[\d,]+/);
        if (!match) return;
        const final = parseInt(match[0].replace(/,/g,''));
        const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
        let start = null;
        const dur = 1800;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          const cur = Math.round(ease * final);
          el.textContent = cur.toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    obs.observe(bigNum);
  }
})();
// ─── WIRE js-open-signup BUTTONS ────────
// These are anchor tags that should open the signup modal
// They need to be wired after the auth system initialises
(function() {
  function wireSignupLinks() {
    document.querySelectorAll('a.js-open-signup').forEach(el => {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        // trigger the first .btn-nav (Get Started) click which opens signup
        const btn = document.querySelector('.btn-nav:not(.mobile-signup)');
        if (btn) btn.click();
      });
    });
  }
  // Try immediately and again after auth system loads
  wireSignupLinks();
  setTimeout(wireSignupLinks, 800);
})();

// ─── FIXED COUNTER ANIMATION ────────
// Replaces the broken one — uses a single IntersectionObserver,
// stores originals BEFORE hero renders, adds .counting flash class
(function() {
  const metricEls = document.querySelectorAll('.metric-val');
  if (!metricEls.length) return;

  // Grab original text at parse time (before any mutation)
  const originals = Array.from(metricEls).map(el => el.textContent.trim());
  let fired = false;

  function animateVal(el, from, to, prefix, suffix, isFloat, decimals, duration) {
    el.classList.add('counting');
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      const cur = from + (to - from) * ease;
      el.textContent = prefix + (isFloat ? cur.toFixed(decimals) : Math.round(cur).toLocaleString()) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.classList.remove('counting');
    }
    requestAnimationFrame(tick);
  }

  function runCounters() {
    metricEls.forEach((el, i) => {
      const raw = originals[i];
      const match = raw.match(/([\d,.]+)/);
      if (!match) return;
      const numStr = match[1].replace(/,/g, '');
      const final = parseFloat(numStr);
      if (isNaN(final)) return;
      const prefix = raw.slice(0, raw.indexOf(match[1]));
      const suffix = raw.slice(raw.indexOf(match[1]) + match[1].length);
      const isFloat = numStr.includes('.');
      const decimals = isFloat ? (numStr.split('.')[1] || '').length : 0;
      animateVal(el, 0, final, prefix, suffix, isFloat, decimals, 1800 + i * 200);
    });
  }

  const obs = new IntersectionObserver(entries => {
    if (fired) return;
    if (entries.some(e => e.isIntersecting)) {
      fired = true;
      runCounters();
      obs.disconnect();
    }
  }, { threshold: 0.3 });

  const container = document.querySelector('.hero-metrics');
  if (container) obs.observe(container);
})();

// ─── LOTTIE ANIMATIONS ────────
(function() {
  if (typeof lottie === 'undefined') return;

  // Inline Lottie JSON data for a simple mic pulse (hand-crafted minimal)
  // Using LottieFiles-compatible format — simple pulsing circle animation
  const micLottieData = {
    v: '5.7.4', fr: 30, ip: 0, op: 60, w: 120, h: 120, nm: 'mic-pulse',
    assets: [],
    layers: [{
      ddd: 0, ind: 1, ty: 4, nm: 'ring', sr: 1,
      ks: {
        o: { a: 1, k: [{ i:{x:[.5],y:[1]}, o:{x:[.5],y:[0]}, t: 0, s: [80] }, { t: 60, s: [80] }] },
        r: { a: 0, k: 0 }, p: { a: 0, k: [60,60,0] }, a: { a: 0, k: [0,0,0] },
        s: { a: 1, k: [
          { i:{x:[.5],y:[1.5]}, o:{x:[.5],y:[0]}, t: 0, s: [100,100,100] },
          { i:{x:[.5],y:[1]}, o:{x:[.5],y:[0]}, t: 30, s: [115,115,100] },
          { t: 60, s: [100,100,100] }
        ]}
      },
      shapes: [{
        ty: 'gr', it: [
          { ty: 'el', p: { a: 0, k: [0,0] }, s: { a: 0, k: [56,56] } },
          { ty: 'st', c: { a: 0, k: [0.384,0.533,0.933,1] }, o: { a: 0, k: 100 }, w: { a: 0, k: 3 }, lc: 2, lj: 2 },
          { ty: 'fl', c: { a: 0, k: [0.047,0.114,0.22,1] }, o: { a: 0, k: 100 } },
          { ty: 'tr', p: { a: 0, k: [0,0] }, a: { a: 0, k: [0,0] }, s: { a: 0, k: [100,100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } }
        ]
      }],
      ip: 0, op: 60, st: 0
    }]
  };

  // Try to init Lottie on voice modal open
  let micAnim = null;
  const observer = new MutationObserver(() => {
    const voiceModal = document.getElementById('voice-pay-modal');
    if (!voiceModal || !voiceModal.classList.contains('active')) return;
    const wrap = document.querySelector('.voice-anim-wrap');
    if (!wrap || wrap.dataset.lottieInit) return;
    wrap.dataset.lottieInit = '1';
    // Replace static bars with lottie div
    try {
      wrap.innerHTML = '<div id="lottie-mic" style="width:80px;height:80px;margin:0 auto"></div>';
      micAnim = lottie.loadAnimation({
        container: document.getElementById('lottie-mic'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: micLottieData
      });
    } catch(e) {
      // fallback — restore bars
      wrap.innerHTML = '<div class="voice-bar"></div>'.repeat(5);
    }
  });
  observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });

  // Payment success Lottie in toast
  // Patch showToast to use Lottie checkmark for success toasts
  const _origShowToast = window.__origShowToast;
})();

// ─── VOICE CONFIRMED STATE ────────
// Override voice pay logic to show confirmed animation
(function() {
  // Wait for voice modal events
  const statusEl = document.getElementById('voice-status');
  if (!statusEl) return;

  // Intercept status updates to trigger confirmed state
  let _lastText = '';
  const _observer = new MutationObserver(() => {
    const text = statusEl.textContent;
    if (text && text.startsWith('✅ Detected:') && text !== _lastText) {
      _lastText = text;
      setTimeout(() => {
        const listeningState = document.getElementById('voice-listening-state');
        const confirmedState = document.getElementById('voice-confirmed-state');
        const confirmedText = document.getElementById('voice-confirmed-text');
        if (!listeningState || !confirmedState) return;

        // Extract what was said
        const said = text.replace('✅ Detected: ', '').replace(/"/g,'');
        if (confirmedText) confirmedText.textContent = `"${said}"`;

        listeningState.style.opacity = '0';
        setTimeout(() => {
          listeningState.style.display = 'none';
          confirmedState.style.display = 'block';
          confirmedState.style.opacity = '0';
          requestAnimationFrame(() => {
            confirmedState.style.opacity = '1';
          });
        }, 250);
      }, 200);
    }
    // Reset on modal close
    const voiceModal = document.getElementById('voice-pay-modal');
    if (voiceModal && !voiceModal.classList.contains('active')) {
      const listeningState = document.getElementById('voice-listening-state');
      const confirmedState = document.getElementById('voice-confirmed-state');
      if (listeningState) { listeningState.style.display = ''; listeningState.style.opacity = '1'; }
      if (confirmedState) { confirmedState.style.display = 'none'; }
      _lastText = '';
    }
  });
  _observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class'] });
})();
// ─── 3D CARD TILT ────────────────────────────────────────────
// Mouse-tracking perspective tilt for feature cards, pricing cards,
// testimonial cards, step cards, and trust badges
(function () {
  const TILT_MAX = 12;   // max tilt degrees for cards
  const BADGE_MAX = 7;   // gentler tilt for trust badges
  const STEP_MAX  = 8;

  function applyTilt(el, e, maxDeg) {
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);  // -1 to 1
    const dy = (e.clientY - cy) / (r.height / 2);  // -1 to 1
    const rotX = -dy * maxDeg;
    const rotY =  dx * maxDeg;
    // Subtle lift: more tilt = more Z lift
    const lift = Math.min(Math.sqrt(dx*dx + dy*dy) * 6, 6);
    el.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-${4 + lift}px) scale(1.01)`;
    el.classList.add('tilting');
    el.classList.remove('snap-back');
  }

  function resetTilt(el) {
    el.classList.remove('tilting');
    el.classList.add('snap-back');
    el.style.transform = '';
    // Remove snap-back class after animation completes
    setTimeout(() => el.classList.remove('snap-back'), 460);
  }

  function attachTilt(selector, maxDeg) {
    document.querySelectorAll(selector).forEach(el => {
      el.addEventListener('mousemove', e => applyTilt(el, e, maxDeg));
      el.addEventListener('mouseleave', () => resetTilt(el));
      // Touch support
      el.addEventListener('touchmove', e => {
        if (e.touches.length === 1) applyTilt(el, e.touches[0], maxDeg * 0.6);
      }, { passive: true });
      el.addEventListener('touchend', () => resetTilt(el));
    });
  }

  // Wait for DOM ready
  function init() {
    attachTilt('.f-card',       TILT_MAX);
    attachTilt('.pricing-card', TILT_MAX);
    attachTilt('.tcard',        TILT_MAX - 3);
    attachTilt('.step',         STEP_MAX);
    attachTilt('.tbadge',       BADGE_MAX);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-attach after dashboard is shown (cards are inside landing page so always visible)
  // but re-run after any dynamic content injection
  const _tiltObserver = new MutationObserver(() => {
    // Only reattach if new cards appeared without listeners
    document.querySelectorAll('.f-card:not([data-tilt])').forEach(el => {
      el.setAttribute('data-tilt', '1');
    });
  });
  _tiltObserver.observe(document.body, { childList: true, subtree: true });
})();

// ── NAV ACTIVE STATE ON CLICK ──
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navLinks.forEach(l => l.classList.remove('active'));
      if (!this.getAttribute('onclick') && this.getAttribute('href') !== '#') {
        this.classList.add('active');
      }
    });
  });
})();

// ── STEP CARD SPOTLIGHT GLOW ──
(function () {
  document.querySelectorAll('.step').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();