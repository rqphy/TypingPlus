import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Experience from "./components/Experience"

function App() {
    return (
        <>
            <Canvas shadows camera={{ position: [0, 0, 3], fov: 50 }}>
                <color attach="background" args={["#ececec"]} />
                <OrbitControls />
                <ambientLight />
                <Experience />
            </Canvas>
        </>
    )
}

export default App
