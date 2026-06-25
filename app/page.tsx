"use client";

import { useEffect } from "react";
import { initCinematicScene } from "./scene";

const htmlContent = `<!-- ── BOOT SEQUENCE ── -->
<div id="boot">
  <div class="boot-scanline"></div>
  <div class="boot-logo">Omni AgentOS</div>
  <div class="boot-lines" id="boot-lines"></div>
  <div class="boot-bar"><div class="boot-fill" id="boot-fill"></div></div>
</div>

<!-- ── CINEMATIC 3D SCENE ── -->
<canvas id="bg-canvas"></canvas>

<!-- ── GLOBAL AMBIENT ── -->
<div id="noise"></div>
<div id="progress-bar"></div>
<div id="cur-dot"></div>
<div id="cur-ring"></div>

<!-- ── NAV ── -->
<nav id="navbar">
  <div class="nav-logo">devraj.singh</div>
  <div class="nav-links">
    <a href="#about">About</a>
    <a href="#capabilities">Capabilities</a>
    <a href="#missions">Projects</a>
    <a href="#timeline">Education</a>
    <a href="#contact">Contact</a>
  </div>
  <a href="https://github.com/Devrajj-Singh" target="_blank" class="nav-gh">GitHub ↗</a>
</nav>

<!-- ═══════════════════════════════════════════════
     MOMENT 1 — BOOT / HERO
═══════════════════════════════════════════════ -->
<section id="hero">
  <div class="hero-grid" id="hero-grid"></div>
  <div class="hero-lights" id="hero-lights"></div>

  <div class="hero-content" id="hero-content">
    <div class="status-pill">
      <span class="status-dot"></span>
      Available — AI Systems Engineer
    </div>

    <h1 class="hero-name">
      <span>Devraj</span>
      <span>Singh</span>
    </h1>

    <div class="hero-typewriter">
      <span style="opacity:.4;font-size:.9em">// </span>
      <span id="tw-text"></span>
      <span class="tw-cursor"></span>
    </div>

    <p class="hero-sub">BCA (Hons) · Christ University Delhi NCR · Building AI systems that actually run in production.</p>

    <div class="hero-btns">
      <a href="#missions" class="btn btn-primary">View Projects ↓</a>
      <a href="https://www.linkedin.com/in/devraj-s/" target="_blank" class="btn btn-secondary">LinkedIn ↗</a>
    </div>
  </div>

  <div class="hero-scroll" id="hero-scroll">
    <span>scroll</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     MOMENT 2 — IDENTITY MODULE (About)
═══════════════════════════════════════════════ -->
<section id="about">
  <div class="si">
    <div class="about-grid">
      <div>
        <div class="reveal settle hidden">
          <div class="eyebrow"><div class="eyebrow-line" style="width:20px"></div>Identity Module</div>
          <h2 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3.2rem);font-weight:700;letter-spacing:-.035em;line-height:1.05;margin-bottom:1.2rem">
            Building systems<br>
            <span style="color:#7b7b96">that think.</span>
          </h2>
          <p style="color:#7b7b96;font-size:.95rem;line-height:1.82;margin-bottom:1rem">
            I'm Devraj — an AI/ML and full-stack developer at Christ University Delhi NCR. I build production AI systems: agentic workflows, distributed infrastructure, and LLM-powered applications that go beyond demos.
          </p>
          <p style="color:#7b7b96;font-size:.95rem;line-height:1.82">
            My work spans multi-agent orchestration, semantic search, and systems engineering in Rust. I'm drawn to the intersection of intelligence and infrastructure — where models meet the real world.
          </p>
          <div class="stat-row">
            <div class="stat"><span class="stat-val" style="color:#6c63ff">3.85</span><span class="stat-lbl">CGPA / 4.0</span></div>
            <div class="stat"><span class="stat-val" style="color:#38bdf8">O</span><span class="stat-lbl">Grade in DSA</span></div>
            <div class="stat"><span class="stat-val" style="color:#a78bfa">O</span><span class="stat-lbl">Disc. Math</span></div>
            <div class="stat"><span class="stat-val" style="color:#34d399">4+</span><span class="stat-lbl">Live Projects</span></div>
          </div>
        </div>
      </div>

      <div class="reveal drift hidden" style="transition-delay:.15s">
        <div class="interactive-card operator-card" style="background:rgba(255,255,255,.025);border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:2rem;font-family:'JetBrains Mono',monospace">
          <div style="font-size:.65rem;color:#6c63ff;letter-spacing:.15em;text-transform:uppercase;margin-bottom:1.2rem;display:flex;align-items:center;gap:.5rem">
            <span style="width:6px;height:6px;border-radius:50%;background:#4ade80;animation:pulse 2s infinite;box-shadow:0 0 6px #4ade80"></span>
            OPERATOR PROFILE
          </div>
          <div style="font-size:.78rem;color:#c4c4d8;display:flex;flex-direction:column;gap:.7rem">
            <div style="display:flex;justify-content:space-between;padding-bottom:.7rem;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="color:#7b7b96">DESIGNATION</span>
              <span>AI Systems Engineer</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-bottom:.7rem;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="color:#7b7b96">INSTITUTION</span>
              <span>Christ University NCR</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-bottom:.7rem;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="color:#7b7b96">CLEARANCE</span>
              <span style="color:#4ade80">Full-Stack · AI/ML</span>
            </div>
            <div style="display:flex;justify-content:space-between;padding-bottom:.7rem;border-bottom:1px solid rgba(255,255,255,.05)">
              <span style="color:#7b7b96">PRIMARY STACK</span>
              <span>Python · Rust · Next.js</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="color:#7b7b96">STATUS</span>
              <span style="color:#4ade80">Available for hire</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     MOMENT 3 — SYSTEM CAPABILITIES
     (replaces Knowledge Graph)
═══════════════════════════════════════════════ -->
<section id="capabilities">
  <div class="si" style="padding-top:5rem;padding-bottom:5rem">
    <div class="reveal settle hidden" style="margin-bottom:3.5rem">
      <div class="eyebrow"><div class="eyebrow-line" style="width:20px"></div>System Capabilities</div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;letter-spacing:-.035em;margin-bottom:.5rem">
        Engineered for<br><span style="color:#7b7b96">production.</span>
      </h2>
    </div>

    <div class="cap-grid" id="cap-grid"></div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     MOMENT 4 — MISSION ARCHIVE
═══════════════════════════════════════════════ -->
<section id="missions">
  <div class="si">
    <div class="reveal settle hidden" style="margin-bottom:4rem">
      <div class="eyebrow"><div class="eyebrow-line" style="width:20px"></div>Mission Archive</div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;letter-spacing:-.035em">
        Deployed systems.<br><span style="color:#7b7b96">Not demos.</span>
      </h2>
    </div>

    <div id="mission-list" style="display:flex;flex-direction:column;gap:2.5rem"></div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     TIMELINE — Education
═══════════════════════════════════════════════ -->
<section id="timeline">
  <div class="si">
    <div class="reveal hidden" style="margin-bottom:3rem">
      <div class="eyebrow"><div class="eyebrow-line" style="width:20px"></div>Mission Timeline</div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2rem,4vw,3rem);font-weight:700;letter-spacing:-.035em">
        Education &<br><span style="color:#7b7b96">Certifications.</span>
      </h2>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem" class="edu-grid">
      <div class="reveal hidden">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:#6c63ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1.2rem">Education Log</div>
        <div class="timeline">
          <div class="tl-item">
            <div class="tl-dot" style="border-color:#6c63ff;box-shadow:0 0 8px #6c63ff44"></div>
            <div class="tl-period" style="color:#6c63ff">2024 — Present</div>
            <div class="tl-title">BCA (Hons)</div>
            <div class="tl-sub">Christ University Delhi NCR</div>
            <div style="display:flex;flex-wrap:wrap;gap:.35rem">
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">AI & ML</span>
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">Full-Stack</span>
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">Systems</span>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-dot" style="border-color:#38bdf8;box-shadow:0 0 8px #38bdf844"></div>
            <div class="tl-period" style="color:#38bdf8">2022 — 2024</div>
            <div class="tl-title">Class 12th — PCM</div>
            <div class="tl-sub">Senior Secondary</div>
            <div style="display:flex;flex-wrap:wrap;gap:.35rem">
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">Physics</span>
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">Chemistry</span>
              <span style="font-size:.68rem;font-family:'JetBrains Mono',monospace;color:#7b7b96;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:.18rem .45rem">Mathematics</span>
            </div>
          </div>
        </div>
      </div>

      <div class="reveal hidden" style="transition-delay:.15s">
        <div style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:#6c63ff;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1.2rem">Certifications</div>
        <div id="cert-list" style="display:flex;flex-direction:column;gap:.45rem"></div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════════
     MOMENT 5 — COMMUNICATION TERMINAL
═══════════════════════════════════════════════ -->
<section id="contact">
  <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(56,189,248,.3),transparent)"></div>
  <div class="si" style="max-width:720px;text-align:center">
    <div class="reveal hidden">
      <div class="eyebrow" style="justify-content:center">
        <div class="eyebrow-line" style="width:20px"></div>
        Communication Terminal
        <div class="eyebrow-line" style="width:20px;background:linear-gradient(90deg,#a78bfa,#6c63ff)"></div>
      </div>
      <h2 style="font-family:'Space Grotesk',sans-serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:700;letter-spacing:-.035em;line-height:1.05;margin-bottom:1.2rem">
        Signal established.<br>
        <span style="color:#7b7b96">Channel open.</span>
      </h2>
      <p style="color:#7b7b96;font-size:.97rem;line-height:1.78;margin-bottom:3rem">
        Open to internships, research collaborations, AI systems projects, and full-stack roles. If you're building something ambitious — I want to hear about it.
      </p>
    </div>

    <div class="reveal hidden" style="transition-delay:.1s;margin-bottom:3rem">
      <div class="terminal interactive-card" id="contact-terminal">
        <div class="term-bar">
          <div class="term-dot" style="background:#ff5f57"></div>
          <div class="term-dot" style="background:#febc2e"></div>
          <div class="term-dot" style="background:#28c840"></div>
          <span class="term-title">mission-control ~ devraj@aios</span>
        </div>
        <div class="term-body" id="term-body">
          <span class="term-cursor"></span>
        </div>
      </div>
    </div>

    <div class="reveal hidden" style="transition-delay:.2s">
      <div style="display:flex;flex-direction:column;align-items:center;gap:2rem">
        <a href="https://www.linkedin.com/in/devraj-s/" target="_blank" class="btn btn-primary" style="font-size:.9rem;padding:1rem 2.8rem">Connect on LinkedIn ↗</a>
        <div class="contact-links">
          <a href="https://github.com/Devrajj-Singh" target="_blank" class="clink interactive-card" id="clink-gh">
            <div class="clink-icon" style="background:rgba(108,99,255,.12);border:1px solid rgba(108,99,255,.28);color:#6c63ff">gh</div>
            <div class="clink-lbl">GitHub</div>
          </a>
          <a href="https://www.linkedin.com/in/devraj-s/" target="_blank" class="clink interactive-card" id="clink-li">
            <div class="clink-icon" style="background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.28);color:#38bdf8">in</div>
            <div class="clink-lbl">LinkedIn</div>
          </a>
          <a href="mailto:devraj.singh@bcah.christuniversity.in" class="clink interactive-card" id="clink-em">
            <div class="clink-icon" style="background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.28);color:#a78bfa">@</div>
            <div class="clink-lbl">Email</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<footer>
  <span>© 2026 Devraj Singh</span>
  <span>AI Systems · Rust · Next.js</span>
</footer>`;

