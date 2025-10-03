import { configureStore } from '@reduxjs/toolkit'
import editorReducer from '../editor/editorSlice'

import { historyListenerMiddleware } from './historyMiddleware'

const store = configureStore({
  reducer: {
    editor: editorReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(historyListenerMiddleware.middleware)
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
