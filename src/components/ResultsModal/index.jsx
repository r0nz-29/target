// eslint-disable-next-line react/prop-types
import {useGlobalState} from "../../store/index.js";
import {calculateWPM} from "../../utils/index.js";

export default function ResultsModal() {
	const {
		errors,
		typedParagraph,
	} = useGlobalState();

	const wpm = calculateWPM(typedParagraph, errors, 15);
	const accuracy = 100 * ((typedParagraph.length - errors) / typedParagraph.length)
	return (
		<div className="bg-black/[0.6] absolute w-screen h-screen flex justify-center items-center">
			<div className="p-4 bg-white w-1/4 rounded-lg shadow dark:bg-gray-700">
				<p>Accuracy: <span className="text-2xl">{accuracy.toFixed(2)}%</span></p>
				<p>Words per minute: <span className="text-2xl">{wpm.toFixed(2)}</span></p>
				<br/>
				<button className="px-6 py-2 bg-blue-500 rounded-lg text-white" onClick={() => window.location.reload()}>Restart</button>
			</div>
		</div>
	)
}
