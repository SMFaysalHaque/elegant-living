import CrossIcon from "./svgs/CrossIcon";
import DeleteIcon from "./svgs/DeleteIcon";
import MinusIcon from "./svgs/MinusIcon";
import PlusIcon from "./svgs/PlusIcon";
import ShoppingIcon from "./svgs/ShoppinIcon";

export default function Cart({ onClose }) {
  return (
    <>
      <div className="fixed min-h-screen inset-0 bg-black/50 z-50 transition-opacity"></div>

      <div className="fixed top-0 right-0 min-h-screen w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform">
        <div className="flex flex-col min-h-screen">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <ShoppingIcon />
              Shopping Cart (3)
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
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=600&fit=crop&crop=center"
                    alt="Modern Velvet Sofa"
                    className="w-16 h-16 object-cover rounded-lg"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-800 truncate">
                      Modern Velvet Sofa
                    </h4>
                    <p className="text-sm text-gray-600 truncate">
                      3-Seater Contemporary Design
                    </p>
                    <p className="text-lg font-bold text-amber-600">$1,299</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer">
                          <MinusIcon />
                        </button>
                        <span className="w-8 text-center font-semibold">3</span>
                        <button className="w-8 h-8 rounded-md border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center cursor-pointer">
                          <PlusIcon />
                        </button>
                      </div>

                      <button className="h-9 px-3 rounded-md text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer">
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-amber-600">$3,897</span>
            </div>
            <button className="w-full h-12 text-lg bg-amber-600 hover:bg-amber-700 text-white rounded-md flex items-center justify-center gap-2 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
