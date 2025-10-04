import {
  editorRedo,
  editorUndo,
} from '../editor/editorSlice'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

function HistoryTools() {
  const historyForwardDepth = useAppSelector(state => state.editor.historyForwardDepth)
  const historyDepth = useAppSelector(state => state.editor.historyDepth)
  const dispatch = useAppDispatch()

  return <div className="overlay-popup-tool">
    <button
      disabled={historyDepth === 0}
      onClick={() => dispatch(editorUndo())}
    >
      {'Undo'}
    </button>
    <button
      disabled={historyForwardDepth === 0}
      onClick={() => dispatch(editorRedo())}
    >
        {'Redo'}
    </button>
  </div>
}

export default HistoryTools
