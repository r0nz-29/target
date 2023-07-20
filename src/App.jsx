import './App.css'
import {GAMESTATES, SPECIAL_KEYS, useGlobalState} from "./store/index.js";
import {useEffect} from "react";

function App() {
	const {
		originalParagraph: words,
		typedParagraph: typed,
		cursorPosition: cursor,
		errors,
		gameState
	} = useGlobalState(state => state);
	const {incrementCursor, incrementErrors, updateTypedParagraph: updateParagraph} = useGlobalState(state => state);

	useEffect(() => {
		function handleKeydown(e) {
			if (SPECIAL_KEYS.has(e.key)) return;
			// if (e.key === BACKSPACE) {
			// 	deleteChar();
			// 	decrementCursor()
			// 	return;
			// }

			if (e.key !== words[cursor]) {
				const char = document.getElementById(`char-at-${cursor}`);
				char.style.color = "#f00"
				incrementErrors()
				return;
			}

			updateParagraph(e.key);
			incrementCursor();
		}

		if (gameState===GAMESTATES.IDLE) return;

		window.addEventListener('keydown', handleKeydown);

		return () => window.removeEventListener('keydown', handleKeydown);
	}, [updateParagraph, words, cursor, incrementCursor, incrementErrors, gameState])

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<div className="relative w-1/2 h-1/4">
				<p className="para-container text-xl w-full">
					{words.split("").map((char, i) => (
						<span key={i} id={`char-at-${i}`}
									className={`highlight text-gray-500 font-light ${gameState===GAMESTATES.TYPING && i === cursor && 'border-b-4 border-pink-500'}`}>
						{char}
					</span>
					))}
				</p>
				{/*${i===cursor ? char===' ' ? 'border-b border-blue-500' : 'text-blue-500' : ''}*/}
				<p className="para-container text-xl w-full">
					{typed.split("").map((char, i) => (
						<span key={i} className={`blinker text-white`}>
						{char}
					</span>
					))}
				</p>
			</div>
			{/*<button onClick={() => {*/}
			{/*	const end = performance.now();*/}
			{/*	const acc = calculateAccuracy(words, typed);*/}
			{/*	const wpm = calculateWPM(typed, end - start);*/}
			{/*	console.log(`original: ${words}\n typed: ${typed}`)*/}
			{/*	console.log(`accuracy: ${acc}\n errors: ${errors}\n wpm: ${wpm}`)*/}
			{/*}}>Check*/}
			{/*</button>*/}
		</div>
	)
}

export default App
