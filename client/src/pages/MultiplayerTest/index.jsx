import {
	GAMEMODES,
	GAMESTATES,
	MULTIPLAYER_GAME_DURATION,
	useGlobalState
} from "../../store/index.js";
import {Fragment, useEffect, useState} from "react";
import {socket} from "../../socketConfig.js";
import {useNavigate} from "react-router";
import useTimer from "../../common/useTimer.js";
import useTimout from "../../common/useTimeout.js";
import useGame from "../../common/useGame.js";
import useSync from "./useSync.js";

export default function MultiplayerTest() {
	const {
		roomName,
		waitingTimeout,
		lobbyParagraph: words,
		board,
	} = useGlobalState();
	const {gameState, cursor, typed, startGame, stopGame} = useGame(MULTIPLAYER_GAME_DURATION, GAMEMODES.MULTIPLAYER);
	const navigate = useNavigate();
	const {timeout} = useTimout(waitingTimeout);
	const {currentTime: currentGameTime} = useTimer(MULTIPLAYER_GAME_DURATION, GAMEMODES.MULTIPLAYER);
	const [showPara, setShowPara] = useState(false);

	useEffect(() => {
		if (timeout <= 0) {
			startGame();
		} else if (timeout === 10 && gameState !== GAMESTATES.TYPING) {
			setShowPara(true);
		}
	}, [timeout])

	useEffect(() => {
		if (currentGameTime <= 0) {
			stopGame();
			setShowPara(false);
		}
	}, [currentGameTime])

	useEffect(() => {
		if (roomName === '') {
			console.log("NULL room name, returning");
			navigate("/")
		}
	}, [roomName, navigate]);

	useSync();

	return (
		<div className={`w-full h-screen flex flex-col justify-start items-center transition-all text-white ${gameState===GAMESTATES.TYPING ? 'pt-8' : 'pt-40'}`}>
			{roomName !== '' && <p className="text-lg">Room Name: {roomName}</p>}
			<div className="grid grid-cols-3 items-center my-8">
				<p className='font-bold border border-zinc-800 bg-zinc-900 p-2'>username</p>
				<p className='font-bold border border-zinc-800 bg-zinc-900 p-2'>wpm</p>
				<p className='font-bold border border-zinc-800 bg-zinc-900 p-2'>progress</p>
				{board.map(user => {
					let progress = user.pos;
					progress = 100 * (progress / words.length);
					const winner = gameState===GAMESTATES.COMPLETED && user.username===board[0].username;
					return (
						<Fragment key={user.username}>
							<p className={`border border-zinc-800 bg-zinc-900 p-2 transition-all ${winner && 'text-xl font-bold border-blue-500'}`}>
								{socket.id === user.username ? "me" : user.username}
							</p>
							<p className={`border border-zinc-800 bg-zinc-900 p-2 transition-all ${winner && 'text-xl font-bold border-blue-500'}`}>
								{user.speed.toFixed(2)}
							</p>
							<div className={`border border-zinc-800 bg-zinc-900 h-full flex flex-col justify-center px-2 ${winner && 'border-blue-500'}`}>
								<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
									<div className="bg-blue-600 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
								</div>
							</div>
						</Fragment>
					)
				})}
			</div>
			<p className={`text-xl transition-all ${(gameState===GAMESTATES.TYPING || gameState===GAMESTATES.COMPLETED) ? 'opacity-0' : 'opacity-100'}`}>Game starts in: <span className="text-red-400">{timeout}s</span></p>
			<div className={`w-full h-screen flex flex-col items-center transition-all ${showPara ? 'opacity-100' : 'opacity-0'}`}>
				<p
					className={`justify-start w-1/2 text-xl transition-all mb-4 ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
					{currentGameTime}s
				</p>
				<div className={`relative w-1/2 h-fit`}>
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
			</div>
		</div>
	)
}
