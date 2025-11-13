// src/pages/Policies.tsx
import React from "react";

export default function PoliciesPage() {
  return (
    <main className="relative">
      {/* Fondo suave en el top */}
      <div className="absolute inset-0 -z-10 bg-[#41C1CC]/8" aria-hidden />

      <section className="relative" style={{ paddingTop: "var(--header-h, 36px)" }}>
        <div className="container-xl py-12 sm:py-16">
          <header className="mb-8 text-center">
            <h1 className="font-serif text-4xl font-extrabold tracking-tight">
              MAMA PACHA SABOR POLICIES
            </h1>
            <p className="mt-2 text-neutral-700 max-w-3xl mx-auto">
              Welcome to Mama Pacha! We strive to provide you with high-quality products and exceptional service. Please review our policies below to ensure a smooth shopping experience.
            </p>
          </header>

          <div className="rounded-3xl bg-white border border-neutral-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              {/* Shipping Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0b5e63]">Shipping Policy</h2>

                <h3 className="mt-4 text-lg font-semibold">Processing Time</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>Orders are processed within 2-3 business days.</li>
                  <li>Catering orders require a minimum of 7 days’ notice. For large events, please contact us at least 14 days in advance.</li>
                </ul>

                <h3 className="mt-5 text-lg font-semibold">Shipping Rates and Delivery</h3>
                <p className="mt-2 text-neutral-800">
                  Shipping rates are calculated at checkout based on your location and the weight of your order.
                </p>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>We offer standard shipping (5–7 business days) and expedited shipping (2–3 business days) for Mama Pacha spices.</li>
                  <li>Catering orders are available for local delivery only. Delivery charges may apply based on the distance from our kitchen.</li>
                </ul>
              </section>

              {/* Return Policy */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0b5e63]">Return Policy</h2>

                <h3 className="mt-4 text-lg font-semibold">Mama Pacha Spices</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>If you are not completely satisfied with your spice purchase, please contact us within 14 days of receiving your order.</li>
                  <li>We accept returns of unopened and unused products. Customers are responsible for return shipping costs.</li>
                  <li>Refunds will be processed within 7–10 business days upon receipt of the returned items.</li>
                </ul>

                <h3 className="mt-5 text-lg font-semibold">Catering Services</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>Due to the perishable nature of our catering services, we do not accept returns or offer refunds for catering orders.</li>
                  <li>Cancellations must be received and confirmed 72 hours before the scheduled delivery or pickup time.</li>
                  <li>Cancellations made within 72 hours of the event will incur a 50% cancellation fee. Deposit will not be refunded.</li>
                </ul>
              </section>

              {/* Ordering Spices */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0b5e63]">Ordering Mama Pacha Spices</h2>

                <h3 className="mt-4 text-lg font-semibold">Online Orders</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>Visit our website to browse and purchase our range of blended spices.</li>
                  <li>Add your desired products to the cart and proceed to checkout.</li>
                </ul>

                <h3 className="mt-5 text-lg font-semibold">Payment Methods</h3>
                <p className="mt-2 text-neutral-800">
                  We accept major credit cards, PayPal, and other secure payment methods.
                </p>

                <h3 className="mt-5 text-lg font-semibold">Order Confirmation</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>You will receive an email confirmation once your order has been placed successfully.</li>
                  <li>A shipping confirmation with tracking information will be sent once your order has been dispatched.</li>
                </ul>
              </section>

              {/* Ordering Catering */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#0b5e63]">Ordering Catering Services</h2>

                <h3 className="mt-4 text-lg font-semibold">Request a Quote</h3>
                <ul className="mt-2 list-disc pl-5 text-neutral-800">
                  <li>Complete the Catering Request Form and we will contact you via email or phone to discuss your catering needs.</li>
                  <li>Provide details such as event date, location, number of guests, food allergies/dietary restrictions, and menu preferences.</li>
                </ul>

                <h3 className="mt-5 text-lg font-semibold">Deposit</h3>
                <p className="mt-2 text-neutral-800">
                  A 100% deposit is required to secure your catering booking.
                </p>

                <h3 className="mt-5 text-lg font-semibold">Customization</h3>
                <p className="mt-2 text-neutral-800">
                  We customize our catering menu to suit your preferences and dietary needs, taking great care to prevent cross-contamination. However, please note that as we cook with traditional ingredients, we cannot guarantee a completely allergen-free kitchen.
                </p>
                <p className="mt-2 text-neutral-800">
                  Please inform us of any allergies or special requests when placing your order.
                </p>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-[#0b5e63]">Contact Us</h2>
                <p className="mt-2 text-neutral-800">
                  If you have any questions or need further assistance, please contact us:
                </p>
                <p className="mt-1">
                  Email:{" "}
                  <a
                    className="text-[#0b5e63] font-semibold underline"
                    href="mailto:hola@mamapachasabor.com"
                  >
                    hola@mamapachasabor.com
                  </a>
                </p>
                <p className="mt-6 text-neutral-800">
                  Thank you for choosing Mama Pacha. We look forward to serving you!
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
