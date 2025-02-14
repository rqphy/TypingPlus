import { useGLTF, useAnimations } from "@react-three/drei"
import { useEffect } from "react"
import * as THREE from "three"

const keymap = {
    " ": "Plane.003Action.026",
    backspace: "Plane.003Action.006",
    a: "Plane.003Action.012",
    b: "Plane.003Action.025",
    c: "Plane.003Action.023",
    d: "Plane.003Action.014",
    e: "Plane.003Action.002",
    f: "Plane.003Action.015",
    g: "Plane.003Action.016",
    h: "Plane.003Action.017",
    i: "Plane.003Action.009",
    j: "Plane.003Action.018",
    k: "Plane.003Action.019",
    l: "Plane.003Action.020",
    m: "Plane.003Action.031",
    n: "Plane.003Action.030",
    o: "Plane.003Action.010",
    p: "Plane.003Action.011",
    q: "Plane.003Action",
    r: "Plane.003Action.003",
    s: "Plane.003Action.013",
    t: "Plane.003Action.004",
    u: "Plane.003Action.008",
    v: "Plane.003Action.024",
    w: "Plane.003Action.001",
    x: "Plane.003Action.022",
    y: "Plane.003Action.005",
    z: "Plane.003Action.021",
}

export default function Keyboard() {
    const { scene, animations } = useGLTF("/models/keyboard/keyboard.gltf")
    const { actions } = useAnimations(animations, scene)

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }, [scene])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase()
            const animationName = keymap[key as keyof typeof keymap]

            if (animationName && actions[animationName]) {
                actions[animationName]
                    ?.setLoop(THREE.LoopOnce, 0)
                    .reset()
                    .play()
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [actions, keymap])

    return <primitive position={[0, -0.7, -0.3]} scale={0.2} object={scene} />
}
