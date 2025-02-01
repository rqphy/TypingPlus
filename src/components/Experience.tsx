import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Room from "./Room"
import Keyboard from "./Keyboard"
import * as THREE from "three"

export default function Experience() {
    return (
        <>
            <Canvas shadows camera={{ position: [0, 0.5, 3], fov: 30 }}>
                <color attach="background" args={["#ececec"]} />
                <OrbitControls />
                <pointLight
                    args={["#ffffff", 20, 0]}
                    position={[1, 3, -1]}
                    castShadow
                />
                <ambientLight />
                {/* <Room /> */}
                <mesh rotation={[-Math.PI * 0.5, 0, 0]} scale={2} receiveShadow>
                    <circleGeometry />
                    <meshStandardMaterial />
                </mesh>
                <Keyboard />
            </Canvas>
        </>
    )
}
