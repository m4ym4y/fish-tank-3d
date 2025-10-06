import { useGLTF } from '@react-three/drei'
import type {ThreeEvent, Vector3} from '@react-three/fiber'
import { RigidBody, interactionGroups } from '@react-three/rapier'
import { useEffect, useMemo } from 'react'
import * as util from './util'
import { type Color } from 'three'

function Rock({ type, position, scale, rotation, color, noPhysics, onClick }: {
  type: number,
  position: Vector3,
  scale: number,
  rotation: number,
  color?: Color,
  noPhysics?: boolean,
  onClick?: (ev: ThreeEvent<MouseEvent>) => void,
}) {
  const { scene: rock0Scene } = useGLTF('/models/rock0.glb')
  const { scene: rock1Scene } = useGLTF('/models/rock1.glb')
  const { scene: rock2Scene } = useGLTF('/models/rock2.glb')
  const rockTypes = [ rock0Scene, rock1Scene, rock2Scene ]

  useEffect(() => {
    rockTypes.forEach(scene => {
      util.castShadows(scene)
      util.receiveShadows(scene)
    })
  })

  const uniqueRockScene = useMemo(() => rockTypes[type].clone(),
    [ rock0Scene, rock1Scene, rock2Scene, type ])

  useEffect(() => {
    if (color) {
      util.setMaterialColors(uniqueRockScene, color)
    }
  }, [ uniqueRockScene ])

  if (noPhysics) {
    return <primitive object={uniqueRockScene} />
  } else {
    return <RigidBody
      type="fixed"
      colliders="hull"
      position={position}
      scale={[scale, scale, scale]}
      rotation={[0, rotation, 0]}
      collisionGroups={interactionGroups(util.iGroups.STATIC)}
    >
      <primitive object={uniqueRockScene} onClick={onClick} />
    </RigidBody>
  }
}

export default Rock
