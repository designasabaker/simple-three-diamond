import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

// appear in the menu bar
const Models = [
  { title: 'Hammer', url: './models/hammer.glb' },
  { title: 'Drill', url: './models/drill.glb' },
  { title: 'Tape Measure', url: './models/tapeMeasure.glb' }
]

function Model({url}) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function App() {
  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title)
    },
    test: {
      options: ['a', 'b', 'c']
    }
  })

  console.log("title: ",title);

  return (
    <>
      <Canvas camera={{ position: [0, 0, -0.2], near: 0.025 }}>
        <Environment files="./img/workshop_1k.hdr" background />
        <group>
          <Model url={Models[Models.findIndex((m) => m.title === title)].url} />
        </group>
        <OrbitControls autoRotate />
        <Stats />
      </Canvas>
      <span id="info">The {title} is selected.</span>
    </>
  )
}

//useGLTF.preload(Models.map(({ url }) => url))
