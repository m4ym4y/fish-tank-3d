import { Canvas } from '@react-three/fiber'
import Tank from './Tank.tsx'
import WaterSurface from './WaterSurface.tsx'
import { Physics } from '@react-three/rapier'
import { OrbitControls, Stats } from '@react-three/drei'
import * as THREE from 'three'
import { Suspense } from 'react'
import queryString from 'query-string'
import { Pixelation, EffectComposer } from '@react-three/postprocessing'
import Editor from './editor/index.tsx'
import * as util from './util'

function App() {
  const qParams = queryString.parse(location.search)
  const bgColor = util.getQParam(qParams, 'color') || 'white'
  const fov = Number(util.getQParam(qParams, 'fov')) || 50
  const pixelation = Number(util.getQParam(qParams, 'pixelate')) || 0
  const viewMode = util.getQParam(qParams, "view") 
  const showStats = util.getQParam(qParams, "stats")

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
        <Editor edit={!viewMode} />
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={0.3} />
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
    {showStats && <Stats />}
  </Canvas>
}

export default App
