import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = () => {
  const location = useLocation();
  const { amount } = location.state || {};
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Payment failed:", error);
      setLoading(false);
    } else {
      console.log("Payment method created:", paymentMethod);
      setLoading(false);
      alert("Payment successful!");
      navigate("/admin");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Pay {amount}€
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    backgroundColor: "#f8f8f8",
                    borderRadius: "0.375rem",
                    padding: "12px",
                    "::placeholder": {
                      color: "#bbb",
                    },
                  },
                  complete: {
                    color: "#4caf50",
                  },
                  empty: {
                    color: "#ff6347",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !stripe}
            className={`w-full py-3 text-white rounded-lg mt-4 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
