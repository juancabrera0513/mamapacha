// netlify/functions/create-payment-intent.js
const Stripe = require("stripe");

const stripeSecret = process.env.STRIPE_SECRET_KEY;

// ⚙️ CONFIG (ajusta esto a tu realidad)
const TAX_RATE = 0.0; // 0 = sin tax por ahora. Ejemplo futuro: 0.08 = 8%
const SHIPPING_FLAT_CENTS = 0; // Pickup only, no shipping fee

/**
 * PRODUCT_PRICES:
 * Mapa de IDs de producto -> precio en centavos.
 * IMPORTANTE: los IDs deben coincidir con product.id en tu frontend.
 *
 * Ejemplo:
 *  "sazon-no-salt-no-additives": 1000, // $10.00
 */
const PRODUCT_PRICES = {
  "trifongo-small": 5500,
  "trifongo-large": 8500,
  "yuca-ajillo-small": 5000,
  "yuca-ajillo-large": 7500,
  "coditos-small": 5000,
  "coditos-large": 7500,
  "gandules-small": 5000,
  "gandules-large": 7500,
  "pulled-pork": 999,
  "pulled-chicken": 999,
  "empanadas-beef": 1499,
  "empanadas-chicken": 1499,
  "empanadas-patelon": 1499,
  "empanadas-pizza": 1399,
  "empanadas-veggie": 1399,
  "adobo": 699,
  "sazon": 799
};



function calculateTotalsFromItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No cart items provided");
  }

  let subtotalCents = 0;

  for (const item of items) {
    const { id, qty } = item;
    const quantity = qty || item.quantity || 1;

    const unitPriceCents = PRODUCT_PRICES[id];
    if (typeof unitPriceCents !== "number") {
      throw new Error(`Unknown product id in order: ${id}`);
    }

    subtotalCents += unitPriceCents * quantity;
  }

  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const shippingCents = SHIPPING_FLAT_CENTS;
  const totalCents = subtotalCents + taxCents + shippingCents;

  return {
    subtotalCents,
    taxCents,
    shippingCents,
    totalCents,
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    if (
      !stripeSecret ||
      !(
        stripeSecret.startsWith("sk_test_") ||
        stripeSecret.startsWith("sk_live_")
      )
    ) {
      console.error(
        "STRIPE_SECRET_KEY is invalid or missing:",
        stripeSecret ? stripeSecret.slice(0, 8) + "..." : "undefined"
      );
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "Stripe secret key is not configured correctly.",
        }),
      };
    }

    const stripe = new Stripe(stripeSecret);

    const data = JSON.parse(event.body || "{}");
    const { items, customerEmail } = data;

    // 🧮 Calcular totales a partir de los items (servidor = source of truth)
    const totals = calculateTotalsFromItems(items);
    const { totalCents, subtotalCents, taxCents, shippingCents } = totals;

    if (!Number.isInteger(totalCents) || totalCents <= 0) {
      throw new Error("Calculated total amount is invalid.");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      receipt_email: customerEmail || undefined,
      metadata: {
        source: "mamapacha-website",
        subtotal_cents: String(subtotalCents),
        tax_cents: String(taxCents),
        shipping_cents: String(shippingCents),
      },
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        totals, // devolvemos el breakdown para mostrarlo en el front
      }),
    };
  } catch (err) {
    console.error("Error creating payment intent:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Internal Server Error",
        message: err.message,
      }),
    };
  }
};
