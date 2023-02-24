@get
external contentWindow: Js.nullable<Dom.element> => Js.nullable<Dom.element> = "contentWindow"
@send
external postMessage: (Js.nullable<Dom.element>, string, string) => unit = "postMessage"
external jsonToRef: Js.Json.t => React.ref<Js.nullable<Dom.element>> = "%identity"
@get external getClientSecret: 'a => string = "clientSecret"
external toJson: 'b => Js.Json.t = "%identity"
type func = (. unit) => string
external toFunc: 'c => func = "%identity"

type paymentElement

type address = {
  city: option<string>,
  country: option<string>,
  line1: option<string>,
  line2: option<string>,
  postal_code: option<string>,
  state: option<string>,
}
type confirmCardPaymentMethodType = String(string) | Obj(Js.Json.t)
type shipping = {
  address: address,
  name: string,
  carrier: option<string>,
  phone: option<string>,
  tracking_number: option<string>,
}
type paymentMethodOptionsCard = {
  cvc: React.element,
  network: string,
}
type paymentMethodOptions = {card: paymentMethodOptionsCard}
type confirmCardPaymentDataType = {
  payment_method: confirmCardPaymentMethodType,
  shipping: shipping,
  return_url: string,
  receipt_email: string,
  setup_future_usage: string,
  payment_method_options: string,
}
type elementsOptions = {
  fonts: Js.Array2.t<Js.Json.t>,
  locale: string,
  clientSecret: string,
  appearance: Js.Dict.t<Js.Json.t>,
  loader: string,
}
external optionsToJson: elementsOptions => Js.Json.t = "%identity"
type rec elementsType = {
  options: elementsOptions,
  update: Js.Json.t => unit,
  getElement: Js.Dict.key => option<OrcaJs.paymentElement>,
  fetchUpdates: unit => Js.Promise.t<Js.Json.t>,
  create: (string, Js.Json.t) => OrcaJs.paymentElement, // return a react component instead by doing new Payment Element.
}

type elementsContextType = {options: Js.Dict.t<Js.Json.t>}
type confirmPaymentParams = {return_url: string}
type switchContextType = {
  clientSecret: string,
  confirmPayment: Js.Json.t => Js.Promise.t<Js.Json.t>,
  confirmCardPayment: Js_OO.Callback.arity4<
    (OrcaJs.This.t, string, option<Js.Json.t>, option<Js.Json.t>) => Js.Promise.t<Js.Json.t>,
  >,
  retrievePaymentIntent: string => Js.Promise.t<Js.Json.t>,
  paymentRequest: Js.Json.t => Js.Json.t,
}

let confirmPaymentFn = (_elements: Js.Json.t) => {
  Js.Promise.resolve(Js.Dict.empty()->Js.Json.object_)
}
let confirmCardPaymentFn =
  @this
  (
    _this: OrcaJs.This.t,
    _clientSecretId: string,
    _data: option<Js.Json.t>,
    _options: option<Js.Json.t>,
  ) => {
    Js.Promise.resolve(Js.Dict.empty()->Js.Json.object_)
  }

let retrievePaymentIntentFn = _paymentIntentId => {
  Js.Promise.resolve(Js.Dict.empty()->Js.Json.object_)
}
let paymentRequest = options => {
  options
}

let defaultSwitchContext = {
  clientSecret: "",
  confirmPayment: confirmPaymentFn,
  confirmCardPayment: confirmCardPaymentFn,
  retrievePaymentIntent: retrievePaymentIntentFn,
  paymentRequest,
}

let switchContext = React.createContext(defaultSwitchContext)

module SwitchContextProvider = {
  let makeProps = (~value, ~children, ()) =>
    {
      "value": value,
      "children": children,
    }

  let make = React.Context.provider(switchContext)
}

let getString = (dict, key, defaultVal) => {
  dict
  ->Js.Dict.get(key)
  ->Belt.Option.flatMap(Js.Json.decodeString)
  ->Belt.Option.getWithDefault(defaultVal)
}

let elementsOptionObjMapper = (options: Js.Json.t) => {
  let dict = options->Js.Json.decodeObject->Belt.Option.getWithDefault(Js.Dict.empty())
  {
    fonts: dict
    ->Js.Dict.get("fonts")
    ->Belt.Option.flatMap(Js.Json.decodeArray)
    ->Belt.Option.getWithDefault([]),
    locale: dict->getString("locale", ""),
    clientSecret: dict->getString("clientSecret", ""),
    appearance: dict
    ->Js.Dict.get("appearance")
    ->Belt.Option.flatMap(Js.Json.decodeObject)
    ->Belt.Option.getWithDefault(Js.Dict.empty()),
    loader: dict->getString("loader", "auto"),
  }
}

let update = _options => {
  ()
}

let getElement = _componentName => {
  None
}

let fetchUpdates = () => {
  //add API call
  Js.Promise.make((~resolve, ~reject as _) => {
    Js.Global.setTimeout(() => resolve(. Js.Dict.empty()->Js.Json.object_), 1000)->ignore
  })
}

let create = (_componentType, _options) => {
  OrcaJs.defaultPaymentElement
}
let defaultElementsContext = {
  options: {
    fonts: [],
    locale: "",
    clientSecret: "",
    appearance: Js.Dict.empty(),
    loader: "",
  },
  update,
  getElement,
  fetchUpdates,
  create,
}

let elementsContext = React.createContext(defaultElementsContext)

module ElementsContextProvider = {
  let makeProps = (~value, ~children, ()) =>
    {
      "value": value,
      "children": children,
    }

  let make = React.Context.provider(elementsContext)
}
