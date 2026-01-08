export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-900 mt-16 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
               
              <img 
                src="/logo.png" 
                alt="Car-Bliss Logo" 
                className="h-30 w-auto object-contain"
              />
              <h3 className="text-2xl font-bold">Car-Bliss</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Your trusted source for premium car cleaning products. Hand-picked selections to keep your vehicle looking brand new. We bring you the best car care solutions from top brands.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                Combo Kits
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                Car Shampoos
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                Pressure Washers
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                Interior Care
              </li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">
                Polish & Wax
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
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