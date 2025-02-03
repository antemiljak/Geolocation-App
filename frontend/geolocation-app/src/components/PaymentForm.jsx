import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axiosInstance from "../utils/axiosInstance";

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    // Get a client secret from your server
    const { data } = await axiosInstance.post("/create-payment-intent", {
      amount: amount, // Pass the amount to be paid (in cents)
    });

    const clientSecret = data.clientSecret;

    // Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Customer Name",
          },
        },
      }
    );

    if (error) {
      console.log("Payment failed", error);
      alert(error.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded", paymentIntent);
        alert("Payment Successful!");
        // Optionally, you can call an API to store the payment info in your database
      }
    }

    setLoading(false);
  };

  return (
    <div className="payment-form">
      <h2>Pay {amount / 100}€</h2>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button disabled={loading || !stripe} type="submit">
          {loading ? "Processing..." : "Pay now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
