import './style.css';
import React, { useEffect, useState } from "react";
import {
  PaymentElement, useWidgets, 
} from "@juspay-tech/react-hyper-js";
import { useHyper } from "@juspay-tech/react-hyper-js";

export default function SDK({options1}) {
    const stripe = useHyper()
    const elements = useWidgets()
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    // React.useEffect(()=>{
    //   console.log("cliensecret", clientSecret)
    //   elements.update({layout:"accordion"})
    // },[clientSecret])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
        console.log("ELEMENTS", elements)
        console.log("loading")
        setIsLoading(true);
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: "https://demo-hyperswitch.netlify.app/",
          },
        });
        console.log("ERORR", error)
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        }
        else {
            if (error.message) {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        }
        setIsLoading(false);
      };

      useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "order_id"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          console.log("inisde effect", paymentIntent);
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
      }, [stripe]);
      var ui = <PaymentElement id="paymentElement" options={options1} />;
    return (
        <div className="SDK">
            <form id="payment-form" onSubmit={handleSubmit}>
                <div id="payment-form">
                {ui}
                <button id="submit" type="submit" className="checkoutButton" >
          {isLoading ? <div className="spinner" id="spinner"></div> : <span id="button-text">Pay 200.00</span>}
        </button>
      {message && <div id="payment-message">{message}</div>}
      </div>
      </form>
        </div>
    )
}