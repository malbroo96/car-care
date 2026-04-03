import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion as Motion, useReducedMotion } from "framer-motion";
import logo from "../assets/logo.png";
import { useCompare } from "../context/CompareContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/#products", label: "Products" },
  { to: "/#car-care-guides-heading", label: "Guides" },
  { to: "/compare", label: "Compare" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/how-we-review", label: "How we review" },
];

function isNavActive(to, pathname, hash) {
  if (!to.includes("#")) {
    return pathname === to && !hash;
  }
  const [path, fragment] = to.split("#");
  const base = path || "/";
  return pathname === base && hash === `#${fragment}`;
}

const navLinkClass = (active) =>
  `rounded-lg px-2.5 py-2 text-xs font-medium transition-colors lg:px-3 lg:py-2 lg:text-[13px] xl:text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
    active
      ? "bg-white/10 text-white"
      : "text-slate-300 hover:bg-white/5 hover:text-white"
  }`;

function NavLink({ to, label }) {
  const location = useLocation();
  const active = isNavActive(to, location.pathname, location.hash);

  return (
    <Link to={to} className={navLinkClass(active)}>
      {label}
    </Link>
  );
}

function CompareNavLink() {
  const location = useLocation();
  const { count } = useCompare();
  const active = location.pathname === "/compare";

  return (
    <Link to="/compare" className={navLinkClass(active)}>
      Compare{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}

function CompareMobileLink({ onNavigate }) {
  const { count } = useCompare();
  return (
    <Link
      to="/compare"
      onClick={onNavigate}
      className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10"
    >
      Compare{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  useEffect(() => {
    const onPopState = () => setMenuOpen(false);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMenu = () => setMenuOpen(false);

  const toggleMenu = () => {
    setMenuOpen((o) => !o);
  };

  const panelTransition = reduceMotion
    ? { duration: 0.2 }
    : { type: "spring", damping: 28, stiffness: 320, mass: 0.85 };

  const overlay = (
    <AnimatePresence initial={false}>
      {menuOpen ? (
        <>
          <Motion.button
            key="mobile-backdrop"
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.28 }}
            className="fixed inset-0 z-[100] cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <Motion.div
            key="mobile-panel"
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ x: "105%", opacity: reduceMotion ? 1 : 0.96 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "105%", opacity: reduceMotion ? 1 : 0.96 }}
            transition={panelTransition}
            className="fixed bottom-0 right-0 top-16 z-[105] flex w-[min(100vw-1rem,20rem)] max-h-[calc(100dvh-4rem-env(safe-area-inset-bottom))] flex-col overflow-hidden rounded-tl-xl border border-white/10 border-b-0 bg-zinc-950 shadow-2xl sm:w-[min(100vw-1.5rem,22rem)] md:w-[min(100vw-2rem,24rem)] md:rounded-tl-2xl lg:hidden"
          >
            <div className="shrink-0 border-b border-white/10 px-4 py-3.5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Menu
              </p>
            </div>
            <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3">
              {navLinks.map((item, i) =>
                item.to === "/compare" ? (
                  <Motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.04 + i * 0.05,
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <CompareMobileLink onNavigate={closeMenu} />
                  </Motion.div>
                ) : (
                  <Motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reduceMotion ? 0 : 0.04 + i * 0.05,
                      duration: reduceMotion ? 0 : 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      onClick={closeMenu}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-slate-200 transition-colors hover:bg-white/10"
                    >
                      {item.label}
                    </Link>
                  </Motion.div>
                )
              )}
              <Motion.div
                className="mt-auto"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reduceMotion ? 0 : 0.2 + navLinks.length * 0.04,
                  duration: reduceMotion ? 0 : 0.3,
                }}
              >
                <Link
                  to="/privacy"
                  onClick={closeMenu}
                  className="block rounded-xl px-4 py-3 text-sm text-slate-500 transition-colors hover:bg-white/5"
                >
                  Privacy policy
                </Link>
              </Motion.div>
            </nav>
          </Motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );

  return (
    <header
      className={`sticky top-0 border-b border-white/10 bg-zinc-950/90 text-white shadow-lg shadow-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/75 ${
        menuOpen ? "z-[200]" : "z-[70]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-4 md:px-6 lg:px-8">
        {/* Left: on mobile use grid so the menu control never overlaps text */}
        <div className="grid min-w-0 flex-1 grid-cols-[auto_minmax(0,1fr)] items-center gap-2 sm:gap-3 lg:flex lg:min-w-0 lg:flex-1 lg:items-center lg:gap-4">
          <button
            type="button"
            onClick={goHome}
            className="col-start-1 shrink-0 justify-self-start rounded-lg outline-offset-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
            aria-label="Go to home page"
          >
            <img
              src={logo}
              alt=""
              width={40}
              height={40}
              className="h-9 w-auto sm:h-10"
            />
          </button>

          <div className="col-start-2 min-w-0 lg:min-w-0 lg:flex-1">
            <button
              type="button"
              onClick={goHome}
              className="block max-w-full text-left hover:opacity-90"
            >
              <span className="text-lg font-bold tracking-tight sm:text-xl md:text-2xl lg:text-xl xl:text-2xl">
                Car-Bliss
              </span>
            </button>
            <p className="line-clamp-2 text-[11px] leading-snug text-slate-400 sm:text-xs sm:line-clamp-none lg:max-w-xl">
              Car care picks in India — shampoo, microfiber, interior, wax &
              more.
            </p>
          </div>
        </div>

        <nav
          className="hidden shrink-0 items-center gap-0.5 lg:flex lg:gap-1 xl:gap-1.5"
          aria-label="Main navigation"
        >
          {navLinks.map((item) =>
            item.to === "/compare" ? (
              <CompareNavLink key={item.to} />
            ) : (
              <NavLink key={item.to} to={item.to} label={item.label} />
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden max-w-[8rem] truncate text-[10px] text-slate-500 lg:inline xl:max-w-none xl:text-[11px]">
            Amazon Affiliate
          </span>
          <button
            type="button"
            className="relative inline-flex min-h-[48px] min-w-[48px] touch-manipulation items-center justify-center overflow-hidden rounded-lg border border-white/15 bg-white/10 p-2 text-white shadow-inner transition-[transform,background-color,box-shadow] duration-200 hover:bg-white/20 active:scale-[0.96] active:bg-white/25 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={toggleMenu}
          >
            <span className="relative h-6 w-6 shrink-0">
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <Motion.svg
                    key="close-icon"
                    className="absolute inset-0 h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, rotate: -45, scale: 0.85 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: 45, scale: 0.85 }
                    }
                    transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </Motion.svg>
                ) : (
                  <Motion.svg
                    key="menu-icon"
                    className="absolute inset-0 h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, rotate: 45, scale: 0.85 }
                    }
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, rotate: -45, scale: 0.85 }
                    }
                    transition={{ duration: reduceMotion ? 0.12 : 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </Motion.svg>
                )}
              </AnimatePresence>
            </span>
          </button>
        </div>
      </div>

      {createPortal(overlay, document.body)}
    </header>
  );
}
