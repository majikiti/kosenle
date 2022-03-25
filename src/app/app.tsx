import { FunctionComponent } from "preact"
import { useReducer, useState } from "preact/hooks"
import { RndFromDate } from "@lib/rnd"
import KosenListJson from "@lib/kosen.json"
import Layout from "@lib/layout"
import "./app.scss"

// Constants

const GameTabRow = 6
const GameTabCol = 5

// Date

function dateNum(date: Date): number {
  return parseInt(`${
    date.getFullYear()
  }${
    date.getMonth()
  }${
    date.getDate()
  }`)
}

// Storage

function saveObject(key: string, obj: any) {
  localStorage.setItem(key, JSON.stringify(obj))
}

function loadObject(key: string): any {
  const data = localStorage.getItem(key)
  if (data === null) throw new Error("data not found")
  return JSON.parse(data)
}

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
  status: "playing" | "notInList" | "end"
  result: null | "win" | "lose"
  ans: KosenWord
  rows: (null | KosenWord)[]
  cur: number
  input: string
  date: number
}

interface GameAction {
  type: "reset" | "input" | "submit"
  payload?: string
}

function GetInitialGameState(): GameStore {
  const _date = new Date()
  const newState = {
    status: "playing",
    result: null,
    ans: KosenList[RndFromDate(_date) % KosenList.length].word,
    rows: [...Array(GameTabRow)].fill(null),
    cur: 0,
    input: "",
    date: dateNum(_date),
  }
  try {
    const oldState = loadObject("gameState")
    if (dateNum(_date) !== oldState.date)
      return newState
    // 復元する
    return {
      ...oldState,
      ans: new KosenWord(oldState.ans),
      rows: oldState.rows.map((row: null | KosenWord[]) =>
        row === null ? null : new KosenWord(row))
    }
  } catch {
    return newState
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
      if (state.status === "end") return state
      const matched = KosenList.find(k => k.matches(state.input))
      if (matched === undefined) {
        return {
          ...state,
          status: "notInList",
        }
      } else {
        const _rows = state.rows.slice()
        _rows[state.cur] = matched.word
        const _status = (matched.word.equals(state.ans) || state.cur >= GameTabRow - 1)
          ? "end"
          : state.status
        const _result = _status !== "end"
          ? state.result
          : matched.word.equals(state.ans)
          ? "win"
          : state.cur >= GameTabRow - 1
          ? "lose"
          : state.result
        const _state = {
          ...state,
          status: _status,
          result: _result,
          rows: _rows,
          cur: state.cur + 1,
          input: "",
        }
        saveObject("gameState", _state)
        return _state
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
              state.result === "win" && state.ans.equals(row)
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
          disabled={state.status === "end"}
          placeholder='hoge高専'
          value={state.input}
          onChange={(e: any) => {
            dispatch({ type: "input", payload: e.target.value })
          }}
        />
      </form>
      {state.status === "end" && (
        <GameResult state={state} />
      )}
    </>
  )
}

function GameResult({ state }: { state: GameStore }) {
  const [showResult, setShowResult] = useState(true)
  let tabStr = ""
  let tabRows = 0
  state.rows.forEach(row => {
    if (row !== null) {
      let rowStr = row.str.split("").map((char, i) => {
        const ans = state.ans
        const posDiffNg = ans.pos - row.pos
        if (posDiffNg <= i && i < ans.str.length + posDiffNg)
          if (ans.str[i - posDiffNg] === char)
            return "🟩"
        if (ans.str.includes(char))
          return "🟨"
        return "⬛"
      }).join("")
      if (!(row.str.length % 2)) {
        if (row.str === state.ans.str) rowStr += "🟩"
        else rowStr += "⬛"
      } else if (row.str.length < GameTabCol) {
        let pref = ""
        for (let i=0; i<(GameTabCol-row.str.length)/2; ++i)
          pref += "　"
        rowStr = pref + rowStr
      }
      tabStr += `${rowStr}\n`
      ++tabRows
    }
  })
  const resText = `Kosenle ${
    state.result === "lose"
      ? "X"
      : `${tabRows}`
  }/${GameTabRow}\n\n${tabStr}`
  return (
    <>
      {showResult && (
        <div class='overlay'>
          <div class='result'>
            <button
              class='close'
              onClick={() => {
                setShowResult(false)
              }}
            >x</button>
            {state.result === "win" && (
              <>
                <h2>Win!!</h2>
              </>
            )}
            {state.result === "lose" && (
              <>
                <h2>Game Over</h2>
                <p>😭</p>
              </>
            )}
            <pre>{tabStr.replaceAll("　", "")}</pre>
            {/*<button
              onClick={() => {
              }}
            >Copy</button>*/}
            <a
              href={`https://twitter.com/intent/tweet?text=${
                encodeURIComponent(resText)
              }`}
              target="_blank"
            >Tweet</a>
          </div>
        </div>
      )}
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
