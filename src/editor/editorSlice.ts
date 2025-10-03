import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { defaultArrangement, emptyArrangement, type ArrangementProp, type Arrangement } from '../Arrangement'
import queryString from 'query-string'
import * as util from '../util'

export interface SetFish {
  type: string
  amount: number
}

export interface SelectProp {
  name: string
  type: number
}

function loadUrlArrangement() {
  const qParams = queryString.parse(location.search)
  const arrangementParam = util.getQParam(qParams, "arrangement")
  return arrangementParam
    ? util.deserializeArrangement(arrangementParam)
    : defaultArrangement
}

function updateUrlArrangement(arrangement: Arrangement) {
  const urlParsed = URL.parse(location.href) as URL
  const qParams = queryString.parse(location.search)
  qParams.arrangement = util.serializeArrangement(arrangement)
  urlParsed.search = queryString.stringify(qParams)
  history.pushState({}, "", urlParsed.href)
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    arrangement: loadUrlArrangement(),
    transform: {
      scale: 1,
      rotationDegrees: 0,
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
      state.arrangement.props.push({
        ...state.selected,
        scale: state.transform.scale,
        rotation: state.transform.rotationDegrees * ((2 * Math.PI) / 360),
        ...action.payload
      })

      updateUrlArrangement(state.arrangement)
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

    loadArrangementFromUrl: (state) => {
      state.arrangement = loadUrlArrangement()
    },
  }
})

export const { setFishAmount, selectProp, addProp, clearArrangement, setPropScale, setPropRotation, changePropScale, changePropRotation, setCategory, loadArrangementFromUrl } = editorSlice.actions
export default editorSlice.reducer
