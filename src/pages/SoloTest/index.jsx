import {GAMESTATES, SOLO_GAME_DURATION, useGlobalState} from "../../store/index.js";
import ResultsModal from "../../components/ResultsModal/index.jsx";
import useGame from "../../common/useGame.js";

export default function SoloTest() {
	const {gameState, currentTime, cursor, typed, startGame, liveWpm, errors} = useGame(SOLO_GAME_DURATION);
	const {originalParagraph: words} = useGlobalState();

	return (
		<div className="w-full h-screen flex flex-col justify-center items-center">
			<p>current wpm: {liveWpm.toFixed(2)}, errors: <span className="text-red-400">{errors}</span></p>
			<p
				className={`justify-start w-1/2 text-xl ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
				{currentTime}s
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
				gameState === GAMESTATES.COMPLETED && <ResultsModal duration={SOLO_GAME_DURATION}/>
			}
			<button disabled={gameState === GAMESTATES.TYPING}
							className={`${gameState === GAMESTATES.IDLE ? 'bg-blue-500 text-white' : 'bg-slate-500 text-black'} px-6 py-2 rounded-lg mt-8`}
							onClick={startGame}>Start
			</button>
		</div>
	)
}
