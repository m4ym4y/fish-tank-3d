import './TransformTools.css'

import {
  setPropScale,
  setPropRotation
} from '../editor/editorSlice'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

function TransformTools () {
  const dispatch = useAppDispatch()
  const scale = useAppSelector(state => state.editor.transform.scale)
  const rotationDegrees = useAppSelector(state => state.editor.transform.rotationDegrees)

  return <div className="overlay-transform-tools">
    <label htmlFor="transform-scale">Scale</label>
    <input
      id="transform-scale"
      type="number"
      step="0.1"
      value={scale}
      onChange={(ev) => dispatch(setPropScale(Number(ev.target.value) || 1))}
    />

    <label htmlFor="transform-scale">Rotation (deg.)</label>
    <div className="overlay-transform-rotation">
      <input
        id="transform-rotation"
        type="range"
        min="0"
        max="359"
        step="1"
        value={rotationDegrees}
        onChange={(ev) => {
          dispatch(setPropRotation(Number(ev.target.value) || 0))
        }}
      />
      <input
        id="transform-rotation"
        type="number"
        min="0"
        max="359"
        step="1"
        value={rotationDegrees}
        onChange={(ev) => {
          dispatch(setPropRotation(Number(ev.target.value) || 0))
        }}
      />
    </div>
  </div>
}

export default TransformTools
