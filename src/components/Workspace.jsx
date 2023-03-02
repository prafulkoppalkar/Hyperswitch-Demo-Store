import './style.css';
import React from "react";
import Cart from './Cart'
import { loadHyper } from "@juspay-tech/hyper-js";
import { Elements, useHyper } from "@juspay-tech/react-hyper-js";
import SDK from './SDK'
import CartItems from './CartItems';
import Confirm from './Confirm';
function ElementsComp ({options, options1}) {
  const hyperPromise = loadHyper("pk_snd_3b33cd9404234113804aa1accaabe22f");
  return (
    <Elements options={options} stripe={hyperPromise}>
      <SDK options1={options1}/>
    </Elements>
  )
}
export default function Workspace({clientSecret, savedMethods}) {
  console.log("client",clientSecret)
    const stripe = useHyper()
    const [showSDK , setShowSDK] = React.useState(false)
    const [confirmStatus , setStatus] = React.useState("")
    const [options, setOptions] = React.useState({
      clientSecret,
      appearance: {
        theme: "charcoal",
        variables: {
          colorPrimary: "#006DF9",
          colorBackground: "transparent",
          spacingUnit: "13px",
        },
        rules: {
          '.PickerItem--selected':{
            // border: "1px solid #000000",
            // color:"#ffffff",
            // backgroundColor:"#000000",
            background: "rgba(0, 109, 249, 0.1)",
            border: "1px solid #006DF9",
            borderRadius: "112px",
            color: "#0c0b0b",
            fontWeight: "700",
          },
          '.PickerItem':{
            // backgroundColor:"#7e787817",
            borderRadius: "30px",
            border: "1px solid #7e787817",
          },
          '.PickerItem:hover':{
            // backgroundColor:"#7e787817",
            borderRadius: "30px",
            border: "1px solid #ffffff",
          },
          '.PickerItem--selected:hover':{
            // border: "1px solid #000000",
            // color:"#ffffff",
            // backgroundColor:"#000000",
            background: "rgba(0, 109, 249, 0.1)",
            border: "1px solid #006DF9",
            borderRadius: "30px",
            color: "#0c0b0b",
            fontWeight: "700",
          },
          '.Input': {
            borderRadius: '8px',
            border: "1px solid #D6D9E0"
          },
          '.Tab': {
            borderRadius: '0px',
            display: "flex",
            fontSize:"15px",
            gap: "8px",
            border: "1px solid #7e787817",
            borderRadius:"30px",
            flexDirection: "row",
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.Tab:hover': {
            border: "1px solid transparent",
            borderRadius: "30px",
            color: "#000000",
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
    })

    // console.log(">>>>methods",savedMethods)
    // console.log(">>>>client",clientSecret)
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
          theme:"light", 
          type: "default", 
          height: 48
        }
      },
      // paymentMethodOrder: ["cards", "klarna"],
      customerPaymentMethods:savedMethods,
    };

    React.useEffect(()=>{
      // console.log("inside1")
      setOptions({...options, clientSecret})
    }, [clientSecret])

    // console.log(">>>>options1",options1)
    // console.log(">>>>options",options)
    React.useEffect(() => {
      if (!stripe) {
        return;
      }
      const status = new URLSearchParams(window.location.search).get(
        "status"
      );
      if (!status) {
        return;
      } else {
          setStatus(status)
      }
    }, [stripe]);

    var elements = 
      <div className='elements'>
        {savedMethods && <ElementsComp key={options.clientSecret} options={options} options1={options1}/>}
      </div>
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
