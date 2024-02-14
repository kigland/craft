import { useEffect, useState } from 'react'
import { Canvas, } from '@react-three/fiber'
import './App.css'
import { OrbitControls } from '@react-three/drei'
import KigurumiFace from './components/KigurumiFace'
import { Slider, Button, Link } from "@nextui-org/react";
import * as Three from 'three'
import { shapeKeyDict } from './shapeKeyDict'
import { STLExporter } from 'three-stdlib'
import { LoopSubdivision } from 'three-subdivide'

function App() {

  const [maskColor, setMaskColor] = useState("#f3c4bf");
  const [kigurumiMorphTargetDictionary, setKigurumiMorphTargetDictionary] = useState<any>({});
  const [shapeKeyValues, setShapeKeyValues] = useState<number[]>([]);
  const [refreshMeshForDownload, setRefreshMeshForDownload] = useState<number>(0);
  const [meshForDownload, setMeshForDownload] = useState<Three.BufferGeometry>(null!);

  useEffect(() => {
    console.log('morphTargetDictionary', kigurumiMorphTargetDictionary)
    setShapeKeyValues(new Array(Object.keys(kigurumiMorphTargetDictionary).length).fill(0))
  }, [kigurumiMorphTargetDictionary]);

  return (
    <div className="h-screen bg-header ">
      <div className="h-full flex flex-row justify-between items-center  bg-white bg-opacity-60">
        <div className="w-2/3 h-full bg-black bg-opacity-70">
          <Canvas >
            <ambientLight />
            <spotLight position={[10, 20, 50]} angle={1} penumbra={1} decay={1} intensity={220} />
            <spotLight position={[-10, 1, 1]} angle={1} penumbra={1} decay={1} intensity={50} />
            <spotLight position={[10, 1, 1]} angle={1} penumbra={1} decay={1} intensity={50} />
            <spotLight position={[1, -10, 1]} angle={1} penumbra={1} decay={1} intensity={50} />
            <pointLight position={[0, 10, 30]} decay={0} intensity={2} />
            <OrbitControls />
            <KigurumiFace
              setKigurumiMorphTargetDictionary={setKigurumiMorphTargetDictionary}
              shapeValues={[...shapeKeyValues]}
              faceModelUrl="/v0.01.model.kigland.glb"
              rotation={[0.04, 0.4, 0]}
              scale={0.02}
              position={[0, -2.2, -1]}
              color={maskColor}
              setMeshForDownload={setMeshForDownload}
              refreshMeshForDownload={refreshMeshForDownload}
            />
          </Canvas>
        </div>
        <div className="w-1/2 px-4 select-none">
          <div className="-ml-28 mr-28 rounded-3xl shadow-2xl p-8 flex flex-col space-y-4 bg-white ">
            <div className="-mt-24 p-4 h-32 w-32 border-8 border-black flex flex-col justify-center items-center text-5xl rounded-full shadow-2xl bg-white">
              <svg viewBox="0 0 195 178" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 34.7356C0 34.7356 3.73439 15.5055 61.4602 3.93373C119.186 -7.63804 129.623 10.0048 129.623 10.0048C129.623 10.0048 130.403 13.1091 131.387 18.3604L131.408 18.4721C130.944 18.4102 130.467 18.3477 129.978 18.2846C97.8176 14.1268 77.5858 16.5233 64.716 20.9535C58.2172 23.1907 53.5626 25.9602 50.2685 28.6781C48.6297 30.0304 47.3661 31.3385 46.4044 32.5071C45.9251 33.0896 45.5254 33.6318 45.1945 34.1208C45.0293 34.3651 44.8816 34.5954 44.7501 34.8102C44.6844 34.9176 44.6228 35.021 44.565 35.1202C44.5487 35.1484 44.5326 35.1762 44.5168 35.2037C44.5048 35.2246 44.493 35.2453 44.4814 35.2659C44.4679 35.2896 44.4547 35.3131 44.4417 35.3363L44.4224 35.3709L44.4034 35.405L43.3375 37.334L42.9024 39.5054L42.9004 39.5154L42.8911 39.5623L42.876 39.6391L42.8711 39.6645C42.8549 39.7475 42.8331 39.8602 42.8062 40.0017C42.7524 40.2848 42.6782 40.6832 42.5876 41.1897C42.4064 42.2025 42.159 43.6493 41.8773 45.4717C41.3144 49.1125 40.6109 54.2737 40.0241 60.4835C39.8665 62.1512 39.7167 63.9011 39.5801 65.7237C35.4809 68.6015 33.1967 73.7773 34.1651 79.1042C34.762 82.388 36.4919 85.1623 38.8639 87.0823C38.9283 93.5096 39.2648 100.265 40.0068 107.111C40.8293 114.699 42.1726 122.618 44.293 130.446C7.92578 104.22 0 34.7356 0 34.7356Z" fill="#4A4A4A" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M61.6068 138.578L61.6077 138.578C55.1452 122.94 52.9413 104.788 52.6526 88.4837C52.502 79.9778 52.8726 71.9749 53.4319 65.0943C54.5401 51.4588 56.3888 42.2308 56.3888 42.2308C56.3888 42.2308 56.4731 42.0781 56.6742 41.8071C56.4727 42.0784 56.3882 42.2312 56.3882 42.2312C56.3882 42.2312 54.5395 51.4588 53.4313 65.094C52.8721 71.9747 52.5014 79.9779 52.652 88.484C52.9406 104.788 55.1445 122.94 61.6068 138.578ZM133.691 32.8834C132.692 32.734 131.664 32.5865 130.605 32.441C129.846 32.3365 129.078 32.2339 128.301 32.1335C107.292 29.4174 92.2599 29.7077 81.5683 31.2766C92.2599 29.7079 107.291 29.4179 128.301 32.1339C129.084 32.2352 129.852 32.3376 130.605 32.441C131.65 32.5851 132.679 32.7329 133.691 32.8845L133.691 32.8834Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M130.605 32.441C129.852 32.3376 129.084 32.2352 128.301 32.1339C107.291 29.4179 92.2599 29.7079 81.5683 31.2766C80.1919 31.4786 78.8875 31.7016 77.6515 31.9423C76.3352 32.1986 75.0965 32.4748 73.9312 32.7663C72.666 33.0828 71.4874 33.4175 70.3899 33.7646C69.1732 34.1494 68.0562 34.5496 67.0315 34.9573C66.493 35.1715 65.98 35.3878 65.4915 35.6051C65.0026 35.8225 64.5382 36.0408 64.0972 36.259C63.6675 36.4716 63.2601 36.6841 62.8738 36.8953C62.3326 37.1912 61.833 37.4849 61.3723 37.7732C61.0631 37.9668 60.7713 38.158 60.4963 38.346C60.2194 38.5353 59.9595 38.7213 59.7156 38.9032C59.4715 39.0853 59.2435 39.2632 59.0308 39.436C58.7817 39.6385 58.5536 39.834 58.3451 40.0211C58.2061 40.1458 58.0759 40.2668 57.954 40.3837C57.8382 40.4947 57.73 40.6019 57.6289 40.705C57.544 40.7917 57.4641 40.8754 57.3892 40.956C57.2029 41.1563 57.0465 41.3374 56.9169 41.4961C56.8829 41.5376 56.8508 41.5777 56.8205 41.6161C56.7922 41.6519 56.7655 41.6863 56.7403 41.7192C56.717 41.7498 56.695 41.7791 56.6742 41.8071C56.4731 42.0781 56.3888 42.2308 56.3888 42.2308C56.3888 42.2308 54.5401 51.4588 53.4319 65.0943C52.8726 71.9749 52.502 79.9778 52.6526 88.4837C52.9413 104.788 55.1452 122.94 61.6077 138.578C66.4677 150.339 73.7361 160.677 84.4097 167.738C91.2016 172.231 99.3723 175.397 109.179 176.758C109.842 176.85 110.501 176.932 111.155 177.004C186.903 185.377 195 61.4659 195 61.4659C195 61.4659 191.996 48.086 159.986 38.5442C153.447 36.5951 145.698 34.8061 136.517 33.324C135.59 33.1743 134.648 33.0278 133.691 32.8845C132.679 32.7329 131.65 32.5851 130.605 32.441ZM87.7961 114.504C95.3154 115.547 102.237 110.148 103.255 102.445C104.274 94.7418 99.0038 87.6512 91.4846 86.6078C83.9653 85.5643 77.044 90.9632 76.0255 98.6664C75.0069 106.37 80.2768 113.46 87.7961 114.504ZM153.095 98.5328L149.336 90.5825C148.546 88.912 146.305 88.6011 145.11 89.9961L139.421 96.6352C139.022 97.101 138.467 97.4049 137.859 97.4908L129.904 98.6144L129.228 98.7098C127.448 98.9612 126.497 100.937 127.403 102.5L128.077 103.661L131.896 110.245C132.199 110.766 132.308 111.377 132.204 111.968L130.664 120.781C130.35 122.58 131.976 124.126 133.752 123.716L142.146 121.774C142.753 121.634 143.392 121.722 143.94 122.023L151.364 126.093L151.528 126.182C153.133 127.062 155.102 126.015 155.266 124.195L156.07 115.28C156.124 114.682 156.388 114.123 156.815 113.703L160.986 109.598L163.157 107.461C164.436 106.202 164.033 104.038 162.382 103.311L160.797 102.612L159.621 102.094L154.379 99.7833C153.815 99.5348 153.359 99.0906 153.095 98.5328Z" fill="black" />
              </svg>

            </div>
            <div>
              <h1 className="font-black text-3xl m-0">Kigurumi Face Craft 🗿</h1>
              <p className="text-gray-500 m-0 text-sm">
                By <Link href="https://kig.land/" target="_blank">Kig.Land</Link> Lab
                <span className="text-gray-400 m-0 text-sm"> model v2024.1.1</span>
              </p>

            </div>
            <div className="flex flex-row space-x-4">
              <Button color="primary"
                style={{ backgroundColor: "#f3c4bf" }}
                className="text-red-900"
                onClick={() => { setMaskColor("#f3c4bf") }}
              >
                肉粉 肤色
              </Button>
              <Button color="primary"
                style={{ backgroundColor: "#f2ddac" }}
                className="text-red-900"
                onClick={() => { setMaskColor("#f2ddac") }}
              >
                黄 肤色
              </Button>
            </div>
            <div className="h-80 p-4 overflow-auto relative shadow-inner  rounded-lg">
              {
                kigurumiMorphTargetDictionary && Object.keys(kigurumiMorphTargetDictionary).map((key: string) => {
                  return <div key={key}
                    className="flex flex-row justify-between items-center my-4">
                    <Slider
                      key={key}
                      label={`${(shapeKeyDict as any)[key]?.zh_CN ?? ""}`}
                      step={0.01}
                      maxValue={1}
                      minValue={0}
                      defaultValue={0}
                      // hideValue
                      value={shapeKeyValues[kigurumiMorphTargetDictionary[key]]}
                      onChange={(value) => {
                        const tmpshapeKeyValues = [...shapeKeyValues];
                        tmpshapeKeyValues[kigurumiMorphTargetDictionary[key]] = value as number;
                        setShapeKeyValues([...tmpshapeKeyValues])
                      }}
                    />
                  </div>
                })
              }
            </div>

            <div className="pt-2">
              <p className="text-gray-400 m-0 text-sm my-2 font-thin ">
                仅供参考，实际效果可能有所不同
              </p>
              <Button color="primary" onClick={() => {
                setRefreshMeshForDownload(refreshMeshForDownload + 1)
                // sleep 1s 
                setTimeout(() => {
                  function applyMorphTargets(geometry: Three.BufferGeometry, influences: number[]) {
                    const morphAttributes = geometry.morphAttributes.position;
                    for (let i = 0; i < morphAttributes.length; i++) {
                      const morphAttribute = morphAttributes[i];
                      for (let j = 0; j < morphAttribute.count; j++) {
                        const morphedPosition = new Three.Vector3().fromBufferAttribute(morphAttribute, j).multiplyScalar(influences[i]);
                        geometry.attributes.position.setXYZ(j,
                          geometry.attributes.position.getX(j) + morphedPosition.x,
                          geometry.attributes.position.getY(j) + morphedPosition.y,
                          geometry.attributes.position.getZ(j) + morphedPosition.z);
                      }
                    }
                    geometry.attributes.position.needsUpdate = true;
                  }

                  const originalGeometry = meshForDownload;
                  let clonedGeometry = originalGeometry.clone();

                  applyMorphTargets(clonedGeometry, shapeKeyValues);

                  const mesh = new Three.Mesh(
                    LoopSubdivision
                      .modify(clonedGeometry, 2, {
                        split: true,       // optional, default: true
                        uvSmooth: false,      // optional, default: false
                        preserveEdges: false,      // optional, default: false
                        flatOnly: false,      // optional, default: false
                        maxTriangles: Infinity,   // optional, default: Infinity
                      })
                  );

                  const exporter = new STLExporter()
                  const result = exporter.parse(mesh, { binary: true });
                  const blob = new Blob([result], { type: 'application/octet-stream' });
                  const link = document.createElement('a');
                  link.href = URL.createObjectURL(blob);
                  link.download = 'kigurumi-face.stl';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }, 1000)
              }}>
                下载模型
              </Button>
              <Link className="text-sm ml-4"> 获取原模型 </Link>
            </div>
          </div>
          <div className="p-4">

          </div>
        </div>
      </div>
    </div >
  )
}

export default App
