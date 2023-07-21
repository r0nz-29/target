import {GAMEMODES, GAMESTATES, SPECIAL_KEYS, useGlobalState} from "../store/index.js";
import {useCallback, useEffect, useState} from "react";
import {calculateWPM} from "../utils/index.js";
import useTimer from "./useTimer.js";
import {socket} from "../socketConfig.js";

export default function useGame(duration, mode = GAMEMODES.SOLO) {
	const {currentTime} = useTimer(duration);
	const {
		originalParagraph: words,
		typedParagraph: typed,
		cursorPosition: cursor,
		errors,
		gameState,
		updateGraph,
		updateErrorPoints,
		incrementCursor,
		incrementErrors,
		updateTypedParagraph: updateParagraph,
		updateGameState
	} = useGlobalState(state => state);
	const [liveWpm, setLiveWpm] = useState(0);

	function startGame() {
		console.log("starting game");
		updateGameState(GAMESTATES.TYPING);
	}

	function stopGame() {
		console.log("stopping game");
		updateGameState(GAMESTATES.COMPLETED);
	}

	useEffect(() => {
		if (gameState===GAMESTATES.COMPLETED && mode===GAMEMODES.MULTIPLAYER) {
			const acc = 100 * ((typed.length - errors) / typed.length);
			const wpm = calculateWPM(typed, errors, duration - currentTime);
			socket.emit('new_wpm', {
				speed: wpm,
				pos: cursor,
				over: true,
				errors: errors,
				accuracy: acc > 0 ? acc : 0
			})
			console.log("sent")
		}
	}, [gameState])

	useEffect(() => {
		if (cursor === words.length) {
			updateGameState(GAMESTATES.COMPLETED);
		}
	}, [cursor, updateGameState, words, words.length])

	const handleKeydown = useCallback((e) => {
		if (gameState === GAMESTATES.IDLE || gameState === GAMESTATES.COMPLETED || SPECIAL_KEYS.has(e.key)) return;

		if (e.key !== words[cursor]) {
			const char = document.getElementById(`char-at-${cursor}`);
			char.style.color = "#f00"
			char.style.fontWeight = "bold"
			const wpm = calculateWPM(typed, errors, duration - currentTime);
			updateErrorPoints({x: duration - currentTime, y: wpm > 0 ? wpm : 0})
			incrementErrors()
			return;
		}

		if (e.key === ' ' && currentTime !== duration) {
			const wpm = calculateWPM(typed, errors, duration - currentTime);
			if (mode === GAMEMODES.MULTIPLAYER) {
				const acc = 100 * ((typed.length - errors) / typed.length);
				socket.emit('new_wpm', {
					speed: wpm,
					pos: cursor,
					over: false,
					errors: errors,
					accuracy: acc > 0 ? acc : 0
				})
			}
			else {
				setLiveWpm(wpm);
			}
			// updateGraph({y: wpm > 0 ? wpm : 0, x: duration - currentTime});
		}

		updateParagraph(e.key);
		incrementCursor();
	}, [gameState, words, cursor, incrementErrors])

	useEffect(() => {
		if (gameState === GAMESTATES.IDLE) return;

		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, [gameState, handleKeydown])

	return {
		gameState,
		cursor,
		typed,
		currentTime,
		startGame,
		stopGame,
		liveWpm,
		errors
	}
}
