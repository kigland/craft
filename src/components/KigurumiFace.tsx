import { useEffect, useRef, } from 'react'
import { ThreeElements, useFrame, } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three-stdlib'
import { color } from 'framer-motion'
import * as THREE from 'three'

const KigurumiFace = (props: ThreeElements['mesh'] & {
  shapeValues?: number[],
  faceModelUrl?: string,
  color?: string,
}) => {

  const {
    shapeValues = [0],
    faceModelUrl
  } = props;

  const ref = useRef<ThreeElements['primitive']>(null!);
  const cubeGeometry: any = useLoader(GLTFLoader, faceModelUrl || '/cube.glb');


  useEffect(() => {
    ref.current.children[0].morphTargetInfluences = shapeValues;
    ref.current.children[0].material.color = new THREE.Color(props.color || "#f3c4bf");
  }, [shapeValues, color]);

  return <mesh {...props}>

    {props.children}
    <primitive object={cubeGeometry.scene} ref={ref} />
  </mesh>

}

export default KigurumiFace;