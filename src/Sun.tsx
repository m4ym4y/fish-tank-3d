import { Bloom, EffectComposer, GodRays, Outline, Pixelation, Scanline, Vignette } from '@react-three/postprocessing'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

function Sun() {
  const sunRef = useRef<THREE.Mesh | null>(null)

  return <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[0.2]}/>
      </mesh>
  </>
}

export default Sun
