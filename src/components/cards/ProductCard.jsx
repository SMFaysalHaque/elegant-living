import { Link } from "react-router-dom";
import { useCommaFormatter } from "../../hooks/useCommaFormatter";
import EyeIcon from "../svgs/EyeIcon";

export default function ProductCard({ product }) {
  const { CommaFormatter } = useCommaFormatter();

  return (
    <div className="bg-white flex gap-3 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 w-full h-[250px] p-5">
      <div className="relative w-full md:w-[200px] aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={
            product.images[0].url ||
            "https://via.placeholder.com/200?text=No+Image"
          }
          alt="Modern Velvet Sofa"
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-white px-2 py-1 rounded-full text-xs ${
              product.stock > 2
                ? "bg-green-500"
                : product.stock > 0 && product.stock < 3
                ? "bg-orange-500"
                : product.stock == 0
                ? "bg-red-500"
                : ""
            }`}
          >
            {product.stock > 2
              ? `In Stock (${product.stock})`
              : product.stock > 0 && product.stock < 3
              ? `Only (${product.stock}) left`
              : product.stock === 0
              ? "Out of Stock"
              : ""}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold text-gray-800">{product.title}</h3>
          <p className="text-gray-600 line-clamp-1">{product.subtitle}</p>
          <p className="text-2xl font-bold text-amber-600">
            {CommaFormatter(product.price)} ৳
          </p>
        </div>

        <Link to={`/product/${product.slug}`}>
          <button className="inline-flex items-center justify-center gap-2 rounded text-sm font-medium h-10 px-4 py-2 w-fit bg-amber-600 hover:bg-amber-700 text-white transition-colors cursor-pointer">
            <EyeIcon />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