const projects = [
  { num: "01", title: "Omni AgentOS", role: "Full-Stack AI Developer & System Architect", badges: ["LangGraph", "RAG", "FastAPI", "WebSockets"], desc: "A full-stack AI workspace built on FastAPI, Next.js, LangGraph, and WebSockets. Multi-agent workflows with tool calling, autonomous execution, human-in-the-loop approvals, conversational memory, semantic search, RAG, repository intelligence, document ingestion, and web research.", stack: ["FastAPI", "Next.js", "LangGraph", "WebSockets", "ChromaDB", "RAG"], gh: "https://github.com/Devrajj-Singh/Omni-AgentOS", type: "Agentic AI System", a: "#6c63ff", b: "#a78bfa" },
  { num: "02", title: "Atlas Queue", role: "Distributed Systems Engineer", badges: ["Rust", "Distributed", "Async"], desc: "A distributed queue system in Rust — worker-based architecture for async task execution with retry handling, queue orchestration, and load balancing. Explores distributed communication patterns for AI agent systems with a focus on concurrency, reliability, and scalable task processing.", stack: ["Rust", "Concurrency", "Async", "Load Balancing"], gh: "https://github.com/Devrajj-Singh/Atlas-Queue", type: "Systems Engineering", a: "#f59e0b", b: "#34d399" },
  { num: "03", title: "CosmoLens AI", role: "AI/ML + Full-Stack Project Lead", badges: ["ML", "Next.js", "NASA Data"], desc: "A data-centric AI application for space exploration and planetary habitability analysis. Built the ML pipeline, NASA Exoplanet Archive dataset preprocessing, physics-based feature engineering, and full-stack integration.", stack: ["Next.js", "Python", "Scikit-Learn", "Pandas", "NumPy"], gh: "https://github.com/Devrajj-Singh/Cosmolens-AI", type: "AI/ML Application", a: "#38bdf8", b: "#6c63ff" },
  { num: "04", title: "Byte_Hive", role: "AI/ML Engineer + Full-Stack Contributor", badges: ["Groq", "Llama 3.3", "Payments"], desc: "A collaborative campus food-ordering platform. Built ByteBot — a context-aware student assistant and vendor copilot — plus Razorpay payments, EmailJS flows, QR pickup verification, and vendor logic.", stack: ["Next.js", "Groq", "Llama 3.3", "Razorpay", "PostgreSQL"], gh: "https://github.com/tanmaygoyal2007/Byte_Hive", type: "Full-Stack + AI", a: "#a78bfa", b: "#38bdf8" },
];

