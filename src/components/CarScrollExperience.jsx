import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  motion as Motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const frameModules = import.meta.glob(
  "../assets/scroll-animation/frames/**/*.{png,jpg,jpeg,webp,avif}",
  { eager: true, import: "default" },
);

const FRAME_URLS = Object.keys(frameModules)
  .filter((path) => !path.includes("/.git"))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((key) => frameModules[key]);

const FRAME_COUNT = FRAME_URLS.length;
const FIRST_SRC = FRAME_URLS[0] ?? "";

function progressToIndex(progress, n) {
  if (n <= 0) return 0;
  const t = Math.min(1, Math.max(0, progress));
  return Math.min(n - 1, Math.floor(t * n));
}

function sectionMinHeightVh(frameCount) {
  if (frameCount <= 0) return 220;
  /* Taller section = slower progress per px scroll = easier to land on each frame */
  return Math.min(520, Math.max(260, 170 + frameCount * 3.15));
}

function scheduleIdle(fn) {
  if (typeof requestIdleCallback !== "undefined") {
    const id = requestIdleCallback(() => fn(), { timeout: 400 });
    return () => cancelIdleCallback(id);
  }
  const t = setTimeout(fn, 40);
  return () => clearTimeout(t);
}

function bindDecode(img, gen, decodeGenRef, onReady, onSuperseded) {
  const done = () => {
    if (gen !== decodeGenRef.current) {
      onSuperseded?.();
      return;
    }
    onReady();
  };
  const d = img.decode?.();
  if (d && typeof d.then === "function") {
    d.then(done).catch(() => {
      if (img.complete) done();
      else img.onload = () => done();
    });
  } else if (img.complete) {
    done();
  } else {
    img.onload = () => done();
  }
}

function prefetchWindowSync(centerIndex, prefetchSetRef, radius = 20) {
  const n = FRAME_COUNT;
  if (!n) return;
  const lo = Math.max(0, centerIndex - radius);
  const hi = Math.min(n - 1, centerIndex + radius);
  for (let j = lo; j <= hi; j++) {
    const url = FRAME_URLS[j];
    if (prefetchSetRef.current.has(url)) continue;
    prefetchSetRef.current.add(url);
    const im = new Image();
    im.src = url;
  }
}

