const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-3">
            CarCare Picks
          </h2>
          <p className="text-sm text-gray-400">
            Curated car care products, tools & accessories. Helping you choose
            the best for your vehicle.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>Combos & Bundles</li>
            <li>Car Shampoo & Cleaners</li>
            <li>Pressure Washers</li>
            <li>Microfiber Towels</li>
            <li>Interior Cleaning</li>
            <li>Polish, Wax & Protection</li>
            <li>Car Perfume</li>
          </ul>
        </div>

        {/* Affiliate Disclaimer */}
        <div>
          <h3 className="text-white font-semibold mb-3">Disclaimer</h3>
          <p className="text-sm text-gray-400">
            This website contains affiliate links. As an Amazon Associate, we
            may earn a small commission at no extra cost to you. Product prices
            and availability are subject to change.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} CarCare Picks. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
