import './TransformTools.css'
import ColorTintPicker from './ColorTintPicker.tsx'

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
    <div className="overlay-transform-tool-row">
      <label htmlFor="transform-scale">Scale <span className="hint">(S, shift+S)</span></label>
      <div className="spacer" />
      <input
        id="transform-scale"
        type="number"
        step="0.1"
        value={scale}
        onChange={(ev) => dispatch(setPropScale(Number(ev.target.value) || 1))}
      />
    </div>

    <div className="overlay-transform-tool-row">
      <label htmlFor="transform-rotation">Rotation <span className="hint">(R, shift+R)</span></label>
      <div className="spacer" />
      <div className="overlay-transform-rotation">
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

    <ColorTintPicker />
  </div>
}

export default TransformTools
