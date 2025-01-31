import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Experience from "./components/Experience"

function App() {
    return (
        <>
            <Canvas shadows camera={{ position: [0, 0.5, 3], fov: 30 }}>
                <color attach="background" args={["#ececec"]} />
                <OrbitControls />
                <ambientLight />
                <Experience />
            </Canvas>
        </>
    )
}

export default App
