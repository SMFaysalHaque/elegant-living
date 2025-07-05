export default function ConfirmOrderModal({ onClose, info }) {
  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            <path d="m9 11 3 3L22 4" />
          </svg>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase, <b>{info.name}</b>.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p>
              <b>Order ID:</b> {info.orderId}
            </p>
            <p>
              <b>Email:</b> {info.email}
            </p>
            <p>
              <b>Mobile:</b> {info.mobile}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full h-10 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
