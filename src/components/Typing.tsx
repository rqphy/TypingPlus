import { useState, useEffect } from "react"
import wordsData from "../data/words.json"

interface LetterState {
    char: string
    state: "untouched" | "correct" | "incorrect"
}

const words: string[] = wordsData.words

function getRandomWords(wordPool: string[], count: number): string[] {
    const shuffled = [...wordPool].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
}

export default function Typing() {
    const [words] = useState(() => getRandomWords(wordsData.words, 20))
    const [letters, setLetters] = useState<LetterState[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [correctWords, setCorrectWords] = useState(0)
    const [isCompleted, setIsCompleted] = useState(false)
    const [startTime, setStartTime] = useState<number | null>(null)
    const [wpm, setWpm] = useState<number>(0)

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

    const checkWordAccuracy = (wordStart: number, wordEnd: number) => {
        for (let i = wordStart; i < wordEnd; i++) {
            if (letters[i].state !== "correct") return false
        }
        return true
    }

    useEffect(() => {
        if (currentIndex >= letters.length && letters.length > 0) {
            setIsCompleted(true)
            let wordStart = 0
            let correctCount = 0

            // Count correct words
            words.forEach((word) => {
                const wordLength = word.length
                if (checkWordAccuracy(wordStart, wordStart + wordLength)) {
                    correctCount++
                }
                wordStart += wordLength + 1
            })

            // Calculate WPM
            if (startTime) {
                const timeInMinutes = (Date.now() - startTime) / 60000
                const wordsTyped = letters.length / 5 // Standard: 5 characters = 1 word
                setWpm(Math.round(wordsTyped / timeInMinutes))
            }

            setCorrectWords(correctCount)
        }
    }, [currentIndex, letters, startTime])

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (currentIndex >= letters.length) return

            // Start timer on first keypress
            if (currentIndex === 0 && startTime === null) {
                setStartTime(Date.now())
            }

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
    }, [currentIndex, letters, startTime])

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
            {!isCompleted &&
                letters.map((letter, index) => (
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

            {isCompleted && (
                <div style={{ marginTop: "20px" }}>
                    <p>Test completed!</p>
                    <p>
                        Correct words: {correctWords} / {words.length}
                    </p>
                    <p>
                        Accuracy:{" "}
                        {((correctWords / words.length) * 100).toFixed(1)}%
                    </p>
                    <p>Speed: {wpm} WPM</p>
                    <p
                        style={{
                            marginTop: "15px",
                            fontSize: "16px",
                            color: "#666",
                        }}
                    >
                        Press Tab + Enter to restart
                    </p>
                </div>
            )}
        </div>
    )
}
