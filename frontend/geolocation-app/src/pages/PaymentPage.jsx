import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51QoTBY2fQZGvHcvHBAKI2glAfQobK90jSjJAwsHJPvrUceaKFN48Y0fviFu6mflGKyvh5GxhzUemoZu6LEbQRMfw00dfvNR2p3"
);

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default PaymentPage;
