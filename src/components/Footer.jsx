import logo from "../assets/logo.png";

export default function Footer() {
  // Add this function that was missing!
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              {/* Clickable Logo */}
              <button 
                onClick={scrollToTop}
                className="cursor-pointer hover:opacity-80 transition-opacity"
                aria-label="Back to home"
              >
                <img 
                  src={logo}
                  alt="Car-Bliss Logo" 
                  className="h-25 w-auto object-contain brightness-0 invert"
                />
              </button>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for premium car cleaning products. Hand-picked selections to keep your vehicle looking brand new. We bring you the best car care solutions from top brands.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-lg text-white">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Combo Kits
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Car Shampoos
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Pressure Washers
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Interior Care
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Polish & Wax
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © 2026 Car-Bliss. All rights reserved.
            </p>
            <p className="text-center md:text-right">
              As an Amazon Associate, we earn from qualifying purchases.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}