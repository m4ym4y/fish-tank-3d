import { type ReactElement } from 'react'
import ActivePlane from './ActivePlane'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'
import Guppy from '../Guppy.tsx'
import Angelfish from '../Angelfish.tsx'
import Goldfish from '../Goldfish.tsx'
import * as util from '../util'

import type { Arrangement, ArrangementProp } from '../Arrangement.ts'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'
import { deleteProp } from './editorSlice.ts'

const fishMap: {
  [key: string]: () => ReactElement
} = {
  guppy: Guppy,
  angelfish: Angelfish,
  goldfish: Goldfish
}

function createFishFromArrangement(arrangement: Arrangement) {
  const fish: Array<ReactElement> = []
  let idx = 0

  for (const key in arrangement.fish) {
    const count = arrangement.fish[key]
    const FishType = fishMap[key]
    if (!FishType) {
      continue
    } else {
      for (let i = 0; i < count; ++i) {
        fish.push(<FishType key={key + String(i)} />)
      }
      idx += count
    }
  }

  return fish
}

function Editor({
  edit
}: {
  edit?: boolean
}) {
  const arrangement = useAppSelector(state => state.editor.arrangement)
  const dispatch = useAppDispatch()

  return <>
    {/* insert fish from arrangement */}
    {createFishFromArrangement(arrangement)}

    {/* insert props from arrangement */}
    {arrangement.props.map((p: ArrangementProp) => {
      if (p.name === "plant") {
        return <Plant
          key={p.id}
          type={p.type || 0}
          position={p.pos}
          scale={p.scale || 1}
          rotation={p.rotation || 0}
          color={p.color && util.rgbToThreeColor(p.color)}

          /* editor delete */
          onClick={edit ? (() => {
            dispatch(deleteProp(p.id))
          }) : undefined}
        />
      } else if (p.name == "rock") {
        return <Rock
          key={p.id}
          type={p.type || 0}
          position={p.pos}
          scale={p.scale || 1}
          rotation={p.rotation || 0}
          color={p.color && util.rgbToThreeColor(p.color)}

          /* editor delete */
          onClick={edit ? (() => {
            dispatch(deleteProp(p.id))
          }) : undefined}
        />
      }
    })}

    {/* editor controls */}
    {edit && <>
      <ActivePlane />
    </>}
  </>
}

export default Editor
