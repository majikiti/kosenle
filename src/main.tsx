import { render } from "preact"
import { Router, Route } from "preact-router"
import Game from "./app/game"
import About from "./app/about"

const App = () => (
  <Router>
    <Route path='/' component={Game} />
    <Route path='/about' component={About} />
  </Router>
)

//render(<App />, document.getElementById("app")!)
render(<Game />, document.getElementById("app")!)

console.log(
  "%cこんにちは!",
  "color: #FF0000; font-size: 8em; font-weight: bold;"
)
