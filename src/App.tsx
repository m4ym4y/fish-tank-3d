import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
import Angelfish from './Angelfish.tsx'
import { OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'

function App() {
  return <Canvas
    style={{ width: '800px', height: '600px' }}
    camera={{ position: [20, 20, 20 ] }}
    onCreated={({ gl }) => {
      gl.toneMapping = THREE.NoToneMapping
    }}
  >
    <Tank />
    <Guppy key={1} />
    <Guppy key={2} />
    <Guppy key={3} />
    <Guppy key={4} />
    <Guppy key={5} />
    <Guppy key={6} />
    <Guppy key={7} />
    <Guppy key={8} />
    <Angelfish key={9} />
    <Angelfish key={10} />
    <Angelfish key={11} />
    {/*<color attach="background" args={['black']} />*/}
    <ambientLight intensity={0.5} />
    <pointLight intensity={400} position={[0, 10, 0 ]} />
    <axesHelper args={[5]} />
    <OrbitControls />
    <Stats />
  </Canvas>
}

export default App
