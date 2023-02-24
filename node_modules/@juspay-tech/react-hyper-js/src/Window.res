type window
type parent

type event = {data: Js.Json.t}
@val @scope("window")
external addEventListener: (string, _ => unit) => unit = "addEventListener"
@val @scope("window")
external removeEventListener: (string, 'ev => unit) => unit = "removeEventListener"

@val external window: window = "window"
@val @scope("window") external iframeParent: parent = "parent"

external eventToJson: event => Js.Json.t = "%identity"

@val @scope(("window", "location"))
external replace: string => unit = "replace"

type domElement
@send external postMessage: (domElement, string, string) => unit = "postMessage"

@get
external contentWindow: Js.nullable<Dom.element> => domElement = "contentWindow"

let iframePostMessage = (iframeRef: React.ref<Js.nullable<Dom.element>>, message) => {
  iframeRef.current->contentWindow->postMessage(message->Js.Json.stringify, "*")
}
