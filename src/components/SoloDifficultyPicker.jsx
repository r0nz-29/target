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
		<div className="grid grid-cols-3 justify-between items-center  py-1 px-2 text-sm text-white bg-zinc-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-zinc-800">
			{Object.keys(DIFFICULTIES).map(diff => (
				<div key={diff}
						 className={`rounded-full cursor-pointer py-2 px-6 ${DIFFICULTIES[diff] === soloDifficulty && 'text-white bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 rounded-full text-md font-medium'}`}
						 onClick={() => setSoloDifficulty(DIFFICULTIES[diff])}
				>
					<p className='text-white text-center'>{diff}</p>
				</div>
			))}
		</div>
	)
}