const certs = [
  "Machine Learning & Deep Learning",
  "Generative AI with Large Language Models",
  "Machine Learning in Production",
  "DevOps, DataOps & MLOps",
  "Prompt Engineering for ChatGPT",
  "Introduction to Git and GitHub",
];

// System capabilities data — each panel is a domain of expertise
const capabilities = [
  {
    id: "ai-systems",
    label: "01 / AI Systems",
    title: "AI Systems",
    accent: "#6c63ff",
    stack: ["LangGraph", "FastAPI", "ChromaDB", "RAG"],
    desc: "Multi-agent orchestration, agentic workflows with human-in-the-loop, semantic memory, and production inference pipelines.",
  },
  {
    id: "agentic-ai",
    label: "02 / Agentic AI",
    title: "Agentic AI",
    accent: "#a78bfa",
    stack: ["Tool Calling", "Auto-Exec", "MCP", "WebSearch"],
    desc: "Autonomous agent design with tool use, reflection loops, task decomposition, and multi-step reasoning under uncertainty.",
  },
  {
    id: "llm-engineering",
    label: "03 / LLM Engineering",
    title: "LLM Engineering",
    accent: "#38bdf8",
    stack: ["Prompt Eng.", "Fine-Tuning", "Groq", "Hugging Face"],
    desc: "LLM evaluation, prompt architecture, ONNX deployment, and integration with open-source model ecosystems.",
  },
  {
    id: "distributed",
    label: "04 / Distributed",
    title: "Distributed Systems",
    accent: "#34d399",
    stack: ["Event-Driven", "Concurrency", "WebSockets", "REST"],
    desc: "Distributed queues, async task execution, retry logic, and system design patterns for scalable AI infrastructure.",
  },
  {
    id: "rust",
    label: "05 / Rust",
    title: "Rust",
    accent: "#f59e0b",
    stack: ["Async/Await", "Tokio", "Concurrency", "WASM"],
    desc: "Systems programming for performance-critical infrastructure — zero-cost abstractions, memory safety, and fearless concurrency.",
  },
  {
    id: "cloud-devops",
    label: "06 / Cloud & DevOps",
    title: "Cloud & DevOps",
    accent: "#fb923c",
    stack: ["AWS", "Azure", "Docker", "CI/CD"],
    desc: "Container orchestration, cloud deployment pipelines, MLOps workflows, and infrastructure-as-code for AI-first systems.",
  },
];

