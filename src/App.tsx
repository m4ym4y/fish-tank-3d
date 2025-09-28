import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import Guppy from './Guppy.tsx'
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
    <Guppy />
    {/*<color attach="background" args={['black']} />*/}
    <ambientLight intensity={0.5} />
    <pointLight intensity={400} position={[0, 10, 0 ]} />
    <axesHelper args={[5]} />
    <OrbitControls />
    <Stats />
  </Canvas>
}

export default App
