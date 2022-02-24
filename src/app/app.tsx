import { FunctionComponent } from "preact"
import { useReducer } from "preact/hooks"
import { TodayDateHash } from "@lib/datehash"
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
  word: string
}

const KosenList: Kosen[] = KosenListJson.map(({ name, match, word }) => ({
  name: `${name}高専`,
  matches: str => new RegExp(match).test(str),
  word,
}))

// Box

interface Box {
  char?: string
  state: BoxState
}

type BoxState = "secret" | "correct" | "present" | "absent"

function BoxElem({ char, state }: Box) {
  return (
    <div class={`box ${state}`}>
      {state != "secret" && <span class='char'>{char}</span>}
    </div>
  )
}

// Game

interface GameStore {
  status: "playing" | "win" | "lose"
  ans: string
  rows: (string | null)[]
  rown: number
  input: string
}

interface GameAction {
  type: "reset" | "input" | "submit"
  payload?: string
}

function GetInitialGameState(): GameStore {
  return {
    status: "playing",
    ans: KosenList[TodayDateHash() % KosenList.length].word,
    rows: [...Array(GameTabRow)].fill(null),
    rown: 0,
    input: "",
  }
}

function GameReducer(state: GameStore, action: GameAction): GameStore {
  switch (action.type) {
    case "reset":
      return GetInitialGameState()
    case "input":
      return { ...state, input: action.payload! }
    case "submit": {
      const rows = state.rows
      rows[state.rown] = state.input
      // 勝敗判定
      let status = state.status
      return {
        ...state,
        status,
        rows,
        rown: state.rown + 1,
        input: "",
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
      <div class='tab'>
        {state.rows.map(row => (
          <div class='row'>
            {row !== null
              ? row
                  .split("")
                  .map(char => <BoxElem char={char} state={"correct"} />) ///
              : [...Array(GameTabCol)].fill(<BoxElem state={"secret"} />)}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e: any) => {
          e.preventDefault()
          dispatch({ type: "submit" })
        }}>
        <input
          class='input'
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
