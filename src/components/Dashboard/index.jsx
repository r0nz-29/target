import {useEffect, useState} from "react";

export default function Dashboard() {
	const [history, setHistory] = useState([]);

	useEffect(() => {
		const _history = localStorage.getItem('_history');
		if (_history===null || _history===undefined) return;
		setHistory(JSON.parse(_history));
	}, [])

	return (
		<div className="container grid grid-cols-4 gap-4 p-8">
			{history.length===0 && <p>Empty</p>}
			{history.map(item => (
				<div className='p-4 border shadow rounded-lg'>
					<p className='flex justify-between'>
						<div>WPM</div>
						<div className='text-2xl font-bold'>{item.wpm.toFixed(2)}</div>
					</p>
					<p className='flex justify-between'>
						<div>Errors</div>
						<div className='text-red-500 font-bold'>{item.errors}</div>
					</p>
					<p className='flex justify-between'>
						<div>Accuracy</div>
						<div>{item.accuracy.toFixed(2)}%</div>
					</p>
					<p className='flex justify-between'>
						<div>Duration</div>
						<div>{item.duration}s</div>
					</p>
					<p className='flex justify-between items-center'>
						<div>Timestamp</div>
						<div>{new Date(item.timestamp).toLocaleTimeString()} <br/>{new Date(item.timestamp).toLocaleDateString()}</div>
					</p>
				</div>
			))}
		</div>
	)
}
