type eventData = {
  iframeMounted: bool,
  focusTriggered: bool,
  blurTriggered: bool,
  clickTriggered: bool,
  elementType: string,
  classChange: bool,
  newClassType: string,
}

let \"Elements": {
  "children": React.element,
  "options": Js.Json.t,
  "stripe": Js.Promise.t<OrcaJs.switchInstance>,
} => React.element

let \"HyperElements": {
  "children": React.element,
  "options": Js.Json.t,
  "hyper": Js.Promise.t<OrcaJs.switchInstance>,
} => React.element

let \"PaymentElement": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element


let \"UnifiedCheckout": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardElement": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardWidget": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardNumberElement": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardNumberWidget": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardExpiryElement": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardExpiryWidget": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardCVCElement": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let \"CardCVCWidget": {
  "id": string,
  "onBlur": option<option<Js.Json.t> => unit>,
  "onChange": option<option<Js.Json.t> => unit>,
  "onClick": option<option<Js.Json.t> => unit>,
  "onFocus": option<option<Js.Json.t> => unit>,
  "onReady": option<option<Js.Json.t> => unit>,
  "options": Js.Json.t,
} => React.element

let useStripe: unit => Context.switchContextType

let useHyper: unit => Context.switchContextType

let useElements: unit => Context.elementsType

let useWidgets: unit => Context.elementsType
