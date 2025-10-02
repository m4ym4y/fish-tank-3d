import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { defaultArrangement, emptyArrangement, type ArrangementProp } from '../Arrangement'

export interface SetFish {
  type: string
  amount: number
}

export interface SelectProp {
  name: string
  type: number
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    arrangement: defaultArrangement,
    selected: {
      name: 'rock',
      type: 0,
    }
  },
  reducers: {
    setFishAmount: (state, action: PayloadAction<SetFish>) => {
      state.arrangement.fish[action.payload.type] = action.payload.amount
    },

    selectProp: (state, action: PayloadAction<SelectProp>) => {
      state.selected.name = action.payload.name
      state.selected.type = action.payload.type
    },

    addProp: (state, action: PayloadAction<Omit<Omit<ArrangementProp, 'name'>, 'type'>>) => {
      state.arrangement.props.push({
        ...state.selected,
        ...action.payload
      })
    },

    clearArrangement: (state) => {
      state.arrangement = emptyArrangement
    }
  }
})

export const { setFishAmount, selectProp, addProp, clearArrangement } = editorSlice.actions
export default editorSlice.reducer
