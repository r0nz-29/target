import {GAMEMODES, GAMESTATES, SOLO_GAME_DURATION, useGlobalState} from "../../store/index.js";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {socket} from "../../socketConfig.js";
import {useNavigate} from "react-router";
import useTimer from "../../common/useTimer.js";
import useTimout from "../../common/useTimeout.js";
import useGame from "../../common/useGame.js";

export default function MultiplayerTest() {
	const {
		roomName,
		roomMembers,
		setRoomMembers,
		waitingTimeout,
		originalParagraph: words,
	} = useGlobalState();
	const {gameState, cursor, typed, startGame, stopGame} = useGame(SOLO_GAME_DURATION, GAMEMODES.MULTIPLAYER);
	const navigate = useNavigate();
	const {timeout} = useTimout(waitingTimeout);
	const {currentTime: currentGameTime} = useTimer(SOLO_GAME_DURATION);
	const [start, setStart] = useState(false);
	const [showPara, setShowPara] = useState(false);

	useEffect(() => {
		if (timeout <= 0) {
			setStart(true);
			startGame();
		} else if (timeout === 10) {
			setShowPara(true);
		}
	}, [timeout])

	useEffect(() => {
		if (currentGameTime <= 0) {
			stopGame();
		}
	}, [currentGameTime])

	useEffect(() => {
		if (roomName === '') {
			console.log("NULL room name, returning");
			navigate("/")
		}
	}, [roomName, navigate]);

	useEffect(() => {
		function onUpdate(payload) {
			// {username: {speed, pos, over}}
			setRoomMembers(payload);
		}

		socket.on('update', onUpdate);
	}, [])

	return (
		<div className="w-full h-screen flex flex-col justify-start items-center pt-8">
			{roomName !== '' && <p className="text-lg">Room Name: {roomName}</p>}
			<div className="grid grid-cols-2">
				<p className='font-bold border p-2'>username</p><p className='font-bold border p-2'>wpm</p>
				{Object.keys(roomMembers).map(username => {
					console.log(roomMembers[username])
					return (
						<Fragment key={username}>
							<p className='border p-2'>
								{socket.id === username ? "me" : username}
							</p>
							<p className='border p-2'>
								{roomMembers[username]?.speed.toFixed(2)}
							</p>
						</Fragment>
					)
				})}
			</div>
			{
				!start && <p className="text-xl">Game starts in: <span className="text-red-400">{timeout}s</span></p>
			}
			{
				showPara && (
					<div className="w-full h-screen flex flex-col items-center">
						<p
							className={`justify-start w-1/2 text-xl ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
							{currentGameTime}s
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
					</div>
				)
			}
		</div>
	)
}
