import { useState, useEffect } from "react"

interface LetterState {
	char: string
	state: "untouched" | "correct" | "incorrect"
}

export default function Typing() {
	const words = ["hello", "world", "typing", "test", "practice"]
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
			const isCorrect = event.key === letters[currentIndex].char

			newLetters[currentIndex] = {
				...newLetters[currentIndex],
				state: isCorrect ? "correct" : "incorrect",
			}

			setLetters(newLetters)
			setCurrentIndex((prev) => prev + 1)
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
