import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, ThreeElements, } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three-stdlib'
import { LoopSubdivision } from 'three-subdivide'

function Face(props: ThreeElements['mesh']) {
  const ref = useRef<THREE.Mesh>(null!)

  const geometry = useLoader(STLLoader, '/face.stl')
  // useFrame((state, delta) => {
  //   ref.current.rotation.z += delta - 0.01
  // })

  const subdividedGeometry = useMemo(
    () => 3 > 0
      ? LoopSubdivision.modify(geometry, 1, {
        split: true,
        uvSmooth: true,
        preserveEdges: true,
        flatOnly: false,
        maxTriangles: Infinity
      })
      : undefined,
    [geometry]
  )

  useEffect(() => {
    ref.current.rotation.x = -Math.PI / 2
  }, [])

  return <mesh
    {...props}
    scale={0.01}
    ref={ref}>
    <meshStandardMaterial color={"#f3c4bf"} />
    <primitive object={subdividedGeometry || geometry} />
  </mesh>
}

export default Face