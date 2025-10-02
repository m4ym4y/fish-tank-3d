import { useGLTF } from '@react-three/drei'
import type {Vector3} from '@react-three/fiber'
import { useMemo } from 'react'
import * as util from './util'

function Plant({ type, position, scale, rotation }: {
  type: number,
  position: Vector3,
  scale: number,
  rotation: number
}) {
  const { scene: plant0Scene } = useGLTF('/models/plant0.glb')
  const { scene: plant1Scene } = useGLTF('/models/plant1.glb')
  const plantTypes = [ plant0Scene, plant1Scene ]

  plantTypes.forEach(scene => {
    util.receiveShadows(scene)
  })

  const uniquePlantScene = useMemo(() => plantTypes[type].clone(),
    [ plant0Scene, plant1Scene, type ])

  return <primitive
    object={uniquePlantScene}
    position={position}
    scale={[ scale, scale, scale ]}
    rotation={[ 0, rotation, 0 ]}
  />
}

export default Plant
