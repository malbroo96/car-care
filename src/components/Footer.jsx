import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
  const navigate = useNavigate();

  const go = (path) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go("/")}
                className="cursor-pointer rounded-lg outline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400"
                aria-label="Back to landing page"
              >
                <img
                  src={logo}
                  alt=""
                  width={64}
                  height={64}
                  className="h-14 w-auto object-contain brightness-0 invert"
                />
              </button>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              Your trusted source for premium car cleaning products. Hand-picked
              selections to keep your vehicle looking its best. We bring you
              practical solutions from trusted brands.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Quick links
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => go("/about")}
                  className="rounded text-left hover:text-white"
                >
                  About us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go("/contact")}
                  className="rounded text-left hover:text-white"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go("/privacy")}
                  className="rounded text-left hover:text-white"
                >
                  Privacy policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => go("/how-we-review")}
                  className="rounded text-left hover:text-white"
                >
                  How we review
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Categories
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-white">Combo kits</li>
              <li className="hover:text-white">Car shampoos</li>
              <li className="hover:text-white">Pressure washers</li>
              <li className="hover:text-white">Interior care</li>
              <li className="hover:text-white">Polish & wax</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-slate-500 md:flex-row md:text-left">
            <p>© {new Date().getFullYear()} Car-Bliss. All rights reserved.</p>
            <p className="max-w-xl md:text-right">
              Affiliate disclosure: As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
