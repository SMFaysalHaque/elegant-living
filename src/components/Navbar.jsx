import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopDataContext } from "../context/ShopContext";
import Cart from "./Cart";
import CartIcon from "./svgs/CartIcon";

export default function Navbar() {
  const { cartCount } = useContext(ShopDataContext);
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <p className="font-tangerine font-bold text-4xl text-gray-800 hover:text-amber-600 transition-colors">
              Elegant Living
            </p>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/">
              <p className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
                Home
              </p>
            </Link>
            <button
              onClick={() => setShow(true)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border bg-background hover:text-amber-800 h-9 rounded-md px-3 relative border-amber-200 text-amber-700 hover:bg-amber-50 cursor-pointer"
            >
              <CartIcon />
              <span className="absolute -top-2 -left-2 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
      {show && <Cart onClose={() => setShow(false)} />}
    </>
  );
}
