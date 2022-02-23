import { FunctionComponent } from "preact"
import { useState } from "preact/hooks"
import Layout from "@lib/layout"
import "./app.scss"

type Box = {
  char?: string
  state: BoxState
}

type BoxState = "secret" | "correct" | "present" | "absent"

const BoxElem: FunctionComponent<Box> = ({ char, state }) => (
  <div class={`box ${state}`}>
    {state != "secret" && <span class='char'>{char}</span>}
  </div>
)

const Game: FunctionComponent = () => {
  // width: 4 or 5
  // height: 5
  const maxWidth = 5
  const height = 6

  const tab: Box[][] = [...Array(height)].map(() =>
    [...Array(maxWidth)].map(() => ({ state: "secret" }))
  )

  const [input, setInput] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setInput("")
  }

  return (
    <>
      <div class='tab'>
        {tab.map(row => (
          <div class='row'>
            {row.map(box => (
              <BoxElem {...box} />
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          class='input'
          placeholder='hoge高専'
          value={input}
          onChange={({ value }) => setInput(value)}
        />
      </form>
    </>
  )
}

export function App() {
  return (
    <Layout>
      <Game />
    </Layout>
  )
}
