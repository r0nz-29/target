import {useEffect, useState} from "react";
import {useGlobalState} from "../../store/index.js";
import axios from "axios";

export default function Dashboard() {
	const [history, setHistory] = useState([]);
	const [cloudHistory, setCloudHistory] = useState([]);
	const {accessToken, account} = useGlobalState();

	useEffect(() => {
		if (accessToken === null) {
			const _history = localStorage.getItem('_history');
			if (_history === null || _history === undefined) return;
			setHistory(JSON.parse(_history));
			return;
		}

		axios
			.get("https://rocket-type-backend.onrender.com/user/userHistory?username=" + account.username)
			.then(({data}) => {
				const userdata = data.data;
				console.log(userdata);
				setCloudHistory(userdata.gameHistory);
			})
	}, [accessToken])

	return (
		<div className="container p-8 border">
			<div>
				{
					accessToken !== null && (
						<div className="grid grid-cols-2 w-fit mb-8">
							<p>Username: </p><p>{account.username}</p>
							<p>Email: </p> <p>{account.email}</p>
						</div>
					)
				}
			</div>
			<div className="grid grid-cols-4 gap-4">
				{accessToken === null && history.length === 0 && <p>Empty</p>}
				{accessToken === null && history.map(item => <HistoryCard item={item} key={item.wpm}/>)}
				{accessToken !== null && cloudHistory.map(item => <HistoryCard item={item} key={item.wpm}/>)}
			</div>
		</div>
	)
}

function HistoryCard({item}) {
	return (
		<div className='p-4 border shadow rounded-lg' key={item.timestamp}>
			<p className='flex justify-between'>
				<div>WPM</div>
				<div className='text-2xl font-bold'>{item.wpm.toFixed(2)}</div>
			</p>
			<p className='flex justify-between'>
				<div>Errors</div>
				<div className='text-red-500 font-bold'>{item.errors ? item.errors : item.errorCount}</div>
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
				<div>{new Date(item.timestamp).toLocaleTimeString()} <br/>{new Date(item.timestamp).toLocaleDateString()}
				</div>
			</p>
		</div>
	)
}
