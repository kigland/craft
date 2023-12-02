import React, { useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Canvas, } from '@react-three/fiber'
import './App.css'
import { OrbitControls, Text } from '@react-three/drei'
import Face from './components/Face'
import { Switch } from "@nextui-org/react";

function App() {

  const [count, setCount] = useState(0);

  return (
    <div className="  h-screen flex flex-row justify-between items-center">
      <div className="w-2/3 h-full ">
        <Canvas >
          <ambientLight />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <Face position={[0, 0, 0]} />
          <OrbitControls />
          {/* <Text position={[0, 3, 0]} scale={[0.5, 0.5, 0.5]}> craft.kig.land</Text> */}
        </Canvas>
      </div>
      <div className="w-1/3 p-2 overflow-auto rounded-3xl shadow-2xl">

        <div>
          <Switch defaultSelected>开启表面细分</Switch>
        </div>
      </div>
    </div>
  )
}

export default App
