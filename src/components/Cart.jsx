import { useContext, useState } from "react";
import { ShopDataContext } from "../context/ShopContext";
import { useCommaFormatter } from "../hooks/useCommaFormatter";
import CheckOutModal from "./modals/CheckOutModal";
import ConfirmOrderModal from "./modals/ConfirmOrderModal";
import CrossIcon from "./svgs/CrossIcon";
import DeleteIcon from "./svgs/DeleteIcon";
import MinusIcon from "./svgs/MinusIcon";
import PlusIcon from "./svgs/PlusIcon";
import ShoppingIcon from "./svgs/ShoppinIcon";

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
  const { CommaFormatter } = useCommaFormatter();

  const handleOrderConfirm = (orderInfo) => {
    setShowCheckout(false);
    setConfirmData(orderInfo);
  };

  const handleContinueShopping = () => {
    setConfirmData(null);
    onClose();
  };

  return (
    <>
      <div className="fixed min-h-screen inset-0 bg-black/50 z-50 transition-opacity"></div>

      <div className="fixed top-0 right-0 min-h-screen w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform">
        <div className="flex flex-col min-h-screen">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <ShoppingIcon />
              Shopping Cart ({cartCount})
            </h2>
            <button
              onClick={onClose}
              className="h-9 px-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <CrossIcon />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
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
                        className="w-16 h-16"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.subtitle}</p>
                        <p className="text-lg font-bold text-amber-600">
                          {CommaFormatter(item.price)} ৳
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
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
                              className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer disabled:opacity-50"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
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
          </div>

          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">
                {CommaFormatter(cartTotal)} ৳
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
        />
      )}

      {confirmData && (
        <ConfirmOrderModal
          onClose={handleContinueShopping}
          info={confirmData}
        />
      )}
    </>
  );
}