const bootLines = [
  { t: "> OMNI_AGENTOS v4.2.1 booting...", c: "#4ade80" },
  { t: "> Initializing neural substrate...", c: "#38bdf8" },
  { t: "> Loading identity module: DEVRAJ_SINGH", c: "#38bdf8" },
  { t: "> Mounting system capabilities...", c: "#38bdf8" },
  { t: "> Deploying mission archive...", c: "#38bdf8" },
  { t: "> Communication channels: OPEN", c: "#a78bfa" },
  { t: "> System ready. Operator authenticated.", c: "#4ade80" },
];

function nextBootLine() {
  const rawBootLines = document.getElementById('boot-lines');
  const rawBootFill = document.getElementById('boot-fill');
  if (!(rawBootLines instanceof HTMLElement) || !(rawBootFill instanceof HTMLElement)) return;
  const bootLinesEl = rawBootLines;
  const bootFillEl = rawBootFill;
  let bootIdx = 0;
  function step() {
    if (bootIdx >= bootLines.length) {
      setTimeout(() => {
        const boot = document.getElementById('boot');
        if (boot) boot.classList.add('done');
        initMain();
      }, 500);
      return;
    }
    const l = bootLines[bootIdx];
    const el = document.createElement('div');
    el.className = 'boot-line';
    el.style.color = l.c;
    el.style.animationDelay = '0s';
    el.textContent = l.t;
    bootLinesEl.appendChild(el);
    bootFillEl.style.width = ((bootIdx + 1) / bootLines.length * 100) + '%';
    bootIdx += 1;
    setTimeout(step, bootIdx === 1 ? 600 : 250);
  }
  setTimeout(step, 400);
}

