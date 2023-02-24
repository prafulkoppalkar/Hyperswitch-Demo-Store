type eventData = {
  iframeMounted: bool,
  focusTriggered: bool,
  blurTriggered: bool,
  clickTriggered: bool,
  elementType: string,
  classChange: bool,
  newClassType: string,
}
type event = {key: string, data: eventData}
type eventParam = Event(event) | EventData(eventData) | Empty
type eventHandler = eventParam => unit

module This = {
  type t
  @get
  external iframeElem: t => option<Js.nullable<Dom.element>> = "iframeElem"
}

type paymentElement = {
  on: (string, option<option<Js.Json.t> => unit>) => unit,
  collapse: unit => unit,
  blur: unit => unit,
  update: Js.Json.t => unit,
  destroy: unit => unit,
  unmount: unit => unit,
  mount: string => unit,
  focus: unit => unit,
  clear: unit => unit,
}

let defaultPaymentElement = {
  on: (_str, _func) => (),
  collapse: () => (),
  blur: () => (),
  update: _x => (),
  destroy: () => (),
  unmount: () => (),
  mount: _string => (),
  focus: () => (),
  clear: () => (),
}

type element = {
  getElement: Js.Dict.key => option<paymentElement>,
  update: Js.Json.t => unit,
  fetchUpdates: unit => Js.Promise.t<Js.Json.t>,
  create: (Js.Dict.key, Js.Json.t) => paymentElement,
}

type confirmParams = {return_url: string}

type confirmPaymentParams = {
  elements: Js.Json.t,
  confirmParams: Js.Nullable.t<confirmParams>,
}

type switchInstance = {
  confirmPayment: Js.Json.t => Js.Promise.t<Js.Json.t>,
  elements: Js.Json.t => element,
  confirmCardPayment: Js_OO.Callback.arity4<
    (This.t, string, option<Js.Json.t>, option<Js.Json.t>) => Js.Promise.t<Js.Json.t>,
  >,
  retrievePaymentIntent: string => Js.Promise.t<Js.Json.t>,
  paymentRequest: Js.Json.t => Js.Json.t,
}
