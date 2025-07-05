import { useContext } from "react";
import ProductCard from "../components/cards/ProductCard";
import { ShopDataContext } from "../context/ShopContext";

export default function Home() {
  const { products } = useContext(ShopDataContext);

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Elegant Living
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our curated collection of premium furniture designed to
          transform your space into a sanctuary of style and comfort.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
