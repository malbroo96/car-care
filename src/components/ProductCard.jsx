export default function ProductCard({ product }) {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg mb-3"
        />
      )}

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.price || product.brand}</p>

      {product.highlights && (
        <ul className="text-sm text-gray-500 mt-2">
          {product.highlights.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      )}

      {product.amazonLink && (
        <a
          href={product.amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-4 text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Buy on Amazon
        </a>
      )}
    </div>
  );
}