function initMain() {
  initCinematicScene();
  initCursor();
  initScroll();
  initTypewriter();
  initMissions();
  initCerts();
  initCapabilities();
  initInteractiveCards();
  initTerminal();
  initReveal();
}

function initCursor() {
  const dot = document.getElementById('cur-dot');
  const ring = document.getElementById('cur-ring');
  if (!(dot instanceof HTMLElement) || !(ring instanceof HTMLElement)) return;

  let mx = -200, my = -200;
  let rx = -200, ry = -200;
  let hovering = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 3.5}px,${my - 3.5}px)`;
  }, { passive: true });

  const LERP = 0.1;
  const animate = () => {
    rx += (mx - rx) * LERP;
    ry += (my - ry) * LERP;
    const s = hovering ? 1.7 : 1;
    const half = 17 * s;
    ring.style.transform = `translate(${rx - half}px,${ry - half}px)`;
    requestAnimationFrame(animate);
  };
  animate();

  document.querySelectorAll('a,button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      hovering = true;
      ring.style.width = ring.style.height = `${34 * 1.7}px`;
      ring.style.borderColor = 'rgba(108,99,255,.85)';
    });
    el.addEventListener('mouseleave', () => {
      hovering = false;
      ring.style.width = ring.style.height = '34px';
      ring.style.borderColor = 'rgba(108,99,255,.55)';
    });
  });
}

function initScroll() {
  const navbar = document.getElementById('navbar');
  const hc = document.getElementById('hero-content');
  const hg = document.getElementById('hero-grid');
  const hl = document.getElementById('hero-lights');
  const hs = document.getElementById('hero-scroll');
  const pb = document.getElementById('progress-bar');
  if (!navbar || !hc || !hg || !hl || !hs || !pb) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const total = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    pb.style.transform = `scaleX(${y / total})`;
    navbar.classList.toggle('scrolled', y > 60);

    const hp = Math.min(1, y / Math.max(1, window.innerHeight));
    hg.style.transform = `perspective(1000px) rotateX(${6 + hp * 22}deg) translateY(${hp * -32}px) scale(${1 + hp * 0.12})`;
    hl.style.transform = `translateY(${hp * 24}px)`;
    hc.style.transform = `translateY(${hp * -140}px) scale(${1 - hp * 0.1})`;
    hc.style.opacity = String(Math.max(0, 1 - hp * 1.7));
    hs.style.opacity = String(Math.max(0, 1 - hp * 3.5));
  }, { passive: true });
}

function initTypewriter() {
  const words = ["AI Systems Engineer", "Distributed Systems", "Agent Architect", "Full-Stack Developer"];
  let wi = 0;
  let displayed = "";
  let typing = true;
  const rawEl = document.getElementById('tw-text');
  if (!(rawEl instanceof HTMLElement)) return;
  const el = rawEl;

  function tick() {
    const word = words[wi];
    if (typing) {
      if (displayed.length < word.length) {
        displayed = word.slice(0, displayed.length + 1);
        el.textContent = displayed;
        setTimeout(tick, 68);
      } else {
        setTimeout(() => { typing = false; tick(); }, 2000);
      }
    } else {
      if (displayed.length > 0) {
        displayed = displayed.slice(0, -1);
        el.textContent = displayed;
        setTimeout(tick, 30);
      } else {
        wi = (wi + 1) % words.length;
        typing = true;
        tick();
      }
    }
  }

  tick();
}

function initMissions() {
  const list = document.getElementById('mission-list');
  if (!list) return;

  projects.forEach((p, i) => {
    const flip = i % 2 === 1;
    const card = document.createElement('div');
    card.className = 'reveal hidden mission-card interactive-card';
    card.style.transitionDelay = `${i * 0.08}s`;
    card.style.border = `1px solid ${p.a}22`;
    card.dataset.accent = p.a;
    card.style.background = `linear-gradient(${flip ? 225 : 135}deg, ${p.a}0a 0%, rgba(5,5,7,.98) 50%)`;
    card.style.boxShadow = `0 0 0 1px ${p.a}08, 0 24px 48px rgba(0,0,0,.4)`;
    card.innerHTML = `
      <div class="mission-top" style="background:linear-gradient(90deg,${flip ? 'transparent,' : ''}${p.a},${p.b}${flip ? '' : ',transparent'})"></div>
      <div class="mission-inner" style="grid-template-columns:${flip ? '1fr auto' : 'auto 1fr'}">
        ${!flip ? `<div class="mission-num-panel" style="padding:2.8rem 0 2.8rem 2.8rem;border-right:1px solid ${p.a}10">
          <div class="mission-num" style="color:${p.a}38">${p.num}</div>
          <div class="mission-type">${p.type}</div>
        </div>` : ''}
        <div class="mission-body" style="padding:2.8rem 3.2rem">
          <div style="display:flex;align-items:center;gap:.55rem;margin-bottom:.9rem;flex-wrap:wrap">
            ${p.badges.map((b) => `<span class="badge" style="color:${p.a};background:${p.a}0d;border:1px solid ${p.a}24">${b}</span>`).join('')}
          </div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:.68rem;color:#7b7b96;letter-spacing:.06em;margin-bottom:.5rem;text-transform:uppercase">${p.role}</div>
          <div class="mission-title" style="margin-bottom:.8rem">${p.title}</div>
          <p class="mission-desc">${p.desc}</p>
          <div style="display:flex;gap:.4rem;flex-wrap:wrap;margin-bottom:1.8rem">${p.stack.map((s) => `<span class="stack-tag">${s}</span>`).join('')}</div>
          ${p.gh !== '#' ? `<a href="${p.gh}" target="_blank" style="display:inline-flex;align-items:center;gap:.45rem;font-size:.76rem;font-family:'JetBrains Mono',monospace;color:${p.a};text-decoration:none;padding:.55rem 1.2rem;border:1px solid ${p.a}24;border-radius:8px;background:${p.a}08;transition:all .25s" onmouseover="this.style.background='${p.a}16';this.style.borderColor='${p.a}48';this.style.boxShadow='0 0 20px ${p.a}18'" onmouseout="this.style.background='${p.a}08';this.style.borderColor='${p.a}24';this.style.boxShadow='none'">View source ↗</a>` : ''}
        </div>
        ${flip ? `<div class="mission-num-panel" style="padding:2.8rem 2.8rem 2.8rem 0;align-items:flex-end;border-left:1px solid ${p.a}10">
          <div class="mission-num" style="color:${p.a}38">${p.num}</div>
          <div class="mission-type mission-type-r">${p.type}</div>
        </div>` : ''}
      </div>
    `;

    list.appendChild(card);
  });
}

function initCerts() {
  const list = document.getElementById('cert-list');
  if (!list) return;

  certs.forEach((c, i) => {
    const el = document.createElement('div');
    el.className = 'interactive-card cert-card';
    el.style.cssText = `display:flex;align-items:center;gap:.7rem;padding:.65rem .9rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.055);border-radius:9px;font-size:.8rem;color:#c4c4d8;opacity:0;animation:lineIn .5s ${0.4 + i * 0.08}s ease forwards;transition:all .3s;cursor:default`;
    el.innerHTML = `<span style="color:#6c63ff;font-size:.7rem;flex-shrink:0">✓</span>${c}`;
    el.onmouseenter = () => {
      el.style.borderColor = 'rgba(108,99,255,.22)';
      el.style.background = 'rgba(108,99,255,.055)';
      el.style.transform = 'translateX(5px)';
    };
    el.onmouseleave = () => {
      el.style.borderColor = 'rgba(255,255,255,.055)';
      el.style.background = 'rgba(255,255,255,.02)';
      el.style.transform = '';
    };
    list.appendChild(el);
  });
}

