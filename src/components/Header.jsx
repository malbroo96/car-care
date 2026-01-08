import logo from "../assets/logo.png";

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Clickable Logo */}
          <button 
            onClick={scrollToTop}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Back to home"
          >
            <img
              src={logo}
              alt="Car-Bliss Logo"
              className="h-16 w-auto object-contain"
            />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-300 hover:text-white transition font-medium">
            About
          </button>
          <button className="text-gray-300 hover:text-white transition font-medium">
            Contact
          </button>
        </div>
      </div>
    </header>
  );
}