import {Suspense } from "react";
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import CanvasLoader from './components/CanvasLoader'

// appear in the menu bar
const Models = [
  {title: 'ring 01', url: './models/ring.glb', scaleXYZ: 0.002},
  {title: 'ring 02', url: './models/ring_gold_with_diamond.glb', scaleXYZ: 0.1},
  {title: 'hammer', url: './models/hammer.glb', scaleXYZ: 1},
];
const Backgrounds = [
  {name: 'museum', url: './img/risd_museum.hdr', autoRotate: true},
  {name: 'blue sky', url: './img/bluesky.hdr', autoRotate: false},
  {name: 'work shop', url: './img/workshop_1k.hdr', autoRotate: true},
]

function Model({url,scaleXYZ}) {
  const { scene } = useGLTF(url)
  return <primitive 
    object={scene} 
    scale={[scaleXYZ, scaleXYZ, scaleXYZ]}
    />
}

export default function App() {
  const { title, background, materials } = useControls({
    title: {
      value: Models[0].title,
      options: Models.map(({ title }) => title)
    },
    background: {
      value: Backgrounds[0].name,
      options: Backgrounds.map(({ name }) => name)
    }
  });

  console.log("loaded");
  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Suspense fallback={<CanvasLoader />}>
          <Environment 
          // files={'./img/workshop_1k.hdr'}
          files={Backgrounds[Backgrounds.findIndex((item) => item.name === background)].url} 
          background />
            <group>
              <Model 
              url={Models[Models.findIndex((m) => m.title === title)].url} 
              scaleXYZ={Models[Models.findIndex((m) => m.title === title)].scaleXYZ}
              />
            </group>
          
          <OrbitControls 
            autoRotate={Backgrounds[Backgrounds.findIndex((item) => item.name === background)].autoRotate} 
          />
        </Suspense>
        {/* <Stats /> */}
      </Canvas>
      <span id="info">{title} in the {background}</span>
    </>
  )
}

//useGLTF.preload(Models.map(({ url }) => url))
