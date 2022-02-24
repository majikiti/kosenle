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
  matches: str => new RegExp(`^(${match})(|高専)$`).test(str.trim()),
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
  status: "playing" | "notInList" | "win" | "lose"
  ans: string
  rows: (string | null)[]
  rowN: number
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
    rowN: 0,
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
      const matched = KosenList.find(k => k.matches(state.input))
      if (matched !== undefined) {
        const rows = state.rows
        rows[state.rowN] = matched.word
        let status = state.status
        if (rows[state.rowN] === state.ans) status = "win"
        else if (state.rowN >= GameTabRow - 1) status = "lose"
        return {
          ...state,
          status,
          rows,
          rowN: state.rowN + 1,
          input: "",
        }
      } else {
        return {
          ...state,
          status: "notInList",
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
      <div class='tab'>
        {state.rows.map(row => (
          <div class='row'>
            {row === null
              ? [...Array(GameTabCol)].fill(<BoxElem state={"secret"} />)
              : row.split("").map((char, i) => {
                  // Animation
                  if (state.ans[i] == char)
                    return <BoxElem char={char} state={"correct"} />
                  if (state.ans.includes(char))
                    return <BoxElem char={char} state={"present"} />
                  return <BoxElem char={char} state={"absent"} />
                })}
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
