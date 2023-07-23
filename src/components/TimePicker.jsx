import {DURATIONS, useGlobalState} from "../store/index.js";

export default function TimePicker() {
	const {activeDuration, setActiveDuration} = useGlobalState();
	return (
		<div className="grid grid-cols-3">
			{DURATIONS.map(duration => (
				<div key={duration}
					className={`cursor-pointer p-2 px-4 ${duration === DURATIONS[2] && 'border-y border-r border-slate-300 rounded-r-lg'} ${duration === DURATIONS[0] && 'border-y border-l rounded-l-lg border-slate-300'} ${duration === activeDuration && 'bg-blue-100 border-blue-400'} ${duration === DURATIONS[1] && `border border-slate-300`}`}
					onClick={() => setActiveDuration(duration)}
				>
					<p className={`${duration === activeDuration && 'text-blue-500'}`}>{duration}s</p>
				</div>
			))}
		</div>
	)
}
