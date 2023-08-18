import {useGlobalState} from "../../store/index.js";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import {socket} from "../../socketConfig.js";
import CustomModal from "../../components/Modal/index.jsx";
import ProgressModal from "../../components/Modal/ProgressModal.jsx";

export default function Home() {
	const {findingRoom, setWaitingTimeout, setFindingRoom, setLobbyPara, setRoomName, setRoomMembers, setBoard} = useGlobalState();
	const [openModal, setOpenModal] = useState('undefined');
	const props = {openModal, setOpenModal};
	// const backgroundImageUrl = 'url(./Header.svg)';
	// const backgroundSize = 'cover';
	const navigate = useNavigate();
	const [connected, setConnected] = useState(false);
	const { pathname } = useLocation();

	useEffect(() => {
		function onConnect() {
			setConnected(true);
			console.log('connected!')
		}

		function onDisconnect() {
			setConnected(false);
			console.log('disconnected!')
		}

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
	}, [pathname]);

	useEffect(() => {
		function onNewMember(payload) {
			console.log(payload);
			const {lobbie_id, participants, time, para} = payload;
			setLobbyPara(para);
			setRoomName(lobbie_id);
			const parts = {};
			const board = [];
			for (const p of participants) {
				parts[p] = {speed: 0, pos: 0, over: false, errors: 0, accuracy: 0};
				board.push({username: p, speed: 0, pos: 0, over: false, errors: 0, accuracy: 0})
			}
			setBoard(board);
			setRoomMembers(parts);
			setFindingRoom(false);
			setWaitingTimeout(time);
			navigate('/multiplayer')
		}

		socket.on('new_member', onNewMember)
		return () => {
		};
	}, []);

	return (
		<div className="flex flex-col justify-center items-center container h-full">
			<p className="good-font text-white font-black text-6xl mb-2">Improve your typing with</p>
			<p
				className="good-font font-black text-6xl pb-2 bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 bg-clip-text text-transparent">Rocket
				Type</p>
			<p className="good-font text-[#d1d5db] text-lg text-center mx-auto my-8">Welcome to Rocket Type, the ultimate web
				application for improving your typing speed and accuracy! <br/>Whether you're a beginner looking to learn touch
				typing or a seasoned typist aiming to reach new heights<br/> we've got you covered.</p>
			<div className="grid grid-cols-2 gap-4">
				<button
					onClick={() => navigate("/solo")}
					className="good-font text-white bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 rounded-full px-6 py-2 text-md font-medium">
					Solo Mode
				</button>
				<button
					onClick={() => props.setOpenModal('default')}
					className="good-font text-white hover:text-gray-200 bg-zinc-800 border border-zinc-700 rounded-full px-6 py-2 text-md font-medium">
					Multiplayer
				</button>
			</div>
			{
				openModal!=='undefined' && <CustomModal openModal={openModal} connected={connected} setOpenModal={setOpenModal}/>
			}
			{
				findingRoom && <ProgressModal title="Looking for lobbies..."/>
			}
		</div>
	)
}
