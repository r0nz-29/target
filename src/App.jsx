import './App.css'
import {GAMESTATES, SPECIAL_KEYS, useGlobalState} from "./store/index.js";
import {useEffect, useState} from "react";
import ResultsModal from "./components/ResultsModal/index.jsx";

function App() {
	const {
		originalParagraph: words,
		typedParagraph: typed,
		cursorPosition: cursor,
		gameState,
		incrementCursor,
		incrementErrors,
		updateTypedParagraph: updateParagraph,
		updateGameState
	} = useGlobalState(state => state);
	const [timerInSec, setTimerInSec] = useState(15);

	useEffect(() => {
		if (gameState === GAMESTATES.IDLE || gameState === GAMESTATES.COMPLETED) return;
		let i = 15;
		const interval = setInterval(function () {
			if (i <= 0) {
				updateGameState(GAMESTATES.COMPLETED);
				clearInterval(interval);
				return;
			}
			i--;
			console.log("minus")
			setTimerInSec(i);
		}, 1000);

		return () => {
			clearInterval(interval)
		}
	}, [gameState, updateGameState])

	function startGame() {
		updateGameState(GAMESTATES.TYPING);
	}

	useEffect(() => {
		if (cursor === words.length) {
			updateGameState(GAMESTATES.COMPLETED);
		}
	}, [cursor, updateGameState, words, words.length])

	useEffect(() => {
		function handleKeydown(e) {
			if (gameState === GAMESTATES.IDLE || SPECIAL_KEYS.has(e.key)) return;

			if (e.key !== words[cursor]) {
				const char = document.getElementById(`char-at-${cursor}`);
				char.style.color = "#f00"
				char.style.fontWeight = "bold"
				incrementErrors()
				return;
			}

			updateParagraph(e.key);
			incrementCursor();
		}

		if (gameState === GAMESTATES.IDLE) return;
		window.addEventListener('keydown', handleKeydown);

		return () => window.removeEventListener('keydown', handleKeydown);
	}, [updateParagraph, words, cursor, incrementCursor, incrementErrors, gameState])

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<p
				className={`justify-start w-1/2 text-xl ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
				{timerInSec}s
			</p>
			<div className="relative w-1/2 h-fit">
				<p className="break-all text-xl w-full">
					{words.split("").map((char, i) => (
						<span key={i} id={`char-at-${i}`}
									className={`highlight text-gray-500 font-light ${gameState === GAMESTATES.TYPING && i === cursor && 'border-b-4 border-pink-500'}`}>
						{char}
					</span>
					))}
				</p>
				<p className="para-container text-xl w-full">
					{typed.split("").map((char, i) => (
						<span key={i} className={`blinker text-black font-bold`}>
						{char}
					</span>
					))}
				</p>
			</div>
			{
				gameState === GAMESTATES.COMPLETED && <ResultsModal/>
			}
			<button disabled={gameState === GAMESTATES.TYPING}
							className={`${gameState === GAMESTATES.IDLE ? 'bg-blue-500 text-white' : 'bg-slate-500 text-black'} px-6 py-2 rounded-lg mt-8`}
							onClick={startGame}>Start
			</button>
		</div>
	)
}

export default App
