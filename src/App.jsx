import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience/Experience'

function App() {

  return (
    <div className="App">
     <Canvas>
      <color attach="background" args={['#213547']} />
      <fog attach="fog" args={['#101010', 10, 20]} />
      <Experience/>
     </Canvas>
    </div>
  )
}

export default App
