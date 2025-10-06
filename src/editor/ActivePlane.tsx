import type { ThreeEvent } from '@react-three/fiber'
import {useEffect, useRef, type ReactElement} from 'react'
import {useRapier, interactionGroups} from '@react-three/rapier'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

import {
  addProp
} from './editorSlice.ts'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'
import * as util from '../util'
import {useThree} from '@react-three/fiber'

const RED = new THREE.Color(1.0, 0.5, 0.5)
const GROUND_HEIGHT = -9
const GROUND_THRESHOLD = GROUND_HEIGHT + 0.1
const TANK_BOUNDS = new THREE.Box3(
  new THREE.Vector3(-10, -20, -10),
  new THREE.Vector3(10, 20, 10)
)

interface propParams {
  noPhysics?: boolean
  type: number
  position: [number, number, number]
  scale: number
  rotation: number
}

const propMap: {
  [key: string]: (props: propParams) => ReactElement
} = {
  'rock': Rock,
  'plant': Plant
}

function getGhostRefPosition (
  rapier: ReturnType<typeof useRapier>["rapier"],
  world: ReturnType<typeof useRapier>["world"],
  camera: THREE.Camera,
  groundPoint: THREE.Vector3
): [number, number, number] | null {
  const ray = new rapier.Ray(camera.position, groundPoint.clone().sub(camera.position).normalize())
  const hit = world.castRay(ray, 999, false, undefined, interactionGroups(3, 1))

  if (hit !== null) {
    const p = ray.pointAt(hit.timeOfImpact)
    return [p.x, Math.max(p.y, GROUND_HEIGHT), p.z]
  } else if (groundPoint.y > GROUND_THRESHOLD) {
    return null
  } else {
    return [groundPoint.x, GROUND_HEIGHT, groundPoint.z]
  }
}

function ghostInBoundary (
  ghost: THREE.Mesh
): boolean {
  const ghostBox = new THREE.Box3().setFromObject(ghost)
  return TANK_BOUNDS.containsBox(ghostBox)
}

function ActivePlane() {
  const ghostRef = useRef<THREE.Mesh | null>(null)
  const matRef = useRef<THREE.MeshStandardMaterial[] | null>(null)
  const dispatch = useAppDispatch()
  const mouseDownEvent = useRef<ThreeEvent<MouseEvent> | null>(null)
  const htmlRef = useRef<React.ComponentRef<typeof Html> | null>(null)

  const { world, rapier } = useRapier()
  const { camera } = useThree()

  const transform = useAppSelector(state => state.editor.transform)
  const selected = useAppSelector(state => state.editor.selected)
  const category = useAppSelector(state => state.editor.category)
  const PropType = (propMap[selected.name] || Rock)

  const onPointerDown = (ev: ThreeEvent<MouseEvent>) => {
    mouseDownEvent.current = ev
  }

  const onPointerUp = (ev: ThreeEvent<MouseEvent>) => {
    if (category !== 'props') return

    if (mouseDownEvent.current) {
      const dist = Math.sqrt(
        Math.pow(ev.screenX - mouseDownEvent.current.screenX, 2) +
        Math.pow(ev.screenY - mouseDownEvent.current.screenY, 2)
      )

      if (dist <= 5 && ghostRef.current) {
        const point = getGhostRefPosition(rapier, world, camera, ev.point)
        const inBounds = ghostInBoundary(ghostRef.current)

        if (point && inBounds) {
          dispatch(addProp({
            pos: point
          }))
        } else if (!inBounds && htmlRef.current && ghostRef.current.visible) {
          htmlRef.current.style.visibility = 'visible'
          setTimeout(() => {
            if (htmlRef.current) {
              htmlRef.current.style.visibility = 'hidden'
            }
          }, 500)
        }
      }
    }
  }

  useEffect(() => {
    if (ghostRef.current) {
      matRef.current = []
      ghostRef.current.traverse(obj => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh && mesh.material) {
          // im too tired for this rn
          if (Array.isArray(mesh.material)) return
          const newMat = mesh.material.clone() as THREE.MeshStandardMaterial

          if (matRef.current) {
            newMat.userData.originalColor = newMat.color
            matRef.current.push(newMat)
          }

          if (transform.colorTintEnabled) {
            newMat.color = util.rgbToThreeColor(transform.colorTint)
          }

          mesh.material = newMat
          mesh.material.opacity = 0.5
          mesh.material.transparent = true
          mesh.material.needsUpdate = true
        }
      })
    }
  }, [ selected, ghostRef, transform.colorTint, transform.colorTintEnabled ])

  return <>
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}

      onPointerOver={() => { if (ghostRef.current) ghostRef.current.visible = true }}
      onPointerOut={() => {
        if (ghostRef.current) {
          ghostRef.current.visible = false
        }
      }}
      onPointerMove={(ev: ThreeEvent<MouseEvent>) => {
        if (category !== 'props') return

        // lazily set color
        const colorTint = util.rgbToThreeColor(transform.colorTint)
        if (matRef.current) {
          if (ghostRef.current && !ghostInBoundary(ghostRef.current)) {
            matRef.current.forEach(m => m.color = RED)
          } else {
            matRef.current.forEach(m => m.color = transform.colorTintEnabled ? colorTint : m.userData.originalColor)
          }
        }

        if (ghostRef.current) {
          const position = getGhostRefPosition(rapier, world, camera, ev.point)

          if (position) {
            ghostRef.current.visible = true
            ghostRef.current.position.x = position[0]
            ghostRef.current.position.y = position[1]
            ghostRef.current.position.z = position[2]
          } else {
            ghostRef.current.visible = false
          }
        }
      }}
    >
      <boxGeometry args={[20, 20, 18]} />
      <meshStandardMaterial opacity={0} transparent side={THREE.BackSide} />
    </mesh>
    <group visible={category === "props"}>
      <group
        ref={ghostRef}
        visible={false}
        rotation={[0, transform.rotationDegrees * ((2 * Math.PI) / 360), 0 ]}
        scale={[ transform.scale, transform.scale, transform.scale ]}
      >
        <PropType
          noPhysics
          type={selected.type}
          position={[ 0, 0, 0 ]}
          rotation={0}
          scale={1}
        />
        <Html
          ref={htmlRef}
          style={{
            pointerEvents: 'none',
            fontFamily: "sans-serif",
            fontSize: 14,
            visibility: 'hidden',
            color: 'red',
            textAlign: 'center',
            minWidth: '120px',
            position: 'absolute',
            top: '-50px',
            left: '-60px'
          }}
        >
          out of bounds
        </Html>
      </group>
    </group>
  </>
}

export default ActivePlane