function initCapabilities() {
  const grid = document.getElementById('cap-grid');
  if (!grid) return;

  capabilities.forEach((cap, i) => {
    const panel = document.createElement('div');
    panel.className = 'cap-panel reveal hidden interactive-card';
    panel.style.transitionDelay = `${i * 0.07}s`;
    panel.dataset.accent = cap.accent;
    panel.innerHTML = `
      <div class="cap-border-top" style="background:linear-gradient(90deg,transparent,${cap.accent}60,transparent)"></div>
      <div class="cap-inner">
        <div class="cap-header">
          <span class="cap-label" style="color:${cap.accent}">${cap.label}</span>
        </div>
        <div class="cap-title">${cap.title}</div>
        <p class="cap-desc">${cap.desc}</p>
        <div class="cap-stack">
          ${cap.stack.map((s) => `<span class="cap-tag" style="color:${cap.accent};border-color:${cap.accent}22;background:${cap.accent}08">${s}</span>`).join('')}
        </div>
        <div class="cap-corner" style="background:${cap.accent}10;border-color:${cap.accent}20"></div>
        <div class="cap-glow" style="background:radial-gradient(circle at 50% 120%,${cap.accent}12 0%,transparent 70%)"></div>
      </div>
    `;

    grid.appendChild(panel);
  });
}

