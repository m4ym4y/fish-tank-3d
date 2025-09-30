import * as THREE from 'three'

export function castShadows(scene: THREE.Group<THREE.Object3DEventMap>) {
  scene.traverse(child => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true
    }
  })
}

export function receiveShadows(scene: THREE.Group<THREE.Object3DEventMap>) {
  scene.traverse(child => {
    if ((child as THREE.Mesh).isMesh) {
      child.receiveShadow = true
    }
  })
}
