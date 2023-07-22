import {GAMEMODES, GAMESTATES, SOLO_GAME_DURATION, useGlobalState} from "../../store/index.js";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {socket} from "../../socketConfig.js";
import {useNavigate} from "react-router";
import useTimer from "../../common/useTimer.js";
import useTimout from "../../common/useTimeout.js";
import useGame from "../../common/useGame.js";
import {getArrayFromMap} from "../../utils/index.js";

export default function MultiplayerTest() {
	const {
		roomName,
		roomMembers,
		setRoomMembers,
		waitingTimeout,
		lobbyParagraph: words,
		board,
		setBoard
	} = useGlobalState();
	const {gameState, cursor, typed, startGame, stopGame} = useGame(30, GAMEMODES.MULTIPLAYER);
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
			setShowPara(false);
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
			const newBoard = getArrayFromMap(payload);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(payload);
		}

		function onLeave(payload) {
			delete roomMembers[payload];
			console.log(roomMembers);
			const newBoard = getArrayFromMap(roomMembers);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(roomMembers);
		}

		function onOver(payload) {
			console.log('over payload')
			const newBoard = getArrayFromMap(payload);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(payload);
		}

		socket.on('update', onUpdate);
		socket.on('leave', onLeave);
		socket.on('over', onOver);
	}, [])

	return (
		<div className={`w-full h-screen flex flex-col justify-start items-center transition-all ${gameState===GAMESTATES.TYPING ? 'pt-8' : 'pt-40'}`}>
			{roomName !== '' && <p className="text-lg">Room Name: {roomName}</p>}
			<div className="grid grid-cols-3 items-center my-8">
				<p className='font-bold border p-2'>username</p>
				<p className='font-bold border p-2'>wpm</p>
				<p className='font-bold border p-2'>progress</p>
				{board.map(user => {
					let progress = user.pos;
					progress = 100 * (progress / words.length);
					const winner = gameState===GAMESTATES.COMPLETED && user.username===board[0].username;
					return (
						<Fragment key={user.username}>
							<p className={`border p-2 transition-all ${winner && 'text-xl font-bold border-blue-500'}`}>
								{socket.id === user.username ? "me" : user.username}
							</p>
							<p className={`border p-2 transition-all ${winner && 'text-xl font-bold border-blue-500'}`}>
								{user.speed.toFixed(2)}
							</p>
							<div className={`border h-full flex flex-col justify-center px-2 ${winner && 'border-blue-500'}`}>
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
					className={`justify-start w-1/2 text-xl transition-all ${gameState === GAMESTATES.TYPING ? 'text-yellow-300' : 'text-[#333]'}`}>
					{currentGameTime}s
				</p>
				<div className={`relative w-1/2 h-fit`}>
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
		</div>
	)
}
