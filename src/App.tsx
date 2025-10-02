import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
import Angelfish from './Angelfish.tsx'
import Rock from './Rock.tsx'
import Plant from './Plant.tsx'
import Goldfish from './Goldfish.tsx'
import WaterSurface from './WaterSurface.tsx'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'
import queryString from 'query-string'

const guppyCount = 10
const angelfishCount = 3
const goldfishCount = 6

function getQParam(qParams: queryString.ParsedQuery, key: string): string | null {
  return Array.isArray(qParams.key) ? qParams.key[0] : qParams.key
}

function App() {
  const qParams = queryString.parse(location.search)
  const bgColor = getQParam(qParams, 'color') || 'white'
  const fov = Number(getQParam(qParams, 'fov')) || 50

  return <Canvas
    shadows="variance"
    camera={{ position: [0, 5, 42], fov }}
    gl={{
      toneMapping: THREE.NoToneMapping,
    }}
  >
    <Suspense>
      <Physics>
        <Tank />
        <WaterSurface />
        <group>
          <Plant key={0} type={0} position={[ 2, -8, 2 ]} scale={1} rotation={Math.PI / 4} />
          <Plant key={1} type={0} position={[ -3, -9, -5 ]} scale={2} rotation={Math.PI / 4} />
          <Plant key={2} type={0} position={[ 3, -9, 6 ]} scale={0.6} rotation={2 * Math.PI / 3} />
          <Plant key={3} type={1} position={[ 2, -9, 5 ]} scale={2} rotation={Math.PI / 3} />
          <Plant key={4} type={1} position={[ 7, -9, 1 ]} scale={3} rotation={2 * Math.PI / 3} />
          <Plant key={5} type={1} position={[ -5, -9, 5 ]} scale={2.5} rotation={0} />
          <Plant key={6} type={1} position={[ -4, -9, -6 ]} scale={4} rotation={Math.PI / 2} />
        </group>
        <group>
          <Rock key={0} type={0} position={[ 0, -7, 0 ]} scale={5} rotation={0} />
          <Rock key={1} type={1} position={[ 6, -8, 2 ]} scale={3} rotation={Math.PI / 4} />
          <Rock key={2} type={2} position={[ 3, -9, -4 ]} scale={3} rotation={Math.PI / 4} />
        </group>
        <group>
          {Array(guppyCount).fill(null).map((_, i) => <Guppy key={i} />)}
        </group>
        <group>
          {Array(angelfishCount).fill(null).map((_, i) => <Angelfish key={i} />)}
        </group>
        <group>
          {Array(goldfishCount).fill(null).map((_, i) => <Goldfish key={i} />)}
        </group>
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
