import { useContext } from "react";
import ProductCard from "../components/cards/ProductCard";
import { ShopDataContext } from "../context/ShopContext";

export default function Home() {
  const { products } = useContext(ShopDataContext);

  return (
    <>
      <div className="text-center xl:mb-20 mb-10">
        <h1 className="lg:text-5xl text-3xl font-bold text-gray-800 xl:mb-10 mb-5">
          Complements your Lifestyles
        </h1>
        <p className="xl:text-xl text-lg text-gray-600 max-w-2xl mx-auto">
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