function initInteractiveCards() {
  const cards = document.querySelectorAll<HTMLElement>('.interactive-card');

  cards.forEach((card) => {
    const accent =
      card.dataset.accent ||
      card.style.borderColor.match(/#[0-9a-fA-F]{3,8}|rgba?\([^)]+\)/)?.[0] ||
      '#6c63ff';

    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      const isLarge = card.classList.contains('mission-card');
      const perspective = isLarge ? 1600 : 900;
      const tiltX = isLarge ? 2 : 5;
      const tiltY = isLarge ? 2.8 : 6;
      const lift = isLarge ? 12 : 8;

      card.style.transform = `perspective(${perspective}px) rotateX(${-y * tiltX}deg) rotateY(${x * tiltY}deg) translateZ(${lift}px)`;
      card.style.setProperty('--mx', `${50 + x * 75}%`);
      card.style.setProperty('--my', `${50 + y * 75}%`);
      card.style.setProperty('--card-accent', accent);

      const glow = card.querySelector<HTMLElement>('.cap-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at ${50 + x * 60}% ${100 + y * 60}%, ${accent}20 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');

      const glow = card.querySelector<HTMLElement>('.cap-glow');
      if (glow) {
        glow.style.background = `radial-gradient(circle at 50% 120%, ${accent}12 0%, transparent 70%)`;
      }
    });
  });
}

