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
	const [connected, setConnected] = useState(false);

	const [user, setUser] = useState(initialValue);

	const handleChange = (e) => {
		setUser({...user, [e.target.name]: e.target.value});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(user.difficulty);
		socket.emit('join', user.difficulty);
		setFindingRoom(true);
		props.setOpenModal(undefined)
	};

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
	}, []);

	return (
		<div>
			<Modal
				className="bg-indigo-900"
				show={props.openModal === 'default'}
				size="lg"
				popup
				onClose={() => props.setOpenModal(undefined)}
			>
				<Modal.Header/>
				<Modal.Body>
					<div className="text-center">
						{/*<div className="mb-2 mt-5 text-xl font-normal text-gray-500 dark:text-gray-400">*/}
						{/*	Enter Username*/}
						{/*</div>*/}
						<form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
							{/*<div>*/}
							{/*	<TextInput*/}
							{/*		name="username"*/}
							{/*		required*/}
							{/*		type="text"*/}
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
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={!connected} color="gray" className="mx-auto mt-4" type="submit" onClick={handleSubmit}>
						{connected ? 'Next' : 'Please wait'}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default CustomModal;
