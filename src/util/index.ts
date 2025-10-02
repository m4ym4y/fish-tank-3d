import * as THREE from 'three'
import queryString from 'query-string'

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

export function disableFog(scene: THREE.Group<THREE.Object3DEventMap>) {
  scene.traverse(child => {
    const mesh = child as THREE.Mesh
    if (mesh.isMesh) {
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (!mat.fog) return
      mat.fog = false
    }
  })
}

export function getQParam(qParams: queryString.ParsedQuery, key: string): string | null {
  return Array.isArray(qParams[key]) ? qParams[key][0] : qParams[key]
}

