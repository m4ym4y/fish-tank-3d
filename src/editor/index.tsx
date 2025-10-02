import { useState, type ReactElement } from 'react'
import ActivePlane from './ActivePlane'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'
import Guppy from '../Guppy.tsx'
import Angelfish from '../Angelfish.tsx'
import Goldfish from '../Goldfish.tsx'

import type { Arrangement } from '../Arrangement.ts'
import {
  addProp,
} from './editorSlice.ts'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'
import type {ThreeEvent} from '@react-three/fiber'

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

  const onTankClick = (ev: ThreeEvent<MouseEvent>) => {
    dispatch(addProp({
      pos: [ev.point.x, -8.5, ev.point.z]
    }))
  }

  return <>
    {/* insert fish from arrangement */}
    {createFishFromArrangement(arrangement)}

    {/* insert props from arrangement */}
    {arrangement.props.map((p, idx) => {
      if (p.name === "plant") {
        return <Plant
          key={"plant" + idx}
          type={p.type || 0}
          position={p.pos}
          scale={p.scale || 1}
          rotation={p.rotation || 0}
        />
      } else if (p.name == "rock") {
        return <Rock
          key={"rock" + idx}
          type={p.type || 0}
          position={p.pos}
          scale={p.scale || 1}
          rotation={p.rotation || 0}
        />
      }
    })}

    {/* editor controls */}
    {edit && <>
      <ActivePlane onClick={onTankClick} />
    </>}
  </>
}

export default Editor
