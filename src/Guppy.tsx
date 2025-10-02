import { useGLTF } from '@react-three/drei'
import * as util from './util'
import Fish from './Fish'
import {useMemo} from 'react'

function Guppy() {
  const { scene } = useGLTF('/models/guppy.glb')
  const uniqueScene = useMemo(() => scene.clone(), [scene])
  
  util.castShadows(scene)
  util.receiveShadows(scene)

  return <Fish>
    <primitive object={uniqueScene} />
  </Fish>
}

export default Guppy
