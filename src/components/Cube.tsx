import { useEffect, useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame, ThreeElements, } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'


const CubeTester = (props: ThreeElements['mesh'] & {
  shapeKey?: number[]
}) => {

  const ref = useRef<ThreeElements['primitive']>(null!);
  const cubeGeometry: any = useLoader(GLTFLoader, '/cube.glb');

  useEffect(() => {
    ref.current.children[0].morphTargetInfluences = props.shapeKey;
  }, [props.shapeKey]);

  return <mesh scale={0.1} {...props}>
    <primitive object={cubeGeometry.scene} ref={ref} />
  </mesh>

}

export default CubeTester;