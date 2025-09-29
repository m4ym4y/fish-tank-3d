import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import {euler, quat, RapierRigidBody, RigidBody, vec3} from '@react-three/rapier'

const gAccel = -0.1
const vAngular = 0.5
const FORWARD = new THREE.Vector3(1, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)

function clamp(min: number, max: number, val: number) {
  return Math.max(min, Math.min(max, val))
}

function Guppy() {
  const { scene } = useGLTF('/models/guppy.glb')
  const uniqueScene = useMemo(() => scene.clone(), [scene])

  const fishRef = useRef<RapierRigidBody | null>(null)
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
      const fishPos = vec3(fishRef.current.translation())

      // vertical movement behavior
      const aYFactor = clamp(1, 3, Math.abs(fishPos.y - fs.targetY))
      fs.t += delta
      fs.vY += (gAccel + fs.aY ) * delta * aYFactor
      fs.aY *= Math.max((1 - delta), 0)
      if (fs.aY < 0) {
        fs.aY = 0
      }

      // bobbing behavior
      if (
        fishPos.y < fs.targetY
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
      fishRef.current.setLinvel({ x: v.x, y: fs.vY, z: v.z }, true)

      const rY = fs.angle + Math.sin(fs.t) / 4
      fishRef.current.setRotation(
        quat().setFromEuler(euler({
          x: 0, y: rY, z: fs.vY * (Math.PI / 8)
        })),
        true
      )
    }
  })

  return <RigidBody ref={fishRef} colliders={"cuboid"} linearDamping={5} angularDamping={5}>
    <primitive object={uniqueScene} />
  </RigidBody>
}

export default Guppy
