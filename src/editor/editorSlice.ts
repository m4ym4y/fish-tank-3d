import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { emptyArrangement, type ArrangementProp, type Arrangement } from '../Arrangement'
import * as util from '../util'

export interface SetFish {
  type: string
  amount: number
}

export interface SelectProp {
  name: string
  type: number
}

export interface ChangeForwardHistory {
  reset?: boolean,
  subtract?: boolean
}

export interface ChangeColor {
  color?: { r: number, g: number, b: number },
  colorTintEnabled: boolean
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    arrangement: util.loadUrlArrangement(),
    historyDepth: 0,
    historyForwardDepth: 0,
    transform: {
      scale: 1,
      rotationDegrees: 0,
      colorTint: { r: 255, g: 0, b: 0 },
      colorTintEnabled: false
    },
    category: 'props',
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
      if (state.category !== 'props') return
      const prop = {
        ...state.selected,
        scale: state.transform.scale,
        rotation: state.transform.rotationDegrees * ((2 * Math.PI) / 360),
        ...action.payload,
        id: crypto.randomUUID(),
      }

      if (state.transform.colorTintEnabled) {
        prop.color = { ...state.transform.colorTint }
      }

      state.arrangement.props.push(prop)
    },

    setPropScale: (state, action: PayloadAction<number>) => {
      state.transform.scale = action.payload
    },

    setPropRotation: (state, action: PayloadAction<number>) => {
      state.transform.rotationDegrees = action.payload
    },

    changePropScale: (state, action: PayloadAction<number>) => {
      state.transform.scale = Math.max(state.transform.scale + action.payload, 0.1)
    },

    changePropRotation: (state, action: PayloadAction<number>) => {
      state.transform.rotationDegrees = (state.transform.rotationDegrees + action.payload) % 360
    },

    clearArrangement: (state) => {
      state.arrangement = emptyArrangement
    },

    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },

    loadArrangement: (state, action: PayloadAction<Arrangement>) => {
      state.arrangement = action.payload
    },

    editorUndo: (_state) => {},

    editorRedo: (_state) => {},

    addHistoryDepth: (state, action: PayloadAction<ChangeForwardHistory>) => {
      if (action.payload.reset) {
        state.historyForwardDepth = 0
      } else if (action.payload.subtract) {
        state.historyForwardDepth--
      }
      state.historyDepth++
    },

    removeHistoryDepth: (state) => {
      if (state.historyDepth > 0) {
        state.historyDepth--
        state.historyForwardDepth++
      }
    },

    changeColor: (state, action: PayloadAction<ChangeColor>) => {
      if (action.payload.color) {
        state.transform.colorTint = action.payload.color
      }
      state.transform.colorTintEnabled = action.payload.colorTintEnabled
    },

    deleteProp: (state, action: PayloadAction<string>) => {
      if (state.category !== "delete") return
      state.arrangement.props = state.arrangement.props.filter((p: ArrangementProp) => p.id !== action.payload)
    },
  }
})

export const { setFishAmount, selectProp, addProp, clearArrangement, setPropScale, setPropRotation, changePropScale, changePropRotation, setCategory, loadArrangement, editorUndo, editorRedo, addHistoryDepth, removeHistoryDepth, changeColor, deleteProp } = editorSlice.actions
export default editorSlice.reducer
