// eslint-disable-next-line react/prop-types
import {useGlobalState} from "../../store/index.js";
import {calculateWPM} from "../../utils/index.js";
import {useEffect, useState} from "react";
import axios from "axios";

export default function ResultsModal({duration}) {
	const {
		errors,
		typedParagraph,
		accessToken, account
	} = useGlobalState();
	const [result, setResult] = useState({
		wpm: 0,
		accuracy: '',
		mode: 'solo',
		errors: 0,
		duration: 0,
	});

	useEffect(() => {
		const wpm = calculateWPM(typedParagraph, errors, duration);
		const accuracy = 100 * ((typedParagraph.length - errors) / typedParagraph.length)
		setResult({
			wpm, accuracy, mode: 'solo', errors, duration,
		});

		if (accessToken === null) {
			let history = localStorage.getItem('_history');
			if (history === null || history === undefined) history = [];
			else history = JSON.parse(history);
			history.push({
				wpm, accuracy, mode: 'solo', errors, duration, timestamp: Date.now()
			});
			localStorage.setItem('_history', JSON.stringify(history));
		} else {
			const username = account.username;
			const item = Date.now();
			const history = {
				wpm,
				accuracy,
				mode: 'solo',
				errors, duration,
				timestamp: `${new Date(item).toLocaleTimeString()}\n ${new Date(item).toLocaleDateString()}`};
			axios
				.post("http://localhost:3000/user/saveHistory", {username, history})
				.then(({data}) => {
					console.log(data);
				})
		}
	}, [])

	return (
		<div className="bg-black/[0.6] absolute w-screen h-screen flex justify-center items-center">
			<div className="p-4 bg-white w-1/3 rounded-lg shadow dark:bg-gray-700">
				{/*<VictoryChart*/}
				{/*	theme={VictoryTheme.material}*/}
				{/*>*/}
				{/*	<VictoryLine*/}
				{/*		style={{*/}
				{/*			data: {stroke: "#3f83f8"},*/}
				{/*			parent: {border: "1px solid #ccc"}*/}
				{/*		}}*/}
				{/*		data={graph}*/}
				{/*		interpolation="natural" label="chappal"/>*/}
				{/*	<VictoryScatter*/}
				{/*		style={{data: {fill: "#f00"}}}*/}
				{/*		size={3}*/}
				{/*		data={errorPoints}*/}
				{/*		symbol='triangleDown'*/}
				{/*	/>*/}
				{/*</VictoryChart>*/}
				<p>Accuracy: <span className="text-2xl">{result.accuracy > 0 ? result.accuracy.toFixed(2) : 0}%</span></p>
				<p>Words per minute: <span className="text-2xl">{result.wpm.toFixed(2)}</span></p>
				<br/>
				<button className="px-6 py-2 bg-blue-500 rounded-lg text-white"
								onClick={() => window.location.reload()}>Restart
				</button>
			</div>
		</div>
	)
}
