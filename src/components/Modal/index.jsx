import React, { useState } from 'react';
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
		<div className="bg-black/[0.6] absolute top-0 w-screen h-screen flex justify-center items-center">
			<div className="relative text-center p-4 bg-white w-1/3 rounded-lg shadow dark:bg-gray-700">
				<div
				className="absolute top-2 right-2 border-2 rounded cursor-pointer text-gray-500 hover:text-gray-700"
				onClick={() =>  handleClose()}
				>
				<AiOutlineClose/>
				</div>
				<form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
					<div className="flex flex-col justify-center gap-4">
						<div className="mb-2 mt-5 text-xl text-gray-500 ">
							Choose the level of difficulty
						</div>
						<div className="flex flex-r mx-auto gap-4 ">
							<button className="bg-green-400 border-2 rounded-md p-2" onClick={() => setUser({...user, difficulty: 'easy'})}>
								Easy
							</button>
							<button className="bg-yellow-400 border-2 rounded-md p-2" onClick={() => setUser({...user, difficulty: 'medium'})}>
								Medium
							</button>
							<button className="bg-red-600 border-2 rounded-md p-2" onClick={() => setUser({...user, difficulty: 'hard'})}>
								Hard
							</button>
						</div>
					</div>
				</form>
				<button disabled={!props.connected} className="border-2 rounded-md p-2 mx-auto mt-4" type="submit" onClick={handleSubmit}>
					{props.connected ? 'Next' : 'Please wait'}
				</button>
			</div>
		</div>
	);
};

export default CustomModal;
