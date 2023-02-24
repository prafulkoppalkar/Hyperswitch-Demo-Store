type eventData = {
  iframeMounted: bool,
  focusTriggered: bool,
  blurTriggered: bool,
  clickTriggered: bool,
  elementType: string,
  classChange: bool,
  newClassType: string,
}

module Elements2 = {
  @react.component
  let make = (~children, ~stripe: Js.Promise.t<OrcaJs.switchInstance>, ~options: Js.Json.t) => {
    let elementOptions = options->Context.elementsOptionObjMapper
    let (switchState, setSwitchState) = React.useState(() => Context.defaultSwitchContext)
    let (elementsState, setElementsState) = React.useState(() => Context.defaultElementsContext)

    React.useEffect0(() => {
      stripe->Js.Promise.then_((switchInstance: OrcaJs.switchInstance) => {
        let orcaElementsConfig = switchInstance.elements(options)
        let newElemValues: Context.elementsType = {
          options: elementOptions,
          update: orcaElementsConfig.update,
          getElement: orcaElementsConfig.getElement,
          fetchUpdates: orcaElementsConfig.fetchUpdates,
          create: orcaElementsConfig.create,
        }
        let newSwitchVal: Context.switchContextType = {
          confirmPayment: switchInstance.confirmPayment,
          confirmCardPayment: switchInstance.confirmCardPayment,
          retrievePaymentIntent: switchInstance.retrievePaymentIntent,
          clientSecret: elementOptions.clientSecret,
          paymentRequest: switchInstance.paymentRequest,
        }

        let switchValClone = {...newSwitchVal, clientSecret: elementOptions.clientSecret}
        setSwitchState(_ => switchValClone)
        setElementsState(_ => newElemValues)
        Js.Promise.resolve(switchValClone)
      }, _)->ignore
      None
    })

    <Context.SwitchContextProvider value={switchState}>
      <Context.ElementsContextProvider value={elementsState}>
        {children}
      </Context.ElementsContextProvider>
    </Context.SwitchContextProvider>
  }
}

module HyperElements2 = {
  @react.component
  let make = (~children, ~hyper: Js.Promise.t<OrcaJs.switchInstance>, ~options: Js.Json.t) => {
    let elementOptions = options->Context.elementsOptionObjMapper
    let (switchState, setSwitchState) = React.useState(() => Context.defaultSwitchContext)
    let (elementsState, setElementsState) = React.useState(() => Context.defaultElementsContext)

    React.useEffect0(() => {
      hyper->Js.Promise.then_((switchInstance: OrcaJs.switchInstance) => {
        let orcaElementsConfig = switchInstance.elements(options)
        let newElemValues: Context.elementsType = {
          options: elementOptions,
          update: orcaElementsConfig.update,
          getElement: orcaElementsConfig.getElement,
          fetchUpdates: orcaElementsConfig.fetchUpdates,
          create: orcaElementsConfig.create,
        }
        let newSwitchVal: Context.switchContextType = {
          confirmPayment: switchInstance.confirmPayment,
          confirmCardPayment: switchInstance.confirmCardPayment,
          retrievePaymentIntent: switchInstance.retrievePaymentIntent,
          clientSecret: elementOptions.clientSecret,
          paymentRequest: switchInstance.paymentRequest,
        }

        let switchValClone = {...newSwitchVal, clientSecret: elementOptions.clientSecret}
        setSwitchState(_ => switchValClone)
        setElementsState(_ => newElemValues)
        Js.Promise.resolve(switchValClone)
      }, _)->ignore
      None
    })

    <Context.SwitchContextProvider value={switchState}>
      <Context.ElementsContextProvider value={elementsState}>
        {children}
      </Context.ElementsContextProvider>
    </Context.SwitchContextProvider>
  }
}

let \"Elements" = Elements2.make

let \"HyperElements" = HyperElements2.make

let useHyper = () => {
  React.useContext(Context.switchContext)
}

let useStripe = () => {
  Js.Console.warn("useStripe() is deprecated. Use useHyper() instead")
  useHyper()
}
let useWidgets = () => {
  React.useContext(Context.elementsContext)
}
let useElements = () => {
  Js.Console.warn("useElements() is deprecated. Use useWidgets() instead")
  useWidgets()
}

module PaymentElementsWrapper = {
  @react.component
  let make = (
    ~id="payment-Element",
    ~options: Js.Json.t,
    ~onChange,
    ~onReady,
    ~componentType: string,
    ~onFocus,
    ~onBlur,
    ~onClick,
  ) => {
    let hyperSwitch = React.useContext(Context.switchContext)
    let elementsState = React.useContext(Context.elementsContext)
    let divRef = React.useRef(Js.Nullable.null)

    let paymentElement = elementsState.create(componentType, options)

    React.useEffect2(() => {
      let paymentElement = elementsState.create(componentType, options)
      paymentElement.mount(`#orca-elements-payment-element-${id}`)
      None
    }, (divRef, elementsState))

    React.useEffect2(() => {
      paymentElement.on("ready", onReady)
      paymentElement.on("focus", onFocus)
      paymentElement.on("blur", onBlur)
      paymentElement.on("clickTriggered", onClick)
      paymentElement.on("change", onChange)
      None
    }, (elementsState, hyperSwitch))

    <div ref={divRef->ReactDOM.Ref.domRef} id={`orca-elements-payment-element-${id}`} />
  }
}

module PaymentElement2 = {
  @react.component
  let make = (~id, ~options: Js.Json.t, ~onChange, ~onReady, ~onFocus, ~onBlur, ~onClick) => {
    <PaymentElementsWrapper
      id options onChange onReady onFocus onBlur onClick componentType="payment"
    />
  }
}
let \"PaymentElement" = PaymentElement2.make

let \"UnifiedCheckout" = PaymentElement2.make

module CardElement2 = {
  @react.component
  let make = (~id, ~options: Js.Json.t, ~onChange, ~onReady, ~onFocus, ~onBlur, ~onClick) => {
    <PaymentElementsWrapper
      id options onChange onReady onFocus onBlur onClick componentType="card"
    />
  }
}
let \"CardElement" = CardElement2.make

let \"CardWidget" = CardElement2.make

module CardNumber2 = {
  @react.component
  let make = (~id, ~options: Js.Json.t, ~onChange, ~onReady, ~onFocus, ~onBlur, ~onClick) => {
    <PaymentElementsWrapper
      id options onChange onReady onFocus onBlur onClick componentType="cardNumber"
    />
  }
}
let \"CardNumberElement" = CardNumber2.make

let \"CardNumberWidget" = CardNumber2.make

module CardCVC2 = {
  @react.component
  let make = (~id, ~options: Js.Json.t, ~onChange, ~onReady, ~onFocus, ~onBlur, ~onClick) => {
    <PaymentElementsWrapper
      id options onChange onReady onFocus onBlur onClick componentType="cardCvc"
    />
  }
}
let \"CardCVCElement" = CardCVC2.make

let \"CardCVCWidget" = CardCVC2.make

module CardExpiry2 = {
  @react.component
  let make = (~id, ~options: Js.Json.t, ~onChange, ~onReady, ~onFocus, ~onBlur, ~onClick) => {
    <PaymentElementsWrapper
      id options onChange onReady onFocus onBlur onClick componentType="cardExpiry"
    />
  }
}
let \"CardExpiryElement" = CardExpiry2.make

let \"CardExpiryWidget" = CardExpiry2.make

