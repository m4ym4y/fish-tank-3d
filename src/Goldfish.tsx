import { useGLTF } from '@react-three/drei'
import * as util from './util'
import Fish from './Fish'

function Goldfish() {
  const { scene } = useGLTF('/models/goldfish.glb')
  util.castShadows(scene)
  util.receiveShadows(scene)

  return <Fish scene={scene} />
}

export default Goldfish
