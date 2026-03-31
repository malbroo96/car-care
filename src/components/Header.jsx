import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  `rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
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

  return (
    <header className="sticky top-0 z-[70] border-b border-white/10 bg-zinc-950/90 text-white shadow-lg shadow-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-zinc-950/75">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={goHome}
            className="shrink-0 rounded-lg outline-offset-2 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
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
          <div className="min-w-0">
            <button
              type="button"
              onClick={goHome}
              className="block w-full text-left hover:opacity-90"
            >
              <span className="text-lg font-bold tracking-tight sm:text-xl">
                Car-Bliss
              </span>
            </button>
            <p className="line-clamp-2 text-[11px] leading-snug text-slate-400 sm:text-xs sm:line-clamp-none md:max-w-md">
              Car care picks in India — shampoo, microfiber, interior, wax &
              more.
            </p>
          </div>
        </div>

        <nav
          className="hidden items-center gap-0.5 lg:flex"
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

        <div className="flex items-center gap-2">
          <span className="hidden text-[11px] text-slate-500 xl:inline">
            Amazon Affiliate
          </span>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-200 hover:bg-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <div
            id="mobile-nav"
            className="fixed inset-y-0 right-0 z-[90] flex w-[min(100vw-3rem,20rem)] flex-col border-l border-white/10 bg-zinc-950 shadow-2xl lg:hidden"
          >
            <div className="border-b border-white/10 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Menu
              </p>
            </div>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
              {navLinks.map((item) =>
                item.to === "/compare" ? (
                  <CompareMobileLink key={item.to} onNavigate={closeMenu} />
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="rounded-xl px-4 py-3 text-base font-medium text-slate-200 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link
                to="/privacy"
                onClick={closeMenu}
                className="mt-auto rounded-xl px-4 py-3 text-sm text-slate-500 hover:bg-white/5"
              >
                Privacy policy
              </Link>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
