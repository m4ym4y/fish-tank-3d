import {useState} from "react"
import { SketchPicker, type RGBColor } from 'react-color'

import {
  changeColor
} from '../editor/editorSlice'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

function ColorTintPicker() {
  const dispatch = useAppDispatch()
  const color = useAppSelector(state => state.editor.transform.colorTint)
  const tintEnabled = useAppSelector(state => state.editor.transform.colorTintEnabled)
  const [ showColor, setShowColor ] = useState(false)

  return <div className="overlay-transform-tool-row">
    <label htmlFor="transform-color">Color Tint</label>
    <div className="spacer" />
    <div className="overlay-color-shower" 
      style={{
        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b}, ${tintEnabled ? 1 : 0})`
      }}
    >
      <div className={`overlay-color-popup ${showColor ? 'show':''}`}>
        <div className="overlay-color-popup-controls">
          <button onClick={() => {
            dispatch(changeColor({ colorTintEnabled: false }))
            setShowColor(false)
          }}>
            No Color Tint
          </button>
          <div className="spacer" />
          <button onClick={() => {
            console.log('set show color false')
            setShowColor(false)
          }}>X</button>
        </div>
        <SketchPicker
          color={color}
          onChange={(color) => {
            dispatch(changeColor({ colorTintEnabled: true, color: color.rgb }))
          }}
          disableAlpha
        />
      </div>
    </div>
    <button onClick={() => setShowColor(!showColor)}>Pick</button>
  </div>
}

export default ColorTintPicker
