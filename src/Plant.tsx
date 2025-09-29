import { useGLTF } from '@react-three/drei'
import type {Vector3} from '@react-three/fiber'
import {useMemo} from 'react'

function Plant({ type, position, scale, rotation }: {
  type: number,
  position: Vector3,
  scale: number,
  rotation: number
}) {
  const { scene: plant0Scene } = useGLTF('/models/plant0.glb')
  const plantTypes = [ plant0Scene ]
  const uniquePlantScene = useMemo(() => plantTypes[type].clone(),
    [ plant0Scene, type ])

  return <primitive
    object={uniquePlantScene}
    position={position}
    scale={[ scale, scale, scale ]}
    rotation={[ 0, rotation, 0 ]}
  />
}

export default Plant
