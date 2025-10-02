import { useAnimations, useGLTF } from '@react-three/drei'
import * as util from './util'
import * as THREE from 'three'
import Fish from './Fish'
import { SkeletonUtils } from 'three-stdlib'
import { useMemo } from 'react'

function AnimatedFish({ model }: {
  model: string
}) {
  const { scene, animations } = useGLTF(model)
  const uniqueScene = useMemo(() => SkeletonUtils.clone(scene), [ scene ])
  util.castShadows(scene)
  util.receiveShadows(scene)

  const { actions } = useAnimations(animations, uniqueScene)

  return <Fish onDirectionChange={() => {
    if (actions.swim) {
      actions.swim.reset()
      actions.swim.loop = THREE.LoopOnce
      actions.swim.play()
    }
  }}>
    <primitive object={uniqueScene} />
  </Fish>
}

export default AnimatedFish
