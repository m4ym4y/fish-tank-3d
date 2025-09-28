import { useGLTF } from '@react-three/drei'

function Tank() {
  const { scene } = useGLTF('/models/tank.glb')
  return <primitive object={scene} />
}

export default Tank
