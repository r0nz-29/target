import {useEffect} from "react";
import {getArrayFromMap} from "../../utils/index.js";
import {socket} from "../../socketConfig.js";
import {useGlobalState} from "../../store/index.js";

export default function useSync() {
	const {roomMembers, setRoomMembers, setBoard} = useGlobalState();

	useEffect(() => {
		function onUpdate(payload) {
			// {username: {speed, pos, over}}
			const newBoard = getArrayFromMap(payload);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(payload);
		}

		function onLeave(payload) {
			delete roomMembers[payload];
			console.log(roomMembers);
			const newBoard = getArrayFromMap(roomMembers);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(roomMembers);
		}

		function onOver(payload) {
			console.log('over payload')
			const newBoard = getArrayFromMap(payload);
			newBoard.sort((a, b) => b.speed - a.speed);
			setBoard(newBoard);
			setRoomMembers(payload);
		}

		socket.on('update', onUpdate);
		socket.on('leave', onLeave);
		socket.on('over', onOver);
	}, [])
}
