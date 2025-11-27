import React, { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

interface CheckoutFormProps {
  clientSecret: string;
  customerEmail: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  customerEmail,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  if (!stripe || !elements) {
    return (
      <p className="text-sm text-neutral-100">
        Loading secure payment form…
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We stay on site; no external redirect needed
        return_url: window.location.href,
        payment_method_data: {
          billing_details: {
            email: customerEmail || undefined,
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "Payment failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      // Clear cart
      clearCart();

      // Navigate to success page with payment info
      navigate("/order-success", {
        state: {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount, // in cents
          currency: paymentIntent.currency,
        },
      });

      setIsSubmitting(false);
      return;
    }

    // Other statuses (processing, etc.)
    setMessage("Processing your payment…");
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-2xl bg-black/30 border border-white/15 px-4 py-4">
        <PaymentElement />
      </div>

      {message && (
        <p className="text-sm text-red-100 bg-[#7f1d1d]/80 border border-red-700/60 px-3 py-2 rounded-xl">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !stripe || !elements || !clientSecret}
        className="mt-2 w-full rounded-full bg-[#d72638] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg hover:bg-[#b21d2c] disabled:cursor-not-allowed disabled:bg-neutral-500"
      >
        {isSubmitting ? "Processing…" : "Pay now"}
      </button>

      <p className="mt-1 text-[10px] text-white/70 text-center">
        Your card details are encrypted and processed securely by Stripe.
      </p>
    </form>
  );
};

export default CheckoutForm;
