import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <div className="text-6xl mb-4"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Successfully Placed!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for shopping with <span className="text-pink-600 font-semibold">SuvarnaRup</span>.
        </p>
        <p className="text-gray-700 mb-6">
          Your order will be delivered within <strong className="text-pink-700">7 days</strong>.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-full transition"
          >
            Go to Home
          </Link>
          <Link
            to="/myorders"
            className="border border-pink-600 text-pink-600 hover:bg-pink-100 py-2 px-6 rounded-full transition"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
