import { useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../svgs/EyeIcon";

export default function ProductCard({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
      <div className="aspect-square bg-gray-50 overflow-hidden relative">
        {/* main img */}
        <img
          src={selectedImage}
          alt="Modern Velvet Sofa"
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            In Stock ({product.stock})
          </span>
        </div>
      </div>

      <div className="p-3 bg-gray-50">
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              className={`aspect-square rounded-lg overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
                selectedImage === img ? "ring-2 ring-amber-500" : ""
              }`}
            >
              <img
                src={img}
                alt={`thumb-${idx}`}
                onClick={() => setSelectedImage(img)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 mb-3">{product.subtitle}</p>
        <p className="text-2xl font-bold text-amber-600 mb-4">
          {product.price} ৳
        </p>
        <Link to={`/product/${product.slug}`}>
          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-amber-600 hover:bg-amber-700 text-white transition-colors cursor-pointer">
            <EyeIcon />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
