import './TransformTools.css'

import {
  setPropScale,
  setPropRotation
} from '../editor/editorSlice'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

function TransformTools () {
  const dispatch = useAppDispatch()
  const appState = useAppSelector(state => ({
    scale: state.editor.transform.scale,
    rotationDegrees: state.editor.transform.rotationDegrees
  }))

  return <div className="overlay-transform-tools">
    <label htmlFor="transform-scale">Scale</label>
    <input
      id="transform-scale"
      type="number"
      step="0.1"
      value={appState.scale}
      onChange={(ev) => dispatch(setPropScale(Number(ev.target.value) || 1))}
    />

    <label htmlFor="transform-scale">Rotation (deg.)</label>
    <input
      id="transform-rotation"
      type="number"
      step="1"
      value={appState.rotationDegrees}
      onChange={(ev) => {
        dispatch(setPropRotation(Number(ev.target.value) || 0))
      }}
    />
  </div>
}

export default TransformTools
