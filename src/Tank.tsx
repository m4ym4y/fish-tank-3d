import { useGLTF } from '@react-three/drei'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import * as THREE from 'three'
import * as util from './util'

function Tank() {
  const { scene } = useGLTF('/models/tank.glb')
  util.receiveShadows(scene)
  util.disableFog(scene)

  scene.traverse(child => {
    const mesh = child as THREE.Mesh
    if (mesh.isMesh) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (mat.name === 'Material') {
        mat.emissive.set('#80D8FF')
      }
    }
  })

  return <RigidBody type="fixed" colliders={false}>
    <CuboidCollider args={[1, 10, 10]} position={[-11, 0, 0 ]} />
    <CuboidCollider args={[1, 10, 10]} position={[11, 0, 0 ]} />
    <CuboidCollider args={[12, 10, 1]} position={[0, 0, -11 ]} />
    <CuboidCollider args={[12, 10, 1]} position={[0, 0, 11 ]} />
    <CuboidCollider args={[12, 1, 12]} position={[0, 11, 0 ]} />
    <CuboidCollider args={[12, 1, 12]} position={[0, -10, 0 ]} />
    <primitive object={scene} />
  </RigidBody>
}

export default Tank
