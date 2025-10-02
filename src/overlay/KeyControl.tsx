import {
  changePropScale,
  changePropRotation
} from '../editor/editorSlice'
import { useAppDispatch } from '../state/hooks.ts'
import { useHotkeys } from 'react-hotkeys-hook'

function KeyControl() {
  const dispatch = useAppDispatch()

  useHotkeys('r', () => {
    dispatch(changePropRotation(15))
  })

  useHotkeys('shift+r', () => {
    dispatch(changePropRotation(-15))
  })

  useHotkeys('s', () => {
    dispatch(changePropScale(0.25))
  })

  useHotkeys('shift+s', () => {
    dispatch(changePropScale(-0.25))
  })

  return <div></div>
}

export default KeyControl
