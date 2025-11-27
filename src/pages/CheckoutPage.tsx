import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/stripe";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";

type ServerTotals = {
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
};

const CheckoutPage: React.FC = () => {
  const { items, total } = useCart(); // total in dollars (from frontend)
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [serverTotals, setServerTotals] = useState<ServerTotals | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    if (!items || items.length === 0 || total <= 0) {
      setLoading(false);
      setError("Your cart is empty.");
      return;
    }

    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        setError(null);

        // send a minimal version of cart items to backend
        const payloadItems = items.map((li) => ({
          id: li.product.id,
          qty: li.qty,
        }));

        const res = await fetch(
          "/.netlify/functions/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: payloadItems,
              customerEmail: customerEmail || undefined,
            }),
          }
        );

        const raw = await res.text();
        let data: any = {};
        try {
          data = raw ? JSON.parse(raw) : {};
        } catch (parseErr) {
          console.error("Non-JSON response from function:", raw);
          throw new Error("Could not communicate with payment server.");
        }

        if (!res.ok) {
          throw new Error(data.error || "Error creating payment.");
        }

        if (!data.clientSecret) {
          throw new Error("No clientSecret received from server.");
        }

        setClientSecret(data.clientSecret);
        if (data.totals) {
          setServerTotals(data.totals as ServerTotals);
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Error initializing payment.");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
    // no dependency on customerEmail to avoid re-creating PI every keystroke
  }, [items, total]);

  const appearance = {
    theme: "stripe" as const,
    variables: {
      colorPrimary: "#d72638",
      colorBackground: "#019fb5",
      colorText: "#ffffff",
      colorDanger: "#d72638",
      borderRadius: "12px",
      fontFamily:
        "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    },
    rules: {
      ".Input": {
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.18)",
        backgroundColor: "rgba(0,0,0,0.25)",
        color: "#ffffff",
      },
      ".Label": {
        color: "#f5f5f5",
        fontSize: "13px",
      },
    },
  };

  const options =
    clientSecret !== null
      ? { clientSecret, appearance }
      : undefined;

  const formatCents = (cents: number | null | undefined) =>
    typeof cents === "number"
      ? `$${(cents / 100).toFixed(2)}`
      : `$${total.toFixed(2)}`;

  // values from backend if available, otherwise fallback
  const subtotalDisplay = serverTotals
    ? formatCents(serverTotals.subtotalCents)
    : `$${total.toFixed(2)}`;
  const taxDisplay = serverTotals
    ? formatCents(serverTotals.taxCents)
    : "$0.00";
  const shippingDisplay = serverTotals
    ? formatCents(serverTotals.shippingCents)
    : "$0.00";
  const grandTotalDisplay = serverTotals
    ? formatCents(serverTotals.totalCents)
    : `$${total.toFixed(2)}`;

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#38c6cf" }} // inspired by Our Story section
    >
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-semibold tracking-wide">
            Checkout
          </h1>
          <p className="mt-3 text-neutral-100/90">
            Review your order and pay securely.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Order summary */}
          <section className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-6 shadow-[0_18px_45px_rgba(0,0,0,0.3)]">
            <h2 className="mb-5 text-xl font-semibold">Your order</h2>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="mb-4 flex justify-between border-b border-white/20 pb-3"
              >
                <div>
                  <p className="text-white font-medium">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-white/80">
                    Qty: {item.qty}
                  </p>
                </div>

                <p className="text-white font-semibold">
                  ${(item.product.price * item.qty).toFixed(2)}
                </p>
              </div>
            ))}

            {/* Breakdown from backend */}
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between text-white/90">
                <span>Subtotal</span>
                <span>{subtotalDisplay}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Tax</span>
                <span>{taxDisplay}</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>Pickup (no shipping)</span>
                <span>{shippingDisplay}</span>
              </div>
              <div className="flex justify-between pt-3 mt-2 border-t border-white/25 text-base font-semibold">
                <span>Total</span>
                <span>{grandTotalDisplay}</span>
              </div>
            </div>
          </section>

          {/* Contact info */}
          <section className="rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-6 shadow-[0_18px_45px_rgba(0,0,0,0.3)]">
            <h2 className="mb-5 text-xl font-semibold">
              Contact information
            </h2>

            <label className="block text-sm mb-5">
              <span className="block mb-2 text-white">
                Email for receipt
              </span>

              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/30 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-[#d72638] focus:ring-1 focus:ring-[#d72638]"
              />
            </label>

            <p className="text-xs text-white/90">
              We’ll send your Stripe receipt and order confirmation to this
              email.
            </p>
          </section>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-[#7f1d1d] px-4 py-3 text-sm text-red-100 border border-red-700/60">
            {error}
          </div>
        )}

        {loading && (
          <p className="mt-6 text-white/90">
            Preparing your secure payment…
          </p>
        )}

        {!loading && options && clientSecret && items.length > 0 && (
          <section className="mt-10 rounded-3xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-8 shadow-[0_18px_45px_rgba(0,0,0,0.3)]">
            <h2 className="mb-4 text-xl font-semibold flex items-center gap-2">
              <span>Payment method</span>
              <span className="text-xs rounded-full bg-black/40 px-2 py-1">
                Secure • Powered by Stripe
              </span>
            </h2>

            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm
                clientSecret={clientSecret}
                customerEmail={customerEmail}
              />
            </Elements>
          </section>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
