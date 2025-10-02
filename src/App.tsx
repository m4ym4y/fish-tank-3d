import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
import Angelfish from './Angelfish.tsx'
import Rock from './Rock.tsx'
import Plant from './Plant.tsx'
import Goldfish from './Goldfish.tsx'
import WaterSurface from './WaterSurface.tsx'
import { Physics } from '@react-three/rapier'
import { Box, OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense, useState } from 'react'
import queryString from 'query-string'
import { Pixelation, EffectComposer } from '@react-three/postprocessing'
import Editor from './editor/index.tsx'

const guppyCount = 10
const angelfishCount = 3
const goldfishCount = 6

function getQParam(qParams: queryString.ParsedQuery, key: string): string | null {
  return Array.isArray(qParams[key]) ? qParams[key][0] : qParams[key]
}

function App() {
  const qParams = queryString.parse(location.search)
  const bgColor = getQParam(qParams, 'color') || 'white'
  const fov = Number(getQParam(qParams, 'fov')) || 50
  const pixelation = Number(getQParam(qParams, 'pixelate')) || 0

  return <Canvas
    shadows="variance"
    camera={{ position: [0, 5, 42], fov }}
    gl={{
      toneMapping: THREE.NoToneMapping,
    }}
  >
    <Suspense>
      <Physics>
        {pixelation && <EffectComposer>
          <Pixelation granularity={pixelation} />
        </EffectComposer>}
        <Tank />
        <WaterSurface />
        <Editor edit />
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={0.3} />
        {/*<fog attach="fog" args={['#88eeff', 0, 100]} />*/}
        <directionalLight
          intensity={4.0}
          position={[0, 10, 0 ]}
          castShadow
          shadow-mapSize={[ 1024, 1024 ]}
          shadow-bias={-0.001}
          shadow-intensity={0.5}
          shadow-radius={20}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
      </Physics>
    </Suspense>
    <OrbitControls />
    <Stats />
  </Canvas>
}

export default App
