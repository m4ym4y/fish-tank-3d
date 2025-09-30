import { useGLTF } from '@react-three/drei'
import type {Vector3} from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import {useMemo} from 'react'
import * as util from './util'

function Rock({ type, position, scale, rotation }: {
  type: number,
  position: Vector3,
  scale: number,
  rotation: number
}) {
  const { scene: rock0Scene } = useGLTF('/models/rock0.glb')
  const { scene: rock1Scene } = useGLTF('/models/rock1.glb')
  const { scene: rock2Scene } = useGLTF('/models/rock2.glb')
  const rockTypes = [ rock0Scene, rock1Scene, rock2Scene ]
  rockTypes.forEach(scene => {
    util.castShadows(scene)
    util.receiveShadows(scene)
  })

  const uniqueRockScene = useMemo(() => rockTypes[type].clone(),
    [ rock0Scene, rock1Scene, rock2Scene, type ])

  return <RigidBody
    type="fixed"
    colliders="hull"
    position={position}
    scale={[scale, scale, scale]}
    rotation={[0, rotation, 0]}
  >
    <primitive object={uniqueRockScene} />
  </RigidBody>
}

export default Rock
