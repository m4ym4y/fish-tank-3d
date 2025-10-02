import { useState, type ReactElement } from 'react'
import ActivePlane from './ActivePlane'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'
import Guppy from '../Guppy.tsx'
import Angelfish from '../Angelfish.tsx'
import Goldfish from '../Goldfish.tsx'

interface ArrangementProp {
  name: string,
  type?: number,
  pos: [number, number, number],
  scale?: number,
  rotation?: number
}

interface Arrangement {
  fish: {
    [key: string]: number
  },
  props: Array<ArrangementProp>
}

const defaultArrangement: Arrangement = {
  fish: {
    guppy: 10,
    angelfish: 3,
    goldfish: 6,
  },
  props: [
    { name: "plant", type: 0, pos: [ 2, -8, 2 ], scale: 1, rotation: Math.PI / 4 },
    { name: "plant", type: 0, pos: [ -3, -9, -5 ], scale: 2, rotation: Math.PI / 4 },
    { name: "plant", type: 0, pos: [ 3, -9, 6 ], scale: 0.6, rotation: 2 * Math.PI / 3 },
    { name: "plant", type: 1, pos: [ 2, -9, 5 ], scale: 2, rotation: Math.PI / 3 },
    { name: "plant", type: 1, pos: [ 7, -9, 1 ], scale: 3, rotation: 2 * Math.PI / 3 },
    { name: "plant", type: 1, pos: [ -5, -9, 5 ], scale: 2.5, rotation: 0 },
    { name: "plant", type: 1, pos: [ -4, -9, -6 ], scale: 4, rotation: Math.PI / 2 },
    { name: "rock", type: 0, pos: [ 0, -7, 0 ], scale: 5, rotation: 0 },
    { name: "rock", type: 1, pos: [ 6, -8, 2 ], scale: 3, rotation: Math.PI / 4 },
    { name: "rock", type: 2, pos: [ 3, -9, -4 ], scale: 3, rotation: Math.PI / 4 },
  ],
}

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
        fish.push(<FishType key={idx + i} />)
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
  const [ arrangement, setArrangement ] = useState<Arrangement>(defaultArrangement)

  const onTankClick = (ev: any) => {
    setArrangement({
      ...arrangement,
      props: [ ...arrangement.props, {
        name: 'plant',
        type: 1,
        pos: ev.point
      } ]
    })
  }

  return <>
    {/* insert fish from arrangement */}
    {createFishFromArrangement(arrangement)}

    {/* insert props from arrangement */}
    {arrangement.props.map((p, idx) => {
      if (p.name === "plant") {
        return <Plant
          key={1000 + idx}
          type={p.type || 0}
          position={p.pos}
          scale={p.scale || 1}
          rotation={p.rotation || 0}
        />
      } else if (p.name == "rock") {
        return <Rock
          key={1000 + idx}
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
