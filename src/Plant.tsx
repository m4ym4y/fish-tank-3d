import { useGLTF } from '@react-three/drei'
import type {Vector3} from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as util from './util'
import { type Color } from 'three'

function Plant({ type, position, scale, rotation, color }: {
  type: number,
  position: Vector3,
  scale: number,
  rotation: number,
  color?: Color,
  noPhysics?: boolean
}) {
  const { scene: plant0Scene } = useGLTF('/models/plant0.glb')
  const { scene: plant1Scene } = useGLTF('/models/plant1.glb')
  const plantTypes = [ plant0Scene, plant1Scene ]

  useEffect(() => {
    plantTypes.forEach(scene => {
      util.receiveShadows(scene)
    })
  }, plantTypes)

  const uniquePlantScene = useMemo(() => plantTypes[type].clone(),
    [ plant0Scene, plant1Scene, type ])

  useEffect(() => {
    if (color) {
      util.setMaterialColors(uniquePlantScene, color)
    }
  }, [ uniquePlantScene ])

  return <primitive
    object={uniquePlantScene}
    position={position}
    scale={[ scale, scale, scale ]}
    rotation={[ 0, rotation, 0 ]}
  />
}

export default Plant
