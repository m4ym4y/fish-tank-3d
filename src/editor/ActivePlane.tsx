import type { ThreeEvent } from '@react-three/fiber'
import {useEffect, useRef, type ReactElement} from 'react'
import {useRapier, interactionGroups} from '@react-three/rapier'
import * as THREE from 'three'

import {
  addProp
} from './editorSlice.ts'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'
import * as util from '../util'
import {useThree} from '@react-three/fiber'
import type {BufferGeometry} from 'three'

const WHITE = new THREE.Color(1.0, 1.0, 1.0)
const GROUND_HEIGHT = -9

interface propParams {
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
  } else if (groundPoint.y > -8.9) {
    return null
  } else {
    return [groundPoint.x, GROUND_HEIGHT, groundPoint.z]
  }
}

function ActivePlane() {
  const ghostRef = useRef<THREE.Mesh | null>(null)
  const matRef = useRef<THREE.MeshStandardMaterial | null>(null)
  const dispatch = useAppDispatch()
  const mouseDownEvent = useRef<ThreeEvent<MouseEvent> | null>(null)

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
    if (mouseDownEvent.current) {
      const dist = Math.sqrt(
        Math.pow(ev.screenX - mouseDownEvent.current.screenX, 2) +
        Math.pow(ev.screenY - mouseDownEvent.current.screenY, 2)
      )

      if (dist <= 5) {
        const point = getGhostRefPosition(rapier, world, camera, ev.point)
        if (point) {
          dispatch(addProp({
            pos: point
          }))
        }
      }
    }
  }

  useEffect(() => {
    if (ghostRef.current) {
      ghostRef.current.traverse(obj => {
        const mesh = obj as THREE.Mesh
        if (mesh.isMesh && mesh.material) {
          // im too tired for this rn
          if (Array.isArray(mesh.material)) return
          const newMat = mesh.material.clone() as THREE.MeshStandardMaterial
          matRef.current = newMat

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
      onPointerOut={() => { if (ghostRef.current) ghostRef.current.visible = false }}
      onPointerMove={(ev: ThreeEvent<MouseEvent>) => {
        // lazily set color
        const colorTint = util.rgbToThreeColor(transform.colorTint)
        if (
          matRef.current && (
            matRef.current.color.equals(colorTint) ||
            (!matRef.current.color.equals(WHITE) && !transform.colorTintEnabled)
          )
        ) {
          matRef.current.color = transform.colorTintEnabled ? colorTint : WHITE 
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
          type={selected.type}
          position={[ 0, 0, 0 ]}
          rotation={0}
          scale={1}
        />
      </group>
    </group>
  </>
}

export default ActivePlane
