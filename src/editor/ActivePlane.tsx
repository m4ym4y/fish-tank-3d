import type { ThreeEvent } from '@react-three/fiber'
import {useEffect, useRef, type ReactElement} from 'react'
import * as THREE from 'three'

import {
  addProp
} from './editorSlice.ts'
import { useAppSelector, useAppDispatch } from '../state/hooks.ts'

import Rock from '../Rock.tsx'
import Plant from '../Plant.tsx'

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

function ActivePlane() {
  const ghostRef = useRef<THREE.Mesh | null>(null)
  const dispatch = useAppDispatch()
  const mouseDownEvent = useRef<ThreeEvent<MouseEvent> | null>(null)

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
        dispatch(addProp({
          pos: [ev.point.x, -8.5, ev.point.z]
        }))
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
          const newMat = mesh.material.clone()
          mesh.material = newMat
          mesh.material.opacity = 0.5
          mesh.material.transparent = true
          mesh.material.needsUpdate = true
        }
      })
    }
  }, [ selected, ghostRef ])

  return <>
    <mesh
      position={[0, -9, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}

      onPointerOver={() => { if (ghostRef.current) ghostRef.current.visible = true }}
      onPointerOut={() => { if (ghostRef.current) ghostRef.current.visible = false }}
      onPointerMove={(ev: ThreeEvent<MouseEvent>) => {
        if (ghostRef.current) {
          ghostRef.current.position.x = ev.point.x
          ghostRef.current.position.y = -8.5
          ghostRef.current.position.z = ev.point.z
        }
      }}
    >
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial opacity={0} transparent />
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
