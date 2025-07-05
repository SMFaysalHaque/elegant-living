export default function CheckOutModal({ onClose, onPlaceOrder }) {
  return (
    <div className="fixed min-h-screen inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button
            onClick={onClose}
            className="h-9 px-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Modern Velvet Sofa × 3</span>
                <span className="font-semibold">$3,897</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">$3,897</span>
                </div>
              </div>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              onPlaceOrder();
            }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                placeholder="Enter your mobile number"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Delivery Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Enter your delivery address"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 text-lg bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors cursor-pointer"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
