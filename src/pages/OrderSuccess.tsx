import React from "react";
import { useLocation, Link } from "react-router-dom";

type SuccessState = {
  paymentIntentId?: string;
  amount?: number; // in cents
  currency?: string;
};

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const state = (location.state || {}) as SuccessState;

  const amount =
    typeof state.amount === "number"
      ? (state.amount / 100).toFixed(2)
      : null;

  const currency = state.currency ? state.currency.toUpperCase() : "USD";

  return (
    <div
      className="min-h-screen text-white flex items-center justify-center px-4"
      style={{ backgroundColor: "#38c6cf" }}
    >
      <div className="max-w-lg w-full rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.3)] text-center">
        <h1 className="text-3xl font-semibold mb-2">
          Thank you for your order! 🎉
        </h1>
        <p className="text-sm text-white/90 mb-6">
          Your payment was processed successfully.
        </p>

        {amount && (
          <div className="mb-4 text-sm">
            <p className="text-white/80">Amount paid</p>
            <p className="text-2xl font-bold text-[#f4a261]">
              {currency} {amount}
            </p>
          </div>
        )}

        {state.paymentIntentId && (
          <div className="mb-6 text-xs text-white/80">
            <p>Order ID (Stripe):</p>
            <p className="mt-1 font-mono break-all">
              {state.paymentIntentId}
            </p>
          </div>
        )}

        {!amount && !state.paymentIntentId && (
          <p className="mb-6 text-xs text-white/80">
            If you reached this page directly, your order details are
            not available. Please check your email for the Stripe
            receipt.
          </p>
        )}

        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full bg-[#d72638] px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-[#b21d2c]"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
