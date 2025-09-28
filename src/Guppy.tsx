import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const gAccel = -0.1
const targetYTolerance = 0.5

function Guppy() {
  const { scene } = useGLTF('/models/guppy.glb')

  const fishRef = useRef<ThreeElements['primitive'] | null>(null)
  const fishState = useRef<any>({
    targetY: 0,
    angle: 0,
    aY: 0,
    vY: 0,
    t: 0
  })

  useFrame((_state, delta) => {
    if (delta > 0.1) return

    if (fishRef && fishRef.current) {
      const fs = fishState.current

      fs.t += delta
      fs.vY += (gAccel + fs.aY ) * delta
      fs.aY *= Math.max((1 - delta), 0)
      if (fs.aY < 0) {
        fs.aY = 0
      }

      if (
        fishRef.current.position.y < fs.targetY - targetYTolerance
        && fs.aY <= 0.1
        && fs.vY <= 0
      ) {
        fs.aY = 1
      }

      fishRef.current.position.y += fs.vY * delta

      fishRef.current.rotation.z = fs.vY * (Math.PI / 8)
      fishRef.current.rotation.x = 0
      fishRef.current.rotation.y = Math.sin(fs.t) / 8
    }
  })

  return <primitive ref={fishRef} object={scene} />
}

export default Guppy
