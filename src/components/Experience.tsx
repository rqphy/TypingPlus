import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Room from "./Room"
import Keyboard from "./Keyboard"

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
				<Room />
				<Keyboard />
			</Canvas>
		</>
	)
}
