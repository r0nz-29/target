import React, {useEffect} from 'react';
import {useState} from 'react';
import CustomModal from '../Modal/index.jsx'
import {useLocation, useNavigate} from "react-router";
import {useGlobalState} from "../../store/index.js";
import ProgressModal from "../Modal/ProgressModal.jsx";
import {socket} from "../../socketConfig.js";


const Home = () => {


	return (
		<>
			<section
				className="text-white body-font"
				style={{height: '100%', width: '100vw'}}
			>
				<div className="mx-auto flex px-12 md:flex-row flex-col items-center">
					<div
						className="lg:flex-grow md:w-1/2 lg:px-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
						<h1 className="title-font sm:text-4xl text-4xl mb-4 font-bold text-white">ROCKET TYPE
						</h1>
						<p className="mb-8 leading-relaxed">Welcome to Rocket Type, the ultimate web application for improving your
							typing speed and accuracy! Whether you're a beginner looking to learn touch typing or a seasoned typist
							aiming to reach new heights, Rocket Type has got you covered.</p>
						<div className="flex justify-center">
							<button
								onClick={() => navigate("/solo")}
								className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 hover:text-white rounded text-lg"
							>
								Practice Mode
							</button>
							<button
								onClick={() => props.setOpenModal('default')}
								className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-900 hover:text-white rounded text-lg">
								Multiplayer Mode
							</button>
						</div>
					</div>
				</div>
			</section>
			{
				openModal!=='undefined' && <CustomModal openModal={openModal} connected={connected} setOpenModal={setOpenModal}/>
			}
			{
				findingRoom && <ProgressModal title="Looking for lobbies..."/>
			}
		</>
	);
};

export default Home;
