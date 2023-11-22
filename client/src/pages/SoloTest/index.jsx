import {GAMESTATES, useGlobalState} from "../../store/index.js";
import ResultsModal from "../../components/ResultsModal/index.jsx";
import useGame from "../../common/useGame.js";
import TimePicker from "../../components/TimePicker.jsx";
import {useEffect} from "react";
import SoloDifficultyPicker from "../../components/SoloDifficultyPicker.jsx";

export default function SoloTest() {
	const {soloParagraph: words, activeDuration} = useGlobalState();
	const {gameState, currentTime, cursor, typed, startGame, liveWpm, errors} = useGame(activeDuration);

	return (
		<div className="w-full h-screen flex flex-col justify-start items-center">
			<div
				className={`transition-all ease-out delay-75 ${gameState === GAMESTATES.TYPING ? 'my-0' : 'my-32'} mb-2 ${gameState === GAMESTATES.TYPING ? 'opacity-0' : 'opacity-100'}`}>
				<TimePicker/>
			</div>
			<div className={`mb-16 mt-2 transition-all ${gameState === GAMESTATES.TYPING ? 'opacity-0' : 'opacity-100'}`}>
				<SoloDifficultyPicker/>
			</div>
			<p className={`transition-all ease-out text-white ${gameState === GAMESTATES.TYPING ? 'text-2xl' : ''}`}>current
				wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span></p>
			<p
				className={`justify-start w-1/2 text-xl mb-4 ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
				{currentTime}s
			</p>
			<div className="relative w-1/2 h-fit">
				<p className="break-all text-xl w-full p-4 border border-zinc-800 rounded-lg bg-black">
					{words.split("").map((char, i) => (
						<span key={i} id={`char-at-${i}`}
									className={`highlight text-gray-500 font-light ${gameState === GAMESTATES.TYPING && i === cursor && 'border-b-4 border-pink-500'}`}>
						{char}
					</span>
					))}
				</p>
				<p className="para-container text-xl w-full p-4 border border-zinc-800 rounded-lg">
					{typed.split("").map((char, i) => (
						<span key={i} className={`blinker text-white font-bold`}>
						{char}
					</span>
					))}
				</p>
			</div>
			{
				gameState === GAMESTATES.COMPLETED && <ResultsModal duration={activeDuration}/>
			}
			<button disabled={gameState === GAMESTATES.TYPING}
							className={`transition-all good-font text-white ${gameState === GAMESTATES.IDLE ? 'opacity-100 bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400' : 'opacity-0 hover:text-gray-200 bg-zinc-800 border border-zinc-700'} rounded-full px-6 py-2 text-md font-medium mt-8`}
							onClick={startGame}>Start
			</button>
		</div>
	)
}
