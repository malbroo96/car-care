import { useId, useRef } from "react";
import {
  motion as Motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

function StaticFallback() {
  return (
    <section
      className="border-y border-slate-200/80 bg-gradient-to-b from-sky-100/80 to-white py-16"
      aria-labelledby="car-scroll-heading"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-5">
        <h2
          id="car-scroll-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
        >
          Detailing that moves with you
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          Scroll-driven motion is reduced on your device. Browse products and
          guides for wash, interior, and protection picks.
        </p>
      </div>
    </section>
  );
}

function CarSvg({ wheelRotation }) {
  const uid = useId().replace(/:/g, "");
  const gidBody = `car-body-${uid}`;
  const gidGlass = `car-glass-${uid}`;
  const gidRim = `car-rim-${uid}`;

  return (
    <svg
      viewBox="0 0 400 140"
      className="h-auto w-full drop-shadow-[0_25px_45px_rgba(15,23,42,0.35)]"
      aria-hidden
    >
      <defs>
        <linearGradient id={gidBody} x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="45%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id={gidGlass} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={gidRim} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gidBody})`}
        d="M52 78 L72 58 L155 48 L260 48 L310 58 L348 72 L352 88 L348 98 L52 98 Z"
      />
      <path
        fill={`url(#${gidGlass})`}
        d="M165 52 L248 52 L285 58 L295 68 L155 68 Z"
        opacity="0.95"
      />
      <path fill="#0f172a" d="M52 78 L348 78 L348 88 L52 88 Z" opacity="0.35" />
      <ellipse cx="338" cy="78" rx="8" ry="5" fill="#fef08a" opacity="0.9" />
      <ellipse cx="58" cy="82" rx="5" ry="8" fill="#f87171" opacity="0.85" />

      <Motion.g
        style={{
          rotate: wheelRotation,
          transformOrigin: "88px 112px",
          transformBox: "fill-box",
        }}
      >
        <circle cx="88" cy="112" r="26" fill="#0f172a" />
        <circle cx="88" cy="112" r="17" fill={`url(#${gidRim})`} />
        <circle cx="88" cy="112" r="6" fill="#1e293b" />
        <line
          x1="88"
          y1="95"
          x2="88"
          y2="129"
          stroke="#64748b"
          strokeWidth="3"
        />
        <line
          x1="71"
          y1="112"
          x2="105"
          y2="112"
          stroke="#64748b"
          strokeWidth="3"
        />
      </Motion.g>

      <Motion.g
        style={{
          rotate: wheelRotation,
          transformOrigin: "288px 112px",
          transformBox: "fill-box",
        }}
      >
        <circle cx="288" cy="112" r="26" fill="#0f172a" />
        <circle cx="288" cy="112" r="17" fill={`url(#${gidRim})`} />
        <circle cx="288" cy="112" r="6" fill="#1e293b" />
        <line
          x1="288"
          y1="95"
          x2="288"
          y2="129"
          stroke="#64748b"
          strokeWidth="3"
        />
        <line
          x1="271"
          y1="112"
          x2="305"
          y2="112"
          stroke="#64748b"
          strokeWidth="3"
        />
      </Motion.g>
    </svg>
  );
}

function CarScrollAnimated() {
  const containerRef = useRef(null);

  /* Tighter offset so progress moves noticeably while the section crosses the viewport (works better on tall desktop screens) */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.92", "end 0.08"],
  });

  const sceneRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 2, -4]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.7, 0.35]);

  const carX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const carY = useTransform(scrollYProgress, [0, 0.45, 1], [56, 12, -8]);
  const carScale = useTransform(scrollYProgress, [0, 0.55, 1], [0.42, 1.02, 0.88]);
  const carRotateY = useTransform(scrollYProgress, [0, 1], [22, -20]);
  const carRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -6]);

  const wheelRotation = useTransform(scrollYProgress, [0, 1], [0, -1440]);

  const roadScaleZ = useTransform(scrollYProgress, [0, 1], [0.82, 1.12]);
  const roadDash = useTransform(scrollYProgress, [0, 1], [0, -420]);

  const stripeLeft = useTransform(scrollYProgress, [0, 1], ["-12%", "18%"]);
  const stripeRight = useTransform(scrollYProgress, [0, 1], ["108%", "82%"]);

  const shadowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.65, 0.45]);

  const streakY = useTransform(scrollYProgress, [0, 1], [48, -72]);
  const streakOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.12, 0.45, 0.35, 0.18]);
  const streakScaleY = useTransform(scrollYProgress, [0, 1], [0.65, 1.35]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[220vh] border-y border-slate-200/50 bg-slate-950 md:min-h-[260vh]"
      aria-labelledby="car-scroll-heading"
    >
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-5 sm:pt-16">
        <div className="max-w-2xl">
          <h2
            id="car-scroll-heading"
            className="text-2xl font-bold tracking-tight text-white md:text-3xl"
          >
            Drive through the detail
          </h2>
          <p className="mt-2 text-slate-400">
            Scroll to move the scene — 3D-style perspective, spinning wheels,
            and road motion.
          </p>
        </div>
      </div>

      {/* overflow-visible: overflow-hidden here clipped the 3D transforms on wide viewports and broke the “living” feel on desktop */}
      <div className="sticky top-0 z-0 flex min-h-[max(31rem,100dvh)] items-center justify-center overflow-visible py-4">
        <Motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.35),transparent),radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(16,185,129,0.12),transparent)]"
          style={{ opacity: glowOpacity }}
        />

        <div className="relative h-full w-full max-w-6xl px-2 sm:px-4">
          <div
            className="relative mx-auto h-[min(85dvh,560px)] w-full max-w-5xl [perspective:1100px]"
            style={{ perspectiveOrigin: "50% 35%" }}
          >
            <Motion.div
              className="relative h-full w-full transform-gpu [transform-style:preserve-3d]"
              style={{ rotateX: sceneRotateX }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-sky-500/90 via-sky-200/50 to-slate-300/80" />

              <Motion.div
                className="absolute bottom-[38%] left-0 right-0 h-[22%] bg-gradient-to-t from-slate-600/40 to-transparent"
                style={{ x: stripeLeft }}
              />
              <Motion.div
                className="absolute bottom-[36%] left-0 right-0 h-[18%] bg-gradient-to-t from-slate-500/30 to-transparent"
                style={{ x: stripeRight }}
              />

              <Motion.div
                className="absolute bottom-0 left-1/2 h-[48%] w-[135%] -translate-x-1/2 rounded-t-[100%] bg-gradient-to-b from-slate-600 to-slate-900 shadow-[0_-4px_60px_rgba(0,0,0,0.5)]"
                style={{
                  rotateX: 58,
                  scale: roadScaleZ,
                  transformOrigin: "50% 100%",
                  translateZ: -20,
                }}
              >
                <Motion.div
                  className="absolute left-1/2 top-[8%] h-[72%] w-[3px] -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(180deg,#f8fafc_0px,#f8fafc_14px,transparent_14px,transparent_28px)] opacity-90"
                  style={{ y: roadDash }}
                />
                <div className="absolute bottom-[15%] left-[6%] top-[10%] w-[2px] rounded-full bg-sky-400/40 blur-[1px]" />
                <div className="absolute bottom-[15%] right-[6%] top-[10%] w-[2px] rounded-full bg-sky-400/40 blur-[1px]" />
              </Motion.div>

              {[18, 42, 66].map((left) => (
                <Motion.div
                  key={left}
                  className="absolute top-[22%] w-[2px] rounded-full bg-white/30"
                  style={{
                    left: `${left}%`,
                    height: "42%",
                    opacity: streakOpacity,
                    y: streakY,
                    scaleY: streakScaleY,
                  }}
                />
              ))}

              <Motion.div
                className="absolute bottom-[12%] left-1/2 w-[min(88vw,440px)] max-w-none -translate-x-1/2 transform-gpu [transform-style:preserve-3d] sm:bottom-[14%]"
                style={{
                  x: carX,
                  y: carY,
                  scale: carScale,
                  rotateY: carRotateY,
                  rotateX: carRotateX,
                  translateZ: 60,
                }}
              >
                <CarSvg wheelRotation={wheelRotation} />
              </Motion.div>

              <Motion.div
                className="absolute bottom-[10%] left-1/2 h-8 w-[min(70vw,280px)] -translate-x-1/2 rounded-[100%] bg-black/45 blur-xl"
                style={{
                  scaleX: carScale,
                  opacity: shadowOpacity,
                }}
              />
            </Motion.div>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-6 left-1/2 z-10 max-w-sm -translate-x-1/2 px-4 text-center text-[11px] text-slate-500 sm:bottom-8 sm:text-xs">
          Scroll slowly — the car and road respond to your position in this
          section.
        </p>
      </div>
    </section>
  );
}

export default function CarScrollExperience() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <StaticFallback />;
  }
  return <CarScrollAnimated />;
}
