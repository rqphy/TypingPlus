import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sky } from "@react-three/drei"
import Room from "./Room"
import Keyboard from "./Keyboard"

export default function Experience() {
	return (
		<>
			<Canvas shadows camera={{ position: [0, 0.5, 3], fov: 30 }}>
				<color attach="background" args={["#ececec"]} />
				<OrbitControls
					enablePan={false}
					minPolarAngle={1.25}
					maxPolarAngle={1.5}
					minAzimuthAngle={-0.3}
					maxAzimuthAngle={0.3}
					minDistance={1.75}
					maxDistance={3}
				/>
				<pointLight
					args={["#ffffff", 20, 0]}
					position={[1, 3, -1]}
					castShadow
				/>
				<ambientLight />
				<Room />
				<Keyboard />
				<Sky sunPosition={[1, 8, -1]} />
			</Canvas>
		</>
	)
}
