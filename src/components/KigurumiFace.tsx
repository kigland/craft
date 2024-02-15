import { useEffect, useMemo, useRef } from 'react';
import { ThreeElements } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';
import * as THREE from 'three';
import { LoopSubdivision } from 'three-subdivide';
import { DRACOLoader } from 'three-stdlib';

export const loadDRACOModel = (loader: any) => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  dracoLoader.preload();
  loader.setDRACOLoader(dracoLoader);
};

const KigurumiFace = (props: ThreeElements['mesh'] & {
  shapeValues?: number[],
  faceModelUrl?: string,
  color?: string,
  refreshMeshForDownload: number,
  setMeshForDownload: (mesh: any) => void,
  setKigurumiMorphTargetDictionary?: (labels: string[] | any) => void,
}) => {

  const {
    shapeValues = [0],
    faceModelUrl,
    setKigurumiMorphTargetDictionary,
    refreshMeshForDownload,
    setMeshForDownload
  } = props;

  const ref = useRef<ThreeElements['primitive']>(null!);

  const loadedGltfModel = useLoader(GLTFLoader, faceModelUrl || '/cube.glb');

  const subdividedGeometry = useMemo(() => {
    const geometry = (loadedGltfModel.scene.children[0] as THREE.Mesh).geometry.clone(); // Clone geometry before modifying it
    return LoopSubdivision.modify(geometry, 2, { // Assuming a fixed subdivision level of 2
      split: true,
      uvSmooth: false,
      preserveEdges: false,
      flatOnly: false,
      maxTriangles: Infinity,
    });
  }, [loadedGltfModel]);

  useEffect(() => {
    ref.current.children[0].morphTargetInfluences = shapeValues;
    ref.current.children[0].material.color = new THREE.Color(props.color || "#f3c4bf");
  }, [shapeValues, props.color]);

  useEffect(() => {
    setMeshForDownload(ref.current.children[0].geometry);
  }, [refreshMeshForDownload]);

  useEffect(() => {
    // Apply the subdivided geometry to the mesh
    const mesh = ref.current.children[0] as THREE.Mesh;
    mesh.geometry = subdividedGeometry;
    // Optional: Set morph target dictionary if needed
    if (setKigurumiMorphTargetDictionary) {
      setKigurumiMorphTargetDictionary(mesh.morphTargetDictionary);
    }
  }, [subdividedGeometry, setKigurumiMorphTargetDictionary]);

  return <mesh {...props}>
    {props.children}
    <primitive object={loadedGltfModel.scene} ref={ref} />
  </mesh>;
};

export default KigurumiFace;
