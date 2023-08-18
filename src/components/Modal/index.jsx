import React, {useState} from 'react';
import {socket} from "../../socketConfig.js";
import {useGlobalState} from "../../store/index.js";
import {AiOutlineClose} from "react-icons/ai"


const CustomModal = (props) => {
	const {setFindingRoom} = useGlobalState();
	const initialValue = {
		username: '',
		difficulty: '',
	};

	const [user, setUser] = useState(initialValue);

	const handleClose = () => {
		props.setOpenModal('undefined');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		socket.emit('join', user.difficulty);
		setFindingRoom(true);
		props.setOpenModal(undefined)
	};

	return (
		<div className="bg-black/[0.6] absolute top-0 w-screen h-screen flex justify-center items-center z-0">
			<div className="relative text-center p-4 bg-zinc-800 w-1/3 rounded-lg shadow dark:bg-gray-700 z-20 border border-zinc-700">
				<div className="cursor-pointer float-right text-red-500" onClick={() => handleClose()}>
					<AiOutlineClose/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className="text-xl text-center good-font text-white mb-6">
						Choose the level of difficulty
					</div>
					{
						props.connected ? (
							<div className="grid grid-cols-3 gap-4">
								<button className="good-font bg-green-400 border-2 border-green-700 rounded-lg p-2"
												onClick={() => setUser({...user, difficulty: 'easy'})}>
									Easy
								</button>
								<button className="good-font bg-yellow-400 border-2 border-yellow-700 rounded-lg p-2"
												onClick={() => setUser({...user, difficulty: 'medium'})}>
									Medium
								</button>
								<button className="good-font bg-red-400 border-2 border-red-700 rounded-lg p-2"
												onClick={() => setUser({...user, difficulty: 'hard'})}>
									Hard
								</button>
							</div>
						) : (
							<button
								disabled
								className="good-font text-zinc-400 bg-zinc-800 border border-zinc-700 rounded-full px-6 py-2 text-md font-medium">
								Please Wait...
							</button>
						)
					}
				</form>
				{/*				onClick={handleSubmit}>*/}
				{/*	{props.connected ? 'Next' : 'Please wait'}*/}
				{/*</button>*/}
			</div>
		</div>
	);
};

export default CustomModal;
