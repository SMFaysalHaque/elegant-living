import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackIcon from "../components/svgs/BackIcon";
import { ShopDataContext } from "../context/ShopContext";
import { useCommaFormatter } from "../hooks/useCommaFormatter";

export default function Products() {
  const { addToCart, products } = useContext(ShopDataContext);
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState(product.images[0].url);
  const [added, setAdded] = useState(false);
  const { CommaFormatter } = useCommaFormatter();

  const handleAddToCart = (productId) => {
    if (added) return; // prevent re-adding during "added" phase

    addToCart(productId);
    setAdded(true);

    // Reset the button after 2 seconds
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <>
      <Link to="/">
        <p className="inline-flex items-center text-amber-600 hover:text-amber-700 mb-8 transition-colors">
          <BackIcon />
          Back to Products
        </p>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <img src={selectedImage} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span
                className={`bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold ${
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

          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`aspect-square bg-white rounded-lg overflow-hidden transition-all cursor-pointer ${
                  selectedImage === img.url
                    ? "ring-2 ring-amber-500 shadow-md"
                    : "hover:shadow-md"
                }`}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  onClick={() => setSelectedImage(img.url)}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {product.title}
            </h1>
            <p className="text-xl text-gray-600 mb-4">{product.subtitle}</p>
            <p className="text-3xl font-bold text-amber-600">
              {CommaFormatter(product.price)} ৳
            </p>
          </div>

          <div className="prose prose-lg text-gray-700">
            <p>{product.description}</p>
          </div>

          <div className="space-y-4">
            <button
              disabled={product.stock === 0}
              onClick={() => handleAddToCart(product.id)}
              className={`inline-flex items-center justify-center rounded-md font-medium px-4 py-2 w-full h-14 text-lg transition-all cursor-pointer ${
                product.stock === 0
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-amber-600 hover:bg-amber-700 text-white"
              }`}
            >
              {added ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-3 mb-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong>Free Shipping</strong>
                <p>On orders over 50,000 ৳</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
