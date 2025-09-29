import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
import Angelfish from './Angelfish.tsx'
import Rock from './Rock.tsx'
import Plant from './Plant.tsx'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

const guppyCount = 10
const angelfishCount = 3

function App() {
  return <Canvas
    style={{ width: '800px', height: '600px' }}
    camera={{ position: [20, 20, 20 ] }}
    onCreated={({ gl }) => {
      gl.toneMapping = THREE.NoToneMapping
    }}
  >
    <Suspense>
      <Physics>
        <Tank />
        <group>
          <Plant key={0} type={0} position={[ 2, -8, 2 ]} scale={1} rotation={Math.PI / 4} />
          <Plant key={1} type={0} position={[ -3, -9, -5 ]} scale={2} rotation={Math.PI / 4} />
          <Plant key={2} type={0} position={[ 3, -9, 6 ]} scale={0.6} rotation={2 * Math.PI / 3} />
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
        {/*<color attach="background" args={['black']} />*/}
        <ambientLight intensity={0.5} />
        <pointLight intensity={400} position={[0, 10, 0 ]} />
      </Physics>
    </Suspense>
    <OrbitControls />
    <Stats />
  </Canvas>
}

export default App
