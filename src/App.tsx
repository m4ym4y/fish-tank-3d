import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'

function App() {
  return <Canvas
    style={{ width: '800px', height: '600px' }}
    camera={{ position: [20, 20, 20 ] }}
    onCreated={({ gl }) => {
      gl.toneMapping = THREE.NoToneMapping
    }}
  >
    <Suspense>
      <Physics debug>
        <Tank />
        <Guppy key={1} />
        {/*<Guppy key={2} />
        <Guppy key={3} />
        <Guppy key={4} />
        <Guppy key={5} />
        <Guppy key={6} />
        <Guppy key={7} />
        <Guppy key={8} />*/}
        {/*<color attach="background" args={['black']} />*/}
        <ambientLight intensity={0.5} />
        <pointLight intensity={400} position={[0, 10, 0 ]} />
        <axesHelper args={[5]} />
      </Physics>
    </Suspense>
    <OrbitControls />
    <Stats />
  </Canvas>
}

export default App