/** @param {{ flat3D?: boolean }} props */
function CarScrollAnimated({ flat3D = false }) {
  const containerRef = useRef(null);
  const imgARef = useRef(null);
  const imgBRef = useRef(null);
  const frontIsARef = useRef(true);
  const decodeGenRef = useRef(0);
  const decodeInFlightRef = useRef(/** @type {number | null} */ (null));
  const committedIndexRef = useRef(0);

  const rafRef = useRef(0);
  const latestProgressRef = useRef(0);
  const prefetchSetRef = useRef(new Set());
  const applyFrameRef = useRef(() => {});

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.25, 0.65, 0.35],
  );
  const stageRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [8, 1.5, -6],
  );
  const frameRotateY = useTransform(scrollYProgress, [0, 1], [-11, 11]);
  const frameScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [0.92, 1.03, 0.94],
  );
  const frameTranslateZ = useTransform(scrollYProgress, [0, 0.5, 1], [12, 36, 18]);

  const swapLayers = useCallback((showB) => {
    const a = imgARef.current;
    const b = imgBRef.current;
    if (!a || !b) return;
    if (showB) {
      b.style.opacity = "1";
      b.style.zIndex = "2";
      a.style.opacity = "0";
      a.style.zIndex = "1";
      frontIsARef.current = false;
    } else {
      a.style.opacity = "1";
      a.style.zIndex = "2";
      b.style.opacity = "0";
      b.style.zIndex = "1";
      frontIsARef.current = true;
    }
  }, []);

  const prefetchAround = useCallback((centerIndex) => {
    const n = FRAME_COUNT;
    if (!n) return;
    scheduleIdle(() => {
      for (const delta of [
        -15, -12, -10, -8, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 8, 10,
        12, 15,
      ]) {
        const j = centerIndex + delta;
        if (j < 0 || j >= n) continue;
        const url = FRAME_URLS[j];
        if (prefetchSetRef.current.has(url)) continue;
        prefetchSetRef.current.add(url);
        const im = new Image();
        im.src = url;
      }
    });
  }, []);

  const applyFrameFromProgress = useCallback(
    (progress) => {
      const n = FRAME_COUNT;
      if (!n) return;
      const i = progressToIndex(progress, n);

      if (i === committedIndexRef.current) {
        if (decodeInFlightRef.current !== null) {
          decodeGenRef.current += 1;
          decodeInFlightRef.current = null;
        }
        return;
      }

      if (decodeInFlightRef.current === i) return;

      const a = imgARef.current;
      const b = imgBRef.current;
      if (!a || !b) return;

      const prevCommitted = committedIndexRef.current;
      if (Math.abs(i - prevCommitted) > 6) {
        prefetchWindowSync(i, prefetchSetRef, 28);
      }

      decodeInFlightRef.current = i;
      const gen = ++decodeGenRef.current;

      const hidden = frontIsARef.current ? b : a;
      const url = FRAME_URLS[i];
      const showBOnTop = hidden === b;

      hidden.src = url;

      const chase = () => {
        applyFrameRef.current(latestProgressRef.current);
      };

      const commitFrame = () => {
        requestAnimationFrame(() => {
          if (gen !== decodeGenRef.current) {
            chase();
            return;
          }
          swapLayers(showBOnTop);
          decodeInFlightRef.current = null;
          committedIndexRef.current = i;
          prefetchAround(i);

          let steps = 0;
          while (steps++ < 64) {
            const target = progressToIndex(latestProgressRef.current, n);
            if (target === committedIndexRef.current) break;

            const na = imgARef.current;
            const nb = imgBRef.current;
            if (!na || !nb) break;

            const hid = frontIsARef.current ? nb : na;
            const nextUrl = FRAME_URLS[target];
            hid.src = nextUrl;

            if (!hid.complete || hid.naturalWidth === 0) {
              decodeInFlightRef.current = target;
              const gen2 = ++decodeGenRef.current;
              const showB2 = hid === nb;
              bindDecode(hid, gen2, decodeGenRef, () => {
                requestAnimationFrame(() => {
                  if (gen2 !== decodeGenRef.current) {
                    chase();
                    return;
                  }
                  swapLayers(showB2);
                  decodeInFlightRef.current = null;
                  committedIndexRef.current = target;
                  prefetchAround(target);
                  chase();
                });
              }, chase);
              return;
            }

            const showB2 = hid === nb;
            const dec = hid.decode?.();
            if (dec && typeof dec.then === "function") {
              decodeInFlightRef.current = target;
              const gen2 = ++decodeGenRef.current;
              dec
                .then(() => {
                  requestAnimationFrame(() => {
                    if (gen2 !== decodeGenRef.current) {
                      chase();
                      return;
                    }
                    swapLayers(showB2);
                    decodeInFlightRef.current = null;
                    committedIndexRef.current = target;
                    prefetchAround(target);
                    chase();
                  });
                })
                .catch(chase);
              return;
            }

            swapLayers(showB2);
            committedIndexRef.current = target;
            prefetchAround(target);
          }

          chase();
        });
      };

      if (hidden.complete && hidden.naturalWidth > 0) {
        const d = hidden.decode?.();
        if (d && typeof d.then === "function") {
          d.then(commitFrame).catch(commitFrame);
        } else {
          commitFrame();
        }
        return;
      }

      bindDecode(hidden, gen, decodeGenRef, commitFrame, chase);
    },
    [prefetchAround, swapLayers],
  );

  applyFrameRef.current = applyFrameFromProgress;

  useLayoutEffect(() => {
    const a = imgARef.current;
    const b = imgBRef.current;
    if (!a || !b || !FIRST_SRC) return;
    a.src = FIRST_SRC;
    b.src = FIRST_SRC;
    a.style.opacity = "1";
    a.style.zIndex = "2";
    b.style.opacity = "0";
    b.style.zIndex = "1";
    frontIsARef.current = true;
    decodeInFlightRef.current = null;
    committedIndexRef.current = 0;
    decodeGenRef.current = 0;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    latestProgressRef.current = latest;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      applyFrameFromProgress(latestProgressRef.current);
    });
  });

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  useEffect(() => {
    if (!FRAME_COUNT) return;
    const id = requestAnimationFrame(() => {
      applyFrameFromProgress(scrollYProgress.get());
    });
    return () => cancelAnimationFrame(id);
  }, [scrollYProgress, applyFrameFromProgress]);

  useEffect(() => {
    if (!FRAME_COUNT) return;
    let cancelled = false;
    let idx = 0;
    const chunk = 14;
    const pump = () => {
      if (cancelled) return;
      const end = Math.min(idx + chunk, FRAME_COUNT);
      for (; idx < end; idx++) {
        const url = FRAME_URLS[idx];
        if (prefetchSetRef.current.has(url)) continue;
        prefetchSetRef.current.add(url);
        const im = new Image();
        im.src = url;
      }
      if (idx < FRAME_COUNT) scheduleIdle(pump);
    };
    const cancelFirst = scheduleIdle(pump);
    return () => {
      cancelled = true;
      cancelFirst();
    };
  }, []);

  const minVh = sectionMinHeightVh(FRAME_COUNT);

  const imgClass =
    "absolute inset-0 h-full w-full object-cover bg-slate-900 [user-select:none] [backface-visibility:hidden] [transform:translate3d(0,0,0)] transition-[opacity] duration-[165ms] [transition-timing-function:cubic-bezier(0.25,0.1,0.25,1)] will-change-[opacity]";

  const mediaFrameClass =
    "relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-[0_28px_90px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ring-1 ring-white/20 transform-gpu [transform-style:preserve-3d] [contain:strict]";
  const shellClass =
    "relative h-[min(68dvh,420px)] w-full max-w-5xl [perspective:1200px] sm:h-[min(72dvh,480px)] md:h-[min(74dvh,520px)] lg:h-[min(75dvh,560px)]";

  const sequenceEl =
    FRAME_COUNT > 0 ? (
      <div className="relative h-full w-full bg-slate-900">
        <img
          ref={imgARef}
          alt="Scrubbable product animation; scroll the page to change frames."
          className={imgClass}
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
        <img
          ref={imgBRef}
          alt=""
          className={imgClass}
          decoding="async"
          draggable={false}
          aria-hidden
        />
      </div>
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-900 px-6 text-center">
        <p className="text-sm font-medium text-slate-200">No frames yet</p>
        <p className="max-w-md text-xs leading-relaxed text-slate-500">
          Add PNG / WebP / AVIF files under{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-sky-300">
            src/assets/scroll-animation/frames/
          </code>
          . Use zero-padded names so they sort in order.
        </p>
      </div>
    );

  return (
    <section
      ref={containerRef}
      className="relative border-y border-slate-200/50 bg-slate-950"
      style={{ minHeight: `${minVh}vh` }}
      aria-labelledby="car-scroll-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-3 pb-8 pt-12 sm:px-4 sm:pt-14 md:px-6 md:pt-16 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="car-scroll-heading"
            className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl"
          >
            Drive through the detail
          </h2>
        </div>
      </div>

      <div className="sticky top-16 z-0 min-h-[max(28rem,calc(100dvh-4rem))] py-4 sm:min-h-[max(32rem,calc(100dvh-4rem))] sm:py-6">
        <Motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.35),transparent),radial-gradient(ellipse_60%_40%_at_80%_100%,rgba(16,185,129,0.12),transparent)]"
          style={flat3D ? { opacity: 0.4 } : { opacity: glowOpacity }}
        />

        <div className="relative mx-auto flex max-w-6xl justify-center px-2 sm:px-4 md:px-5 lg:px-6">
          <div className={shellClass} style={{ perspectiveOrigin: "50% 38%" }}>
            {flat3D ? (
              <div className="relative h-full w-full">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/25 via-slate-900/40 to-slate-950 ring-1 ring-white/10" />
                <div
                  className={`${mediaFrameClass} h-[min(68dvh,420px)] bg-slate-900 sm:h-[min(72dvh,480px)] md:h-[min(74dvh,520px)] lg:h-[min(75dvh,560px)]`}
                >
                  {sequenceEl}
                </div>
              </div>
            ) : (
              <Motion.div
                className="relative h-full w-full transform-gpu will-change-transform [transform-style:preserve-3d]"
                style={{ rotateX: stageRotateX }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/25 via-slate-900/40 to-slate-950 ring-1 ring-white/10" />
                <Motion.div
                  className={`${mediaFrameClass} h-[min(68dvh,420px)] bg-slate-900 will-change-transform sm:h-[min(72dvh,480px)] md:h-[min(74dvh,520px)] lg:h-[min(75dvh,560px)]`}
                  style={{
                    rotateY: frameRotateY,
                    scale: frameScale,
                    translateZ: frameTranslateZ,
                  }}
                >
                  {sequenceEl}
                </Motion.div>
              </Motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CarScrollExperience() {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <CarScrollAnimated flat3D />;
  }
  return <CarScrollAnimated />;
}
