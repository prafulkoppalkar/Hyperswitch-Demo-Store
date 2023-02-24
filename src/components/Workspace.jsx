import './style.css';
import React from "react";
import Cart from './Cart'
import { loadHyper } from "@juspay-tech/hyper-js";
import { Elements, useHyper } from "@juspay-tech/react-hyper-js";
import SDK from './SDK'
import CartItems from './CartItems';
import Confirm from './Confirm';
const stripePromise = loadHyper("pk_snd_1e5425f5dea94ee793cf34ea326294d8");
export default function Workspace({clientSecret}) {
    const stripe = useHyper()
    const [showSDK , setShowSDK] = React.useState(false)
    const [confirmStatus , setStatus] = React.useState("")
    // console.log(">>>>",clientSecret)
      const options1 = {
        fields: {
          billingDetails: {
            address: {
              country: "auto",
              city: "auto",
            },
          },
        },
        layout: { 
            type: "tabs",
            defaultCollapsed: false,
            radios: true,
            spacedAccordionItems: false,
        },
       
        wallets: {
          walletReturnUrl: "https://demo-hyperswitch.netlify.app/",
          applePay: "auto",
          googlePay: "auto",
          style: {
            theme:"dark", 
            type: "default", 
            height: 48
          }
        },
        // paymentMethodOrder: ["cards", "klarna"],
    };
    let options = {
        clientSecret,
        appearance: {
          theme: "charcoal",
          variables: {
            colorPrimary: "#006DF9",
            colorBackground: "transparent",
            spacingUnit: "13px",
          },
          rules: {
            '.Input': {
              borderRadius: '8px',
              border: "1px solid #D6D9E0"
            },
            '.Tab': {
              borderRadius: '0px',
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
            },
            '.Tab:hover': {
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              padding: "15px 32px",
              background: "rgba(0, 109, 249, 0.1)",
              border: "1px solid #006DF9",
              borderRadius: "112px",
              color: "#0c0b0b",
              fontWeight: "700",
            },
            ".Tab--selected": {
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              padding: "15px 32px",
              background: "rgba(0, 109, 249, 0.1)",
              border: "1px solid #006DF9",
              borderRadius: "112px",
              color: "#0c0b0b",
              fontWeight: "700",
            },
            '.Label' :{
              color:"rgba(45, 50, 65, 0.5)",
              marginBottom: "3px",
            },
            '.CheckboxLabel':{
              color:"rgba(45, 50, 65, 0.5)",
            },
            '.TabLabel':{
                overflowWrap: "break-word",
            },
            '.Tab--selected:hover': {
              display: "flex",
              gap: "8px",
              flexDirection: "row",
              justifyContent: 'center',
              alignItems: 'center',
              padding: "15px 32px",
              background: "rgba(0, 109, 249, 0.1)",
              border: "1px solid #006DF9",
              borderRadius: "112px",
              color: "#0c0b0b",
              fontWeight: "700",
            },
            // See all supported class names and selector syntax below
          },
        },
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap",
          },
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Qwitcher+Grypen:wght@400;700&display=swap",
          },
          {
            cssSrc: "https://fonts.googleapis.com/css2?family=Combo&display=swap",
          },
          {
            family: "something",
            src: "https://fonts.gstatic.com/s/combo/v21/BXRlvF3Jh_fIhj0lDO5Q82f1.woff2",
            weight: "700",
          },
        ],
        locale: "en",
        loader: "always",
      };
      React.useEffect(() => {
        if (!stripe) {
          return;
        }
        const status = new URLSearchParams(window.location.search).get(
          "status"
        );
        // console.log("status ", status)
        if (!status) {
          return;
        } else {
            setStatus(status)
        }
      }, [stripe]);
      var elements = clientSecret && (
        <div className='elements'>
          <Elements options={options} stripe={stripePromise}>
            <SDK options1={options1}/>
          </Elements>
        </div>
      );
      var ele = showSDK && !confirmStatus ? (
        <>
            <div className='body1'>
                {elements}
            </div>
            <div className='body2'>
                <div className='containerText'>Order Summary</div>
                <CartItems/>
                <div className='paymentDescription'>
                    <div className="textbox">
                    This is a sample transaction that uses test credentials and does not involve real money.
                    </div>
                </div>
            {/* </div>  */}
            </div>
        </>
        ): !showSDK && !confirmStatus 
            ?(<Cart setOpenSDK={setShowSDK}/>)
            : (<Confirm status={confirmStatus}/>)

    return (
    <div className="Container">
        {ele}
    </div>
    )
}
