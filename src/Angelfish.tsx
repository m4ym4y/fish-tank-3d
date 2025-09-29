import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import {euler, quat, RapierRigidBody, RigidBody} from '@react-three/rapier'

const rotationChangeFrequency = 0.3
const rotationAccel = 0.3
const maxRotationVel = 0.5
const flatteningFactor = 2.1 * maxRotationVel
const swimImpulseFrequency = 0.5
const maxSwimImpulse = 2.3
const swimDrag = 0.6

const FORWARD = new THREE.Vector3(1, 0, 0)
const UP = new THREE.Vector3(0, 1, 0)
const RIGHT = new THREE.Vector3(0, 0, 1)

function Angelfish() {
  const { scene } = useGLTF('/models/angelfish.glb')
  const uniqueScene = useMemo(() => scene.clone(), [scene])

  const fishRef = useRef<RapierRigidBody | null>(null)
  const fishState = useRef({
    speed: 1.5,
    yaw: {pos: Math.random() * Math.PI * 2, vel: 0, targetVel: 0},
    pitch: {pos: 0, vel: 0, targetVel: 0},
    rotationExpire: 0,
  })

  useFrame((_state, delta) => {
    if (delta > 0.1) return

    if (fishRef && fishRef.current) {
      const fs = fishState.current

      // randomly change target velocity sometimes
      if (Math.random() < rotationChangeFrequency * delta) {
        fs.yaw.targetVel = (Math.random() * 2 - 1) * maxRotationVel
        fs.pitch.targetVel = (Math.random() * 2 - 1) * maxRotationVel
      }

      // accelerate pitch and yaw in direction of target
      fs.yaw.vel += rotationAccel * delta * (fs.yaw.targetVel > fs.yaw.vel ? 1 : -1);
      fs.pitch.vel += rotationAccel * delta * (fs.pitch.targetVel > fs.pitch.vel ? 1 : -1);

      // pitch and yaw in direction of their velocity
      fs.yaw.pos += fs.yaw.vel * delta;
      fs.pitch.pos += fs.pitch.vel * delta;

      // to prevent flipping upside down, pull pitch towards zero
      fs.pitch.pos *= 1 - (flatteningFactor * delta);

      // decelerate over time
      fs.speed *= 1 - (swimDrag * delta);

      // randomly speed up (or go backwards) sometimes
      if (Math.random() < swimImpulseFrequency * delta) {
        fs.speed += (Math.random() * 1.2 - 0.2) * maxSwimImpulse;
      }

      // create movement vector
      const v = FORWARD.clone()
      v.applyAxisAngle(RIGHT, fs.pitch.pos)
      v.applyAxisAngle(UP, fs.yaw.pos)
      v.normalize().multiplyScalar(fs.speed)
      fishRef.current.setLinvel(v, true)

      fishRef.current.setRotation(
        quat().setFromEuler(euler({
          x: 0,
          y: fs.yaw.pos,
          z: fs.pitch.pos,
        })),
        true
      )
    }
  })

  return <RigidBody ref={fishRef} colliders={'cuboid'} linearDamping={5} angularDamping={5}>
    <primitive object={uniqueScene} />
  </RigidBody>
}

export default Angelfish
