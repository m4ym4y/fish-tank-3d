import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

function Tank() {
  const { scene } = useGLTF('/models/tank.glb')
  return <RigidBody type="fixed" colliders="trimesh">
    <primitive object={scene} />
  </RigidBody>
}

export default Tank
