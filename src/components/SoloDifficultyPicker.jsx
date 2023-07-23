import {DIFFICULTIES, useGlobalState} from "../store/index.js";
import {useEffect} from "react";
import {dataset} from "../constants/data.jsx";

export default function SoloDifficultyPicker() {
	const {soloDifficulty, setSoloDifficulty, setSoloPara} = useGlobalState();

	useEffect(() => {
		const para = dataset[soloDifficulty][0];
		setSoloPara(para);
	}, [soloDifficulty])

	return (
		<div className="grid grid-cols-3">
			{Object.keys(DIFFICULTIES).map(diff => (
				<div key={diff}
						 className={`cursor-pointer p-2 px-4 ${diff === "HARD" && 'border-y border-r border-slate-300 rounded-r-lg'} ${diff === "EASY" && 'border-y border-l rounded-l-lg border-slate-300'} ${DIFFICULTIES[diff] === soloDifficulty && 'bg-blue-100 border-blue-400'} ${diff === "MEDIUM" && `border border-slate-300`}`}
						 onClick={() => setSoloDifficulty(DIFFICULTIES[diff])}
				>
					<p className={`${DIFFICULTIES[diff] === soloDifficulty && 'text-blue-500'}`}>{diff}</p>
				</div>
			))}
		</div>
	)
}
