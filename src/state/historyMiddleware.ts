import * as util from '../util'
import { createListenerMiddleware, addListener, isAnyOf } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from './store'

import {
  editorUndo,
  editorRedo,
  addProp,
  addHistoryDepth,
  removeHistoryDepth,
  setFishAmount,
  deleteProp,
  clearArrangement
} from '../editor/editorSlice'

export const historyListenerMiddleware = createListenerMiddleware()
export const startHistoryListening = historyListenerMiddleware.startListening.withTypes<RootState, AppDispatch>()
export const addHistoryListener = addListener.withTypes<RootState, AppDispatch>()

startHistoryListening({
  matcher: isAnyOf(addProp, setFishAmount, deleteProp, clearArrangement),
  effect: (_action, listenerApi) => {
    util.updateUrlArrangement(listenerApi.getState().editor.arrangement)
    listenerApi.dispatch(addHistoryDepth({ reset: true }))
  }
})

startHistoryListening({
  actionCreator: editorUndo,
  effect: (_action, listenerApi) => {
    if (listenerApi.getState().editor.historyDepth > 0) {
      history.back()
      listenerApi.dispatch(removeHistoryDepth())
    }
  }
})

startHistoryListening({
  actionCreator: editorRedo,
  effect: (_action, listenerApi) => {
    if (listenerApi.getState().editor.historyForwardDepth > 0) {
      history.forward()
      listenerApi.dispatch(addHistoryDepth({ subtract: true }))
    }
  }
})
