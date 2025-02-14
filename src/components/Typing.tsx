import { useState, useEffect } from "react"

interface LetterState {
    char: string
    state: "untouched" | "correct" | "incorrect"
}

const words: string[] = ["hello", "world", "typing", "test", "practice"]

export default function Typing() {
    const [letters, setLetters] = useState<LetterState[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        // Initialize letters array from words
        const initialLetters = words
            .join(" ")
            .split("")
            .map((char) => ({
                char,
                state: "untouched",
            }))
        setLetters(initialLetters as LetterState[])
    }, [])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (currentIndex >= letters.length) return

            const newLetters = [...letters]

            if (event.key === "Backspace") {
                if (currentIndex === 0) return
                newLetters[currentIndex - 1] = {
                    ...newLetters[currentIndex - 1],
                    state: "untouched",
                }
                setCurrentIndex((prev) => prev - 1)
            } else {
                const isCorrect = event.key === letters[currentIndex].char

                newLetters[currentIndex] = {
                    ...newLetters[currentIndex],
                    state: isCorrect ? "correct" : "incorrect",
                }
                setCurrentIndex((prev) => prev + 1)
            }

            setLetters(newLetters)
        }

        window.addEventListener("keydown", handleKeyPress)
        return () => window.removeEventListener("keydown", handleKeyPress)
    }, [currentIndex, letters])

    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "24px",
                fontFamily: "monospace",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
        >
            {letters.map((letter, index) => (
                <span
                    key={index}
                    style={{
                        color:
                            letter.state === "correct"
                                ? "green"
                                : letter.state === "incorrect"
                                ? "red"
                                : "black",
                    }}
                >
                    {letter.char}
                </span>
            ))}
        </div>
    )
}
