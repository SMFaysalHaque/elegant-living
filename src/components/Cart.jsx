import { useContext, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { ShopDataContext } from "../context/ShopContext";
import { formatNumber } from "../utils/formatNumber";
import CheckOutModal from "./modals/CheckOutModal";
import ConfirmOrderModal from "./modals/ConfirmOrderModal";
import CrossIcon from "./svgs/CrossIcon";
import DeleteIcon from "./svgs/DeleteIcon";
import MinusIcon from "./svgs/MinusIcon";
import PlusIcon from "./svgs/PlusIcon";
import ShoppingIcon from "./svgs/ShoppingIcon";

export default function Cart({ onClose }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const {
    cartList,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
    cartTotal,
    products,
  } = useContext(ShopDataContext);

  const drawerRef = useRef(null);
  // While the cart layer is open, mark the page (#root) inert so background
  // content is hidden from keyboard and assistive tech. The cart layer itself is
  // portaled to <body>, so it stays outside the inert subtree.
  useFocusTrap(drawerRef, onClose, document.getElementById("root"));

  const handleOrderConfirm = (orderInfo) => {
    setShowCheckout(false);
    setConfirmData(orderInfo);
  };

  const handleContinueShopping = () => {
    setConfirmData(null);
    onClose();
  };

  return createPortal(
    <>
      <div className="fixed min-h-screen inset-0 bg-black/50 z-50 transition-opacity"></div>

      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="fixed top-0 right-0 min-h-screen w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform"
      >
        <div className="flex flex-col min-h-screen">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2
              id="cart-title"
              className="text-xl font-bold text-gray-800 flex items-center"
            >
              <ShoppingIcon />
              Shopping Cart ({cartCount})
            </h2>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="h-9 px-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CrossIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartList.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <ShoppingIcon />
                <p className="mt-4 text-lg font-semibold text-gray-700">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Browse our collection and add items to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
              {cartList.map((item) => {
                const product = products.find((p) => p.id === item.id);
                const outOfStock = product?.stock === 0;
                return (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="w-16 h-16"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                        <p className="text-lg font-bold text-amber-600">
                          {formatNumber(item.price)} ৳
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              aria-label={`Decrease quantity of ${item.title}`}
                              className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer"
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-8 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              disabled={outOfStock}
                              aria-label={`Increase quantity of ${item.title}`}
                              className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer disabled:opacity-50"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.title} from cart`}
                            className="h-9 px-3 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">
                {formatNumber(cartTotal)} ৳
              </span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              disabled={cartList.length === 0}
              className={`w-full h-12 text-lg text-white rounded-md flex items-center justify-center gap-2 transition-colors ${
                cartList.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      {showCheckout && (
        <CheckOutModal
          onClose={() => setShowCheckout(false)}
          onOrderConfirm={handleOrderConfirm}
          inertTarget={drawerRef.current}
        />
      )}

      {confirmData && (
        <ConfirmOrderModal
          onClose={handleContinueShopping}
          info={confirmData}
          inertTarget={drawerRef.current}
        />
      )}
    </>,
    document.body
  );
}
