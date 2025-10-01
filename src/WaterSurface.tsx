import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useLoader, extend, useFrame } from '@react-three/fiber'
import { TextureLoader } from 'three'

import vertexShaderBody from './shaders/ripple.vert.body.glsl?raw'
import fragmentShaderBody from './shaders/ripple.frag.body.glsl?raw'
import vertexShaderHead from './shaders/ripple.vert.head.glsl?raw'
import fragmentShaderHead from './shaders/ripple.frag.head.glsl?raw'

const vertexShader = `
  ${vertexShaderHead}
  void main() {
    ${vertexShaderBody}
  }
`

const fragmentShader = `
  ${fragmentShaderHead}
  void main() {
    ${fragmentShaderBody}
  }
`

import {useMemo, useRef} from 'react'
import {MeshDepthMaterial} from 'three'

const RippleMaterial = shaderMaterial({
  time: 0,
  timeScale: 0.025,
  textureScale: 2,
  threshold: 0.55,
  albedo: new THREE.Color(),
  uRipplesX: new THREE.Texture(),
  uRipplesZ: new THREE.Texture(),
  rippleDirectionX: new THREE.Vector2(2.0, 0.0),
  rippleDirectionZ: new THREE.Vector2(0.0, 1.0),
}, vertexShader, fragmentShader)
extend({ RippleMaterial })

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        rippleMaterial: any
      }
    }
  }
}

function WaterSurface() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null)
  const timeRef = useRef({ value: 0 })

  const tex = useLoader(TextureLoader, '/textures/vornoi2.png')

  const customDepthMaterial = useMemo(() => {
    const material = new MeshDepthMaterial({
      depthPacking: THREE.RGBADepthPacking
    })

    const mainMaterial = new RippleMaterial()
    material.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, mainMaterial.uniforms)
      shader.uniforms.uRipplesX.value = tex
      shader.uniforms.uRipplesZ.value = tex
      /*shader.uniforms.albedo.value = "#88eeff"
      shader.uniforms.threshold.value = 0.5*/
      shader.uniforms.time = timeRef.current

      shader.vertexShader = vertexShaderHead + shader.vertexShader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\n' + vertexShaderBody)

      shader.fragmentShader = fragmentShaderHead + shader.fragmentShader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <clipping_planes_fragment>',
        '#include <clipping_planes_fragment>\n' + fragmentShaderBody)
    }

    return material
  }, [])

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.time.value = clock.getElapsedTime()
      timeRef.current.value = clock.getElapsedTime()
    }
  })

  return <mesh position={[0, 9.7, 0 ]} rotation={[-Math.PI / 2, 0, 0 ]} castShadow customDepthMaterial={customDepthMaterial}>
    <planeGeometry args={[20, 20]} />
    <rippleMaterial
      ref={shaderRef}
      side={THREE.DoubleSide}
      shadowSide={THREE.DoubleSide}
      uRipplesX={tex}
      uRipplesZ={tex}
      albedo={"#ffffff"}
      transparent
      />
    {/*<meshStandardMaterial color={"#55ccff"} alphaMap={tex} alphaTest={0.53} side={THREE.DoubleSide} shadowSide={THREE.DoubleSide}/>*/}
  </mesh>
}

export default WaterSurface
