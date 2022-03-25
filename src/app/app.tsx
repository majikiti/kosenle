import { FunctionComponent } from "preact"
import { useReducer } from "preact/hooks"
import { RndToday } from "@lib/rnd"
import KosenListJson from "@lib/kosen.json"
import Layout from "@lib/layout"
import "./app.scss"

// Constants

const GameTabRow = 6
const GameTabCol = 5

// Kosen

interface Kosen {
  name: string
  matches: (str: string) => boolean
  word: KosenWord
}

class KosenWord {
  readonly str: string
  readonly pos: number
  constructor(init: { str: string; pos: number }) {
    this.str = init.str
    this.pos = init.pos
  }
  equals(b: KosenWord): boolean {
    return this.str === b.str && this.pos === b.pos
  }
}

const KosenList: Kosen[] = KosenListJson.map(
  ({ name, match, word, pos = 0 }) => {
    return {
      name: `${name}高専`,
      matches: str => new RegExp(`^(${match})(|高専)$`).test(str.trim()),
      word: new KosenWord({ str: word, pos }),
    }
  }
)

// Box

interface Box {
  char?: string
  state: BoxState
}

type BoxState = "secret" | "correct" | "present" | "absent" | "blank"

function BoxElem({ char, state }: Box) {
  return (
    <div class={`box ${state}`}>
      {state != "secret" && <span class='char'>{char}</span>}
    </div>
  )
}

// Game

interface GameStore {
  status: "playing" | "notInList" | "win" | "lose"
  ans: KosenWord
  rows: (null | KosenWord)[]
  cur: number
  input: string
}

interface GameAction {
  type: "reset" | "input" | "submit"
  payload?: string
}

function GetInitialGameState(): GameStore {
  const kosen = KosenList[RndToday() % KosenList.length]
  return {
    status: "playing",
    ans: kosen.word,
    rows: [...Array(GameTabRow)].fill(null),
    cur: 0,
    input: "",
  }
}

function GameReducer(state: GameStore, action: GameAction): GameStore {
  switch (action.type) {
    case "reset":
      return GetInitialGameState()

    case "input":
      return {
        ...state,
        status: state.status === "notInList" ? "playing" : state.status,
        input: action.payload!,
      }

    case "submit": {
      if (state.status === "win" || state.status === "lose") return state
      const matched = KosenList.find(k => k.matches(state.input))
      if (matched === undefined) {
        return {
          ...state,
          status: "notInList",
        }
      } else {
        const _rows = state.rows.slice()
        _rows[state.cur] = matched.word
        return {
          ...state,
          status: matched.word.equals(state.ans)
            ? "win"
            : state.cur >= GameTabRow - 1
            ? "lose"
            : state.status,
          rows: _rows,
          cur: state.cur + 1,
          input: "",
        }
      }
    }

    default:
      return state
  }
}

function Game() {
  const [state, dispatch] = useReducer(GameReducer, GetInitialGameState())
  return (
    <>
      {state.status === "win" && (
        <>
          <span>WIN!!</span>
        </>
      )}
      {state.status === "lose" && (
        <>
          <span>GAME OVER</span>
        </>
      )}
      <div class='tab'>
        {state.rows.map(row => (
          <div class='row'>
            {row === null
              ? [...Array(GameTabCol)].fill(<BoxElem state={"secret"} />)
              : row.str.split("").map((char, i) => {
                  // Animation
                  const ans = state.ans
                  const posDiffNg = ans.pos - row.pos
                  if (posDiffNg <= i && i < ans.str.length + posDiffNg)
                    if (ans.str[i - posDiffNg] === char)
                      return <BoxElem char={char} state={"correct"} />
                  if (ans.str.includes(char))
                    return <BoxElem char={char} state={"present"} />
                  return <BoxElem char={char} state={"absent"} />
                })}
            {row === null || row.str.length % 2 ? null :
              state.status === "win" && state.ans.equals(row)
                ? (<BoxElem state={"correct"} />)
                : (<BoxElem state={"blank"} />)}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          if (state.input !== "") dispatch({ type: "submit" })
        }}>
        <input
          class={`input ${state.status === "notInList" ? "notInList" : ""}`}
          placeholder='hoge高専'
          value={state.input}
          onChange={(e: any) => {
            dispatch({ type: "input", payload: e.target.value })
          }}
        />
      </form>
    </>
  )
}

// App

export function App() {
  return (
    <Layout>
      <Game />
    </Layout>
  )
}
