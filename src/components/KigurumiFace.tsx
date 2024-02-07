import { useEffect, useRef, } from 'react'
import { ThreeElements, useFrame, } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import * as THREE from 'three'
import { LoopSubdivision } from 'three-subdivide'

const KigurumiFace = (props: ThreeElements['mesh'] & {
  shapeValues?: number[],
  faceModelUrl?: string,
  color?: string,
  subvision?: number,
}) => {

  const {
    shapeValues = [0],
    faceModelUrl,
    subvision = 0,
  } = props;

  const ref = useRef<ThreeElements['primitive']>(null!);
  const cubeGeometry: any = useLoader(GLTFLoader, faceModelUrl || '/cube.glb');

  useEffect(() => {
    ref.current.children[0].morphTargetInfluences = shapeValues;
    ref.current.children[0].material.color = new THREE.Color(props.color || "#f3c4bf");
    subvision > 0 && (ref.current.children[0].geometry = LoopSubdivision
      .modify(cubeGeometry.scene.children[0].geometry, 1, {
        split: true,       // optional, default: true
        uvSmooth: true,      // optional, default: false
        preserveEdges: true,      // optional, default: false
        flatOnly: false,      // optional, default: false
        maxTriangles: 10000,   // optional, default: Infinity
      }))
  }, [shapeValues, props.color, subvision],);

  return <mesh {...props}>
    {props.children}
    <primitive object={cubeGeometry.scene} ref={ref} />
  </mesh>

}

export default KigurumiFace;