import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const gAccel = -0.1
const vAngular = 0.5
const swimSpeed = 1.5
const FORWARD = new THREE.Vector3(1, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)

function clamp(min: number, max: number, val: number) {
  return Math.max(min, Math.min(max, val))
}

function Guppy() {
  const { scene } = useGLTF('/models/guppy.glb')
  const uniqueScene = useMemo(() => scene.clone(), [scene])

  const fishRef = useRef<ThreeElements['primitive'] | null>(null)
  const fishState = useRef<any>({
    targetY: 0,
    targetAngle: 0,
    speed: 1.5,
    angle: 0,
    aY: 0,
    vY: 0,
    t: 0
  })

  useFrame((_state, delta) => {
    if (delta > 0.1) return

    if (fishRef && fishRef.current) {
      const fs = fishState.current

      // vertical movement behavior
      const aYFactor = clamp(1, 3, Math.abs(fishRef.current.position.y - fs.targetY))
      fs.t += delta
      fs.vY += (gAccel + fs.aY ) * delta * aYFactor
      fs.aY *= Math.max((1 - delta), 0)
      if (fs.aY < 0) {
        fs.aY = 0
      }

      // bobbing behavior
      if (
        fishRef.current.position.y < fs.targetY
        && fs.aY <= 0.1
        && fs.vY <= 0
      ) {
        fs.aY = 0.5
      }

      // steering behavior
      const angleDiff = fs.angle - fs.targetAngle
      if (Math.abs(angleDiff) < 0.1) {
        fs.targetAngle = Math.random() * Math.PI * 2
        fs.targetY = Math.random() * 18 - 9
        fs.speed = Math.random() * 4
      }

      if ((angleDiff < 0 && angleDiff > -Math.PI) || angleDiff > Math.PI) {
        fs.angle += vAngular * delta
      } else {
        fs.angle -= vAngular * delta
      }

      // wrap steering behavior
      if (fs.angle < 0) {
        fs.angle += 2 * Math.PI
      } else if (fs.angle > 2 * Math.PI) {
        fs.angle -= 2 * Math.PI
      }

      const v = FORWARD.clone()
      v.applyAxisAngle(UP, fs.angle)
      v.normalize().multiplyScalar(fs.speed)

      // apply movement behavior
      fishRef.current.position.y = clamp(-8, 8, fishRef.current.position.y + fs.vY * delta)
      fishRef.current.position.x = clamp(-8, 8, fishRef.current.position.x + v.x * delta)
      fishRef.current.position.z = clamp(-8, 8, fishRef.current.position.z + v.z * delta)

      fishRef.current.rotation.z = fs.vY * (Math.PI / 8)
      fishRef.current.rotation.x = 0
      fishRef.current.rotation.y = fs.angle + Math.sin(fs.t) / 4
    }
  })

  return <primitive ref={fishRef} object={uniqueScene} />
}

export default Guppy
