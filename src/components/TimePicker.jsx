import {DURATIONS, useGlobalState} from "../store/index.js";

export default function TimePicker() {
	const {activeDuration, setActiveDuration} = useGlobalState();
	return (
		<div className="grid grid-cols-3 mb-6 justify-between items-center  py-1 px-2 text-sm text-white bg-zinc-500 rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border border-zinc-800">
			{DURATIONS.map(duration => (
				<div key={duration}
					className={`rounded-full cursor-pointer py-2 px-6  ${duration === activeDuration && 'text-white bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 rounded-full text-md font-medium'}`}
					onClick={() => setActiveDuration(duration)}
				>
					<p className='text-white'>{duration}s</p>
				</div>
			))}
		</div>
	)
}