function initTerminal() {
  const rawBody = document.getElementById('term-body');
  const rawContactTerminal = document.getElementById('contact-terminal');
  if (!(rawBody instanceof HTMLElement) || !(rawContactTerminal instanceof HTMLElement)) return;
  const body = rawBody;
  const contactTerminal = rawContactTerminal;

  const script = [
    { t: "$ devraj --connect --mode=handshake", c: "#4ade80" },
    { t: "> Resolving identity...", c: "#38bdf8" },
    { t: "> SUBJECT: Devraj Singh", c: "#38bdf8" },
    { t: "> ROLE: AI Systems Engineer", c: "#38bdf8" },
    { t: "> LOCATION: Ghaziabad, UP — remote - hybrid - on-site  OK", c: "#38bdf8" },
    { t: "> STATUS: Available", c: "#4ade80" },
    { t: "> OPEN TO: Internships · Research · AI Systems", c: "#38bdf8" },
    { t: "", c: "" },
    { t: "> Connection established. Channel open.", c: "#a78bfa" },
  ];

  const obs = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    obs.disconnect();
    body.innerHTML = '';
    let i = 0;
    const cur = document.createElement('span');
    cur.className = 'term-cursor';
    body.appendChild(cur);
    function next() {
      if (i >= script.length) {
        cur.remove();
        return;
      }
      const l = script[i];
      const el = document.createElement('div');
      el.className = 'term-line';
      el.style.color = l.c || '#7b7b96';
      el.style.animationDelay = '0s';
      el.textContent = l.t || '\u00A0';
      body.insertBefore(el, cur);
      i += 1;
      setTimeout(next, i === 1 ? 400 : 150 + Math.random() * 100);
    }
    setTimeout(next, 600);
  }, { threshold: 0.2 });
  obs.observe(contactTerminal);
}

function initReveal() {
  const els = document.querySelectorAll('.reveal.hidden');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.remove('hidden');
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });
  els.forEach((el) => obs.observe(el));
}

export default function HomePage() {
  useEffect(() => {
    const wrapper = document.getElementById('page-wrapper');
    if (!wrapper) return;
    wrapper.innerHTML = htmlContent;
    nextBootLine();
  }, []);

  return <div id="page-wrapper" />;
}
