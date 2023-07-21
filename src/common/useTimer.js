import {useEffect, useState} from "react";
import {GAMESTATES, useGlobalState} from "../store/index.js";

export default function useTimer(duration) {
	const {activeDuration} = useGlobalState()
	const [timerInSec, setTimerInSec] = useState(duration);
	const {gameState, updateGameState} = useGlobalState();

	useEffect(() => {
		setTimerInSec(activeDuration)
	}, [activeDuration])

	useEffect(() => {
		if (gameState === GAMESTATES.IDLE || gameState === GAMESTATES.COMPLETED) return;

		let i = duration;
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

	return {currentTime: timerInSec};
}
