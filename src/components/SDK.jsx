import './style.css';
import React, { useEffect, useState } from "react";
import {
  PaymentElement, useWidgets, 
} from "@juspay-tech/react-hyper-js";
import { useHyper } from "@juspay-tech/react-hyper-js";
import {useNavigate} from "react-router-dom";
export default function SDK({options1, setStatus}) {
    const stripe = useHyper()
    const elements = useWidgets()
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handlePaymentStatus(status) {
      switch (status) {
        case "succeeded":
          setMessage("Payment successful");
          setStatus(status)
          navigate("/success")
          break;
        case "processing":
          setMessage("Your payment is processing.");
          setStatus(status)
          navigate("/success")
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          setStatus(status)
          navigate("/success")
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    }

    const handleSubmit = async (e) => {
        // Function to call confirmPayment Api
        e.preventDefault();
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        console.log("ELEMENTS", elements)
        setIsLoading(true);
        const intent = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "https://demo-hyperswitch.netlify.app/success",
          },
          redirect: "if_required",
        });
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`
        console.log("ERORR", intent.eerror)
        if (intent.error) {
          if (intent.error.type === "card_error" || intent.error.type === "validation_error") {
            setMessage(intent.error.message);
          }
          else {
            if (intent.error.message) {
              setMessage(intent.error.message);
            } else {
              setMessage("An unexpected error occurred.");
            }
          }
        }
        if (intent.status) {
          handlePaymentStatus(intent.status)
        }
        setIsLoading(false);
      };
      useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
        // Retrive the Payment Intent to get the status of the request
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          console.log("inisde effect", paymentIntent.status)
          handlePaymentStatus(paymentIntent.status)
        });
      }, [stripe, navigate]);
      var ui = 
      // Load the required element from the package (ex: here choosen the unified checkout)
      <PaymentElement id="paymentElement" options={options1} />;
    return (
    <div className="SDK">
      <form id="payment-form" onSubmit={handleSubmit}>
        <div id="payment-form">
          {ui}
          {/* Render PayNow button to hit PaymentConfirm API */}
          <button id="submit" type="submit" className="checkoutButton" >
            {isLoading ? <div className="spinner" id="spinner"></div> : <span id="button-text">Pay 200.00</span>}
          </button>
          {/* Display the error message if any from retrieve payment intent */}
          {message && <div id="payment-message">{message}</div>}
        </div>
      </form>
    </div>
    )
}