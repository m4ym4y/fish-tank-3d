import * as THREE from 'three'
import queryString from 'query-string'
import { type Arrangement, defaultArrangement } from '../Arrangement'

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

export function serializeArrangement(arrangement: Arrangement) {
  const textEncoder = new TextEncoder()
  const encoded = textEncoder.encode(JSON.stringify(arrangement))
  const byteString = String.fromCharCode(...encoded)

  return btoa(byteString)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
}

export function deserializeArrangement(serialized: string) {
  const byteString = atob(serialized)
  const encoded = new Uint8Array([...byteString].map(b => b.charCodeAt(0)))
  const decoder = new TextDecoder('utf8')
  const decoded = decoder.decode(encoded)

  return JSON.parse(decoded)
}

export function getQParam(qParams: queryString.ParsedQuery, key: string): string | null {
  return Array.isArray(qParams[key]) ? qParams[key][0] : qParams[key]
}

export function loadUrlArrangement() {
  const qParams = queryString.parse(location.search)
  const arrangementParam = getQParam(qParams, "arrangement")
  return arrangementParam
    ? deserializeArrangement(arrangementParam)
    : defaultArrangement
}

export function updateUrlArrangement(arrangement: Arrangement) {
  const urlParsed = URL.parse(location.href) as URL
  const qParams = queryString.parse(location.search)
  qParams.arrangement = serializeArrangement(arrangement)
  urlParsed.search = queryString.stringify(qParams)
  history.pushState({}, "", urlParsed.href)
}
