import React, {useEffect, useState} from 'react';
import {Button, Modal, TextInput} from 'flowbite-react';
import {socket} from "../../socketConfig.js";
import {useGlobalState} from "../../store/index.js";


const CustomModal = (props) => {
	const {setFindingRoom} = useGlobalState();
	const initialValue = {
		username: '',
		difficulty: '',
	};

	const [user, setUser] = useState(initialValue);

	// const handleChange = (e) => {
	// 	setUser({...user, [e.target.name]: e.target.value});
	// };

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user);
		socket.emit('join', user.difficulty);
		setFindingRoom(true);
		props.setOpenModal(undefined)
	};

	return (
		<div className="bg-black/[0.6] absolute top-0 w-screen h-screen flex justify-center items-center" onClick={() => props.setOpenModal(undefined)}>
			<div className="text-center p-4 bg-white w-1/2 rounded-lg shadow dark:bg-gray-700">
				{/*<div className="mb-2 mt-5 text-lg font-normal text-gray-500 dark:text-gray-400">*/}
				{/*	Enter Username*/}
				{/*</div>*/}
				<form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
					{/*<div>*/}
					{/*	<TextInput*/}
					{/*		name="username"*/}
					{/*		type="text"*/}
					{/*		placeholder="optional"*/}
					{/*		onChange={handleChange}*/}
					{/*	/>*/}
					{/*</div>*/}
					<div className="flex flex-col justify-center gap-4">
						<div className="mb-2 mt-5 text-xl font-normal text-gray-500 dark:text-gray-400">
							Choose the level of difficulty
						</div>
						<div className="flex flex-r mx-auto gap-4 ">
							<Button onClick={() => setUser({...user, difficulty: 'easy'})}>
								Easy
							</Button>
							<Button className="bg-orange-700" onClick={() => setUser({...user, difficulty: 'medium'})}>
								Medium
							</Button>
							<Button color="failure" onClick={() => setUser({...user, difficulty: 'hard'})}>
								Hard
							</Button>
						</div>
					</div>
				</form>
				<Button disabled={!props.connected} color="gray" className="mx-auto mt-4" type="submit" onClick={handleSubmit}>
					{props.connected ? 'Next' : 'Please wait'}
				</Button>
			</div>
		</div>
	);
};

export default CustomModal;
