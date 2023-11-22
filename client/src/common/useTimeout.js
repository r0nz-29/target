import {useEffect, useState} from "react";

export default function useTimout(duration) {
	const [timerInSec, setTimerInSec] = useState(duration);

	useEffect(() => {
		let i = duration;
		const interval = setInterval(function () {
			if (i <= 0) {
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
	}, [])

	return {timeout: timerInSec};
}
