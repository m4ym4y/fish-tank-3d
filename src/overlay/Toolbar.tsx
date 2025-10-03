import './Toolbar.css'
import TransformTools from './TransformTools.tsx'
import HistoryTools from './HistoryTools.tsx'
import Counter from './Counter'

import {
  setFishAmount,
  selectProp,
  clearArrangement,
  setCategory,
} from '../editor/editorSlice'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

const propList = [
  { id: "rock0", name: "Rock 0", selector: { name: "rock", type: 0 }},  
  { id: "rock1", name: "Rock 1", selector: { name: "rock", type: 1 }},  
  { id: "rock2", name: "Rock 2", selector: { name: "rock", type: 2 }},  
  { id: "plant0", name: "Plant 0", selector: { name: "plant", type: 0 }},  
  { id: "plant1", name: "Plant 1", selector: { name: "plant", type: 1 }},  
]

const fishList = [
  { id: "guppy", name: "Guppy" },
  { id: "goldfish", name: "Goldfish" },
  { id: "angelfish", name: "Angelfish" },
]

function PropTool({ name, id, onClick, selected }: {
  name: string
  selected?: boolean
  id: string
  onClick?: () => void
}) {
  return <div
    className={`overlay-tool prop ${selected ? 'selected':''}`}
    onClick={onClick}
  >
    <img src={`/img/props/${id}.png`} draggable={false} />
    <p>{name}</p>
  </div>
}

function FishTool({ name, id, value, onCount }: {
  name: string
  id: string
  value: number
  onCount?: (val: number) => void
}) {
  return <div className="overlay-tool fish">
    <img src={`/img/fish/${id}.png`} draggable={false} />
    <p>{name}</p>
    <Counter value={value} onCount={onCount} />
  </div>
}

function Toolbar() {
  const dispatch = useAppDispatch()
  const selected = useAppSelector(state => state.editor.selected)
  const category = useAppSelector(state => state.editor.category)
  const fishState = useAppSelector(state => state.editor.arrangement.fish)

  return <>
    <div className="overlay-popup-toolbar">
      <HistoryTools />
    </div>
    <div className="overlay-toolbar">
      <div className="overlay-bar-type">
        <button onClick={() => dispatch(setCategory("fish"))}>Fish</button>
        <button onClick={() => dispatch(setCategory("props"))}>Decorations</button>
        <button onClick={() => dispatch(clearArrangement())}>Clear</button>
      </div>
      { category === "props" && <TransformTools /> }
      <div className="overlay-tools">
        {category === "fish" && fishList.map((fish, idx) => 
          <FishTool
            key={idx}
            id={fish.id}
            name={fish.name}
            value={fishState[fish.id]}
            onCount={(val: number) => dispatch(setFishAmount({
              type: fish.id,
              amount: val
            }))} />)}
        {category === "props" && propList.map((prop, idx) =>
          <PropTool
            key={idx}
            id={prop.id}
            name={prop.name}
            selected={prop.id === selected.name + String(selected.type)}
            onClick={() => dispatch(selectProp(prop.selector))} />)}
      </div>
    </div>
  </>
}

export default Toolbar
