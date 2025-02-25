import { useGLTF } from "@react-three/drei"
import { Html, useTexture } from "@react-three/drei"
import Typing from "./Typing"

export default function Room() {
    const { nodes } = useGLTF("/models/room/room.glb")

    const bakedTexture = useTexture("/models/room/baked.jpg")
    bakedTexture.flipY = false

    // const { positionX, positionY, positionZ } = useControls({
    // 	positionX: { value: 0, min: -10, max: 10, step: 0.01 },
    // 	positionY: { value: 0, min: -10, max: 10, step: 0.01 },
    // 	positionZ: { value: 0, min: -10, max: 10, step: 0.01 },
    // })

    return (
        <mesh geometry={(nodes.baked as any).geometry} position={[0, -1, -0.8]}>
            <meshBasicMaterial map={bakedTexture} />
            <Html
                transform
                wrapperClass="htmlScreen"
                distanceFactor={0.65}
                position={[0, 1.09, -0.53]}
                // position={[positionX, positionY, positionZ]}
            >
                <section className="typing">
                    <Typing />
                </section>
            </Html>
        </mesh>
    )
}
