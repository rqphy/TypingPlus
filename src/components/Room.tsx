import { useGLTF } from "@react-three/drei"
import { Html, useTexture } from "@react-three/drei"
import { useControls } from "leva"

export default function Room() {
    const { nodes } = useGLTF("/models/room/room.glb")

    const bakedTexture = useTexture("/models/room/baked.jpg")
    bakedTexture.flipY = false

    // const { positionX, positionY, positionZ } = useControls({
    //     positionX: { value: 0, min: -10, max: 10, step: 0.1 },
    //     positionY: { value: 0, min: -10, max: 10, step: 0.1 },
    //     positionZ: { value: 0, min: -10, max: 10, step: 0.1 },
    // })

    return (
        <mesh
            geometry={nodes.baked.geometry}
            position={[0, -1, -0.8]}
            // scale={0.3}
        >
            <meshBasicMaterial map={bakedTexture} />
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={0.65}
                position={[0, 2.693, -3.5]}
            >
                <iframe src="https://bruno-simon.com/" />
            </Html>
        </mesh>
        // <primitive position={[0, -2.5, 2.6]} object={scene}>

        // </primitive>
    )
}
