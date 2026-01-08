import logo from "../assets/logo.png";
export default function Header() {
  return (
    <header className="bg-gray-900 shadow-lg border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
 
          <img
            src={logo}
            alt="Car-Bliss Logo"
            className="h-25 w-auto object-contain"
          />
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
