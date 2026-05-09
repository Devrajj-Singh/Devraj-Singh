"use client";

import Image from "next/image";
import type { CSSProperties, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const skillGroups = [
  {
    title: "AI & Machine Learning",
    accent: "cyan",
    skills: ["Machine Learning", "Scikit-Learn", "Random Forest", "Feature Engineering", "Pandas", "NumPy"],
  },
  {
    title: "Full-Stack Development",
    accent: "gold",
    skills: ["Next.js", "React.js", "Node.js", "Express.js", "FastAPI", "Firebase", "REST APIs"],
  },
  {
    title: "Languages & CS Core",
    accent: "purple",
    skills: ["Python", "JavaScript", "Java OOP", "Data Structures", "Operating Systems", "DBMS"],
  },
  {
    title: "Workflow & Systems",
    accent: "rose",
    skills: ["Git", "GitHub", "Version Control", "API Development", "Problem Solving", "Communication"],
  },
  {
    title: "Agentic AI & Automation",
    accent: "cyan",
    skills: ["MCP", "Playwright", "OCR", "Code Sandbox", "Repository Analysis", "Tool Calling"],
  },
  {
    title: "Product & Integrations",
    accent: "gold",
    skills: ["Razorpay", "EmailJS", "Groq", "LLM Prompts", "System Architecture", "Team Collaboration"],
  },
];

const projects = [
  {
    number: "01",
    title: "Omni-AgentOS",
    role: "Advanced AI Agent System",
    badges: ["MCP", "Agents", "Automation"],
    description:
      "A comprehensive multi-agent operating system that connects LLMs with real-world task execution. It uses Model Context Protocol, Playwright web navigation, OCR/vision, secure Python and JavaScript sandboxes, and repository intelligence for code analysis.",
    stack: ["MCP", "Playwright", "Python", "JavaScript", "Tesseract", "EasyOCR"],
  },
  {
    number: "02",
    title: "CosmoLens AI",
    role: "AI/ML + Full-Stack Project Lead",
    badges: ["AI", "ML", "Data"],
    description:
      "A data-centric AI application for space exploration and planetary habitability analysis. I worked on the ML pipeline, NASA Exoplanet Archive dataset preprocessing, physics-based feature engineering, and full-stack integration.",
    stack: ["Next.js", "Python", "Scikit-Learn", "Pandas", "NumPy", "NASA Data"],
  },
  {
    number: "03",
    title: "Byte_Hive",
    role: "AI/ML Engineer + Full-Stack Contributor",
    badges: ["Collab", "AI Bot", "Payments"],
    description:
      "A collaborative campus food-ordering platform where I built ByteBot, a context-aware student assistant and vendor copilot. I also implemented vendor logic, Razorpay payments, EmailJS flows, QR pickup verification, receipts, and operational actions.",
    stack: ["Next.js", "Groq", "Llama 3.3", "Razorpay", "EmailJS", "Postgres"],
  },
];

const stats = [
  ["2nd", "Year BCA (Hons)"],
  ["260+", "LinkedIn connections"],
  ["AI/ML", "Primary focus"],
  ["\u221e", "Curiosity Level"],
];

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let targetScrollY = window.scrollY;
    let smoothScrollY = targetScrollY;

    const stars = Array.from({ length: 130 }, (_, index) => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.2 + Math.random() * 1.8,
      radius: index % 9 === 0 ? 1.45 : 0.7 + Math.random() * 0.9,
      hue: index % 11 === 0 ? 48 : index % 5 === 0 ? 275 : 185,
      drift: 0.18 + Math.random() * 0.75,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const draw = (time: number) => {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.055;
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width * 0.5, height * 0.2, 0, width * 0.5, height * 0.5, height);
      gradient.addColorStop(0, "rgba(20, 19, 44, 0.82)");
      gradient.addColorStop(0.42, "rgba(5, 5, 16, 0.96)");
      gradient.addColorStop(1, "rgba(2, 3, 10, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star, index) => {
        const parallax = smoothScrollY * 0.000035 * star.z;
        const autonomousDrift = time * 0.000006 * star.drift;
        const x = ((star.x + Math.sin(time * 0.00009 + index) * 0.01 + autonomousDrift) % 1) * width;
        const y = ((((star.y + parallax * star.drift + time * 0.000004 * star.z) % 1) + 1) % 1) * height;
        const alpha = 0.35 + Math.sin(time * 0.001 + index) * 0.22;

        ctx.beginPath();
        ctx.fillStyle = `hsla(${star.hue}, 95%, 64%, ${alpha})`;
        ctx.shadowColor = `hsla(${star.hue}, 95%, 65%, 0.6)`;
        ctx.shadowBlur = 12;
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.strokeStyle = "rgba(0, 245, 255, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < stars.length - 1; i += 5) {
        const a = stars[i];
        const b = stars[i + 1];
        const ax = ((a.x + Math.sin(time * 0.00009 + i) * 0.01 + time * 0.000006 * a.drift) % 1) * width;
        const ay = ((((a.y + smoothScrollY * 0.000025 + time * 0.000004 * a.z) % 1) + 1) % 1) * height;
        const bx = ((b.x + Math.sin(time * 0.00009 + i + 1) * 0.01 + time * 0.000006 * b.drift) % 1) * width;
        const by = ((((b.y + smoothScrollY * 0.00003 + time * 0.000004 * b.z) % 1) + 1) % 1) * height;
        if (Math.abs(ax - bx) < 190 && Math.abs(ay - by) < 190) {
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}

function CursorSystem() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ringX = window.innerWidth / 2;
    let ringY = window.innerHeight / 2;
    let mouseX = ringX;
    let mouseY = ringY;
    let animationFrame = 0;

    const setHoverState = (isHovering: boolean) => {
      dotRef.current?.classList.toggle("is-hovering", isHovering);
      ringRef.current?.classList.toggle("is-hovering", isHovering);
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      glowRef.current?.style.setProperty("--x", `${mouseX}px`);
      glowRef.current?.style.setProperty("--y", `${mouseY}px`);
      dotRef.current?.style.setProperty("--x", `${mouseX}px`);
      dotRef.current?.style.setProperty("--y", `${mouseY}px`);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      setHoverState(Boolean(target.closest("a, button, .glass-card, .chip-row span, .stack-list span")));
    };

    const onOut = () => setHoverState(false);

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ringRef.current?.style.setProperty("--x", `${ringX}px`);
      ringRef.current?.style.setProperty("--y", `${ringY}px`);
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function ScrollScene3D() {
  const sceneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let targetScrollY = window.scrollY;
    let smoothScrollY = targetScrollY;
    let animationFrame = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const animate = () => {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.06;
      const depth = smoothScrollY * 0.045;
      const rotate = smoothScrollY * 0.018;

      if (sceneRef.current) {
        sceneRef.current.style.setProperty("--scene-depth", `${depth}px`);
        sceneRef.current.style.setProperty("--scene-up-strong", `${depth * -0.45}px`);
        sceneRef.current.style.setProperty("--scene-up", `${depth * -0.28}px`);
        sceneRef.current.style.setProperty("--scene-up-soft", `${depth * -0.18}px`);
        sceneRef.current.style.setProperty("--scene-down", `${depth * 0.25}px`);
        sceneRef.current.style.setProperty("--scene-down-soft", `${depth * 0.22}px`);
        sceneRef.current.style.setProperty("--scene-down-strong", `${depth * 0.35}px`);
        sceneRef.current.style.setProperty("--scene-rotate", `${rotate}deg`);
        sceneRef.current.style.setProperty("--scene-rotate-neg", `${rotate * -1}deg`);
      }

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="scroll-scene" ref={sceneRef} aria-hidden="true">
      <div className="wire-cube cube-one">
        <span />
        <span />
        <span />
      </div>
      <div className="wire-cube cube-two">
        <span />
        <span />
        <span />
      </div>
      <div className="scene-ring ring-one" />
      <div className="scene-ring ring-two" />
      <div className="scene-token token-ai">AI</div>
      <div className="scene-token token-api">API</div>
      <div className="scene-token token-ml">ML</div>
    </div>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);
}

function useTiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");

    const cleanups = Array.from(cards).map((card) => {
      const onMove = (event: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        card.style.setProperty("--spot-x", `${x * 100}%`);
        card.style.setProperty("--spot-y", `${y * 100}%`);
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 9}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`);
      };

      const onLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);
}

function useSmoothHeroParallax(heroRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let targetScrollY = window.scrollY;
    let smoothScrollY = targetScrollY;
    let animationFrame = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const animate = () => {
      smoothScrollY += (targetScrollY - smoothScrollY) * 0.075;
      const y = smoothScrollY * 0.08;
      const rotateX = Math.min(smoothScrollY * 0.015, 9);

      if (heroRef.current) {
        heroRef.current.style.transform = `translate3d(0, ${y}px, 0) rotateX(${rotateX}deg)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [heroRef]);
}

function useSmoothScrollProgress(progressRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    let targetProgress = 0;
    let smoothProgress = 0;
    let animationFrame = 0;

    const measure = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = scrollableHeight > 0 ? Math.min(window.scrollY / scrollableHeight, 1) : 0;
    };

    const animate = () => {
      smoothProgress += (targetProgress - smoothProgress) * 0.18;

      if (Math.abs(targetProgress - smoothProgress) < 0.001) {
        smoothProgress = targetProgress;
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scale3d(${smoothProgress}, 1, 1)`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [progressRef]);
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [navScrolled, setNavScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const activeSectionRef = useRef(activeSection);
  const navScrolledRef = useRef(navScrolled);
  useRevealOnScroll();
  useTiltCards();
  useSmoothHeroParallax(heroRef);
  useSmoothScrollProgress(progressRef);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;
        const shouldBeScrolled = scrollPosition > 36;

        if (navScrolledRef.current !== shouldBeScrolled) {
          navScrolledRef.current = shouldBeScrolled;
          setNavScrolled(shouldBeScrolled);
        }

        const current = navItems
          .map((item) => item.href.slice(1))
          .reverse()
          .find((id) => {
            const section = document.getElementById(id);
            return section ? scrollPosition + 140 >= section.offsetTop : false;
          });

        if (current && activeSectionRef.current !== current) {
          activeSectionRef.current = current;
          setActiveSection(current);
        }

        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main>
      <Starfield />
      <CursorSystem />
      <ScrollScene3D />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />

      <nav className={`nav-shell ${navScrolled ? "is-scrolled" : ""}`}>
        <a className="logo" href="#hero" aria-label="Devraj Singh home">
          <span>D</span>S
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => {
            const id = item.href.slice(1);
            return (
              <a className={activeSection === id ? "is-active" : ""} key={item.href} href={item.href}>
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>

      <section id="hero" className="hero-section">
        <div className="orbital orbital-one" aria-hidden="true" />
        <div className="orbital orbital-two" aria-hidden="true" />
        <div className="hero-inner" ref={heroRef}>
          <p className="availability-pill">Available for internships and collaborations</p>
          <p className="eyebrow">AI/ML engineer in progress | Full-stack developer | Tech enthusiast</p>
          <h1>
            Devraj
            <span> Singh</span>
          </h1>
          <p className="hero-copy">
            I build intelligent, real-world applications at the intersection of machine learning, clean backend systems,
            and polished Next.js interfaces.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#projects">
              View projects
            </a>
            <a className="secondary-action" href="#contact">
              Get in touch
            </a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section id="about" className="content-section about-grid" data-reveal>
        <div className="section-copy">
          <p className="section-kicker">01 / About</p>
          <h2>
            Building the <span>future</span>, one commit at a time.
          </h2>
          <div className="section-divider" />
          <div className="about-intro">
            <div className="profile-photo-wrap">
              <Image
                className="profile-photo"
                src="/profile.jpg"
                alt="Devraj Singh portrait"
                width={320}
                height={320}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
              <span className="profile-photo-fallback" aria-hidden="true">
                DS
              </span>
            </div>
            <div>
              <p>
                I am a BCA (Hons) student at Christ University, Delhi NCR, focused on building practical AI, machine
                learning, and full-stack systems that solve real problems instead of staying as experiments.
              </p>
              <p>
                My work sits at the intersection of intelligent automation, clean product engineering, and reliable
                backend logic. I enjoy turning complex ideas into usable applications with polished interfaces,
                structured APIs, safe AI actions, and maintainable code.
              </p>
            </div>
          </div>
          <p className="micro-line">Ghaziabad, Uttar Pradesh, India - open to hybrid and remote opportunities.</p>
        </div>
        <div className="stats-grid">
          {stats.map(([value, label], index) => (
            <div
              className={`glass-card stat-card ${value === "\u221e" ? "curiosity-stat" : ""}`}
              data-reveal
              data-tilt
              key={label}
              style={{ "--delay": `${index * 80}ms` } as CSSProperties}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="content-section" data-reveal>
        <p className="section-kicker">02 / Skills</p>
        <h2>
          Tech <span>arsenal</span>
        </h2>
        <div className="section-divider" />
        <div className="skill-grid">
          {skillGroups.map((group, index) => (
            <article
              className={`glass-card skill-card ${group.accent}`}
              data-reveal
              data-tilt
              key={group.title}
              style={{ "--delay": `${index * 90}ms` } as CSSProperties}
            >
              <div className="card-heading">
                <span aria-hidden="true" />
                <h3>{group.title}</h3>
              </div>
              <div className="chip-row">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="content-section" data-reveal>
        <p className="section-kicker">03 / Projects</p>
        <h2>
          Featured <span>work</span>
        </h2>
        <div className="section-divider" />
        <div className="project-grid">
          {projects.map((project, index) => (
            <article
              className="glass-card project-card"
              data-reveal
              data-tilt
              key={project.title}
              style={{ "--delay": `${index * 110}ms` } as CSSProperties}
            >
              <div className="project-topline">
                <div className="badge-row">
                  {project.badges.map((badge) => (
                    <span className="project-badge" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
                <strong>{project.number}</strong>
              </div>
              <p className="project-role">{project.role}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="education" className="content-section" data-reveal>
        <p className="section-kicker">04 / Education</p>
        <h2>
          Academic <span>journey</span>
        </h2>
        <div className="section-divider" />
        <div className="education-stack">
          <article className="glass-card education-card" data-reveal data-tilt>
            <div className="edu-icon">CU</div>
            <div>
              <p className="project-role">2025 - 2029 (Present Ongoing)</p>
              <h3>Bachelor of Computer Applications (Hons)</h3>
              <p>Christ University, Delhi NCR - Ghaziabad, India</p>
              <p>
                Currently strengthening core CS fundamentals including Data Structures, Operating Systems, Database
                Management Systems, algorithms, and object-oriented programming while building real-world AI and
                full-stack projects.
              </p>
              <div className="stack-list">
                {["Data Structures", "Operating Systems", "DBMS", "Algorithms", "OOP"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>

          <article
            className="glass-card education-card school-card"
            data-reveal
            data-tilt
            style={{ "--delay": "120ms" } as CSSProperties}
          >
            <div className="edu-icon school-icon">DAV</div>
            <div>
              <p className="project-role">Mar 2024 - Mar 2025</p>
              <h3>Class 12th, PCM</h3>
              <p>DAV Schools Network</p>
              <p>
                Completed senior secondary education with Physics, Chemistry, and Mathematics, building the analytical
                foundation that supports my current work in computer science, AI/ML, and engineering fundamentals.
              </p>
              <div className="stack-list">
                {["Physics", "Chemistry", "Mathematics", "Analytical Reasoning"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="content-section contact-grid" data-reveal>
        <div className="section-copy">
          <p className="section-kicker">05 / Contact</p>
          <h2>
            Let&apos;s <span>connect</span>
          </h2>
          <div className="section-divider" />
          <p>
            Open to internships, collaborations, AI/ML projects, and full-stack development opportunities where I can
            learn fast and contribute meaningfully.
          </p>
          <a className="primary-action" href="https://www.linkedin.com/in/devraj-s/" target="_blank" rel="noreferrer">
            View LinkedIn
          </a>
        </div>
        <div className="contact-list">
          <a
            className="glass-card contact-card"
            data-reveal
            data-tilt
            href="https://www.linkedin.com/in/devraj-s/"
            target="_blank"
            rel="noreferrer"
            style={{ "--delay": "80ms" } as CSSProperties}
          >
            <span className="contact-icon">IN</span>
            <span>
              <strong>LinkedIn</strong>
              linkedin.com/in/devraj-s
            </span>
          </a>
          <a
            className="glass-card contact-card"
            data-reveal
            data-tilt
            href="https://github.com/Devrajj-Singh"
            target="_blank"
            rel="noreferrer"
            style={{ "--delay": "160ms" } as CSSProperties}
          >
            <span className="contact-icon">GH</span>
            <span>
              <strong>GitHub</strong>
              github.com/Devrajj-Singh
            </span>
          </a>
          <div className="glass-card contact-card" data-reveal data-tilt style={{ "--delay": "240ms" } as CSSProperties}>
            <span className="contact-icon">LOC</span>
            <span>
              <strong>Location</strong>
              Ghaziabad, UP - open to remote
            </span>
          </div>
        </div>
      </section>

      <footer>
        <span>(c) 2026 Devraj Singh</span>
        <span>AI/ML - Full-stack - Next.js</span>
      </footer>
    </main>
  );
}
