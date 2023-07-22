// eslint-disable-next-line react/prop-types
import {useGlobalState} from "../../store/index.js";
import {calculateWPM} from "../../utils/index.js";
import {VictoryChart, VictoryLine, VictoryScatter, VictoryTheme} from "victory";
import {useEffect, useState} from "react";

export default function ResultsModal({duration}) {
	const {
		errors,
		typedParagraph,
		graph,
		errorPoints
	} = useGlobalState();
	const [result, setResult] = useState({
		wpm: '',
		accuracy: '',
		mode: 'solo',
		errors: 0,
		duration: 0,
	});

	useEffect(() => {
		
	}, [])

	const wpm = calculateWPM(typedParagraph, errors, duration);
	const accuracy = 100 * ((typedParagraph.length - errors) / typedParagraph.length)
	console.log(graph);
	console.log(errorPoints);
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
				<p>Accuracy: <span className="text-2xl">{accuracy > 0 ? accuracy.toFixed(2) : 0}%</span></p>
				<p>Words per minute: <span className="text-2xl">{wpm.toFixed(2)}</span></p>
				<br/>
				<button className="px-6 py-2 bg-blue-500 rounded-lg text-white"
								onClick={() => window.location.reload()}>Restart
				</button>
			</div>
		</div>
	)
}
