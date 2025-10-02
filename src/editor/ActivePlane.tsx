import type { ThreeEvent } from '@react-three/fiber'

function ActivePlane({ onClick }: {
  onClick?: (ev: ThreeEvent<MouseEvent>) => void
}) {
  return <mesh onClick={onClick} position={[0, -9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
    <planeGeometry args={[20, 20]} />
    <meshStandardMaterial opacity={0} transparent />
  </mesh>
}

export default ActivePlane
