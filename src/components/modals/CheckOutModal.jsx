import { useContext } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { ShopDataContext } from "../../context/ShopContext";
import { useCommaFormatter } from "../../hooks/useCommaFormatter";

export default function CheckOutModal({ onClose, onOrderConfirm }) {
  const { cartList, cartTotal, clearCart } = useContext(ShopDataContext);
  const { CommaFormatter } = useCommaFormatter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const orderId = uuidv4();
    clearCart();
    onOrderConfirm({ ...data, orderId });
  };

  return (
    <div className="fixed min-h-screen inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
          <button
            onClick={onClose}
            className="h-9 px-3 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {cartList.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {CommaFormatter(item.quantity * item.price)} ৳
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-amber-600">
                    {CommaFormatter(cartTotal)} ৳
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Full Name"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number
              </label>
              <input
                {...register("mobile", {
                  required: true,
                  pattern: /^[0-9]{11}$/,
                })}
                placeholder="Mobile Number"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  Invalid mobile number
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                  pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                placeholder="Email Address"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">Invalid email</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Delivery Address
              </label>
              <input
                {...register("address", { required: true })}
                placeholder="Delivery Address"
                className="w-full h-10 rounded-md border border-gray-300 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">Address is required</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 rounded-md text-white transition-colors ${
                isValid
                  ? "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
