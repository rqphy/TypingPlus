import { useGLTF } from "@react-three/drei"
import { Html } from "@react-three/drei"
import { useControls } from "leva"

export default function Room() {
    const { scene } = useGLTF("/models/room/room.gltf")

    const { positionX, positionY, positionZ } = useControls({
        positionX: { value: 0, min: -10, max: 10, step: 0.1 },
        positionY: { value: 0, min: -10, max: 10, step: 0.1 },
        positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
    })

    return (
        <primitive position={[0, -3, 2.6]} object={scene}>
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={0.65}
                position={[positionX, 2.7, -3.5]}
            >
                <iframe src="https://bruno-simon.com/" />
            </Html>
        </primitive>
    )
}
