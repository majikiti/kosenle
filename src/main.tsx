import { render } from "preact"
import { App } from "./app/app"

render(<App />, document.getElementById("app")!)

console.log(
  "%cこんにちは!",
  "color: #FF0000; font-size: 8em; font-weight: bold;"
)
