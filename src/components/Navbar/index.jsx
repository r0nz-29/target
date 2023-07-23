import {useEffect, useState} from "react";
import styles from './index.module.css';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {useNavigate} from "react-router";
import { FaUserCircle } from "react-icons/fa"
import {useGlobalState} from "../../store/index.js";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate()
	const {accessToken, setAccessToken, setAccount} = useGlobalState();

	const removeToken = () => {
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('accessToken');
		localStorage.removeItem('_rocket_type_user');
		setAccessToken(null);
	}

	useEffect(()=>{
		const loadToken = () => {
			const tokenFromLocal = localStorage.getItem('accessToken');

			if (tokenFromLocal!==null && tokenFromLocal.length > 0) {
				setAccessToken(tokenFromLocal);
				const user = JSON.parse(localStorage.getItem('_rocket_type_user'))
				setAccount(user);
			}
		}

		loadToken()
	},[accessToken, setAccessToken])

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};


	return (
		<nav className="bg-primary sticky">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center justify-between w-full cursor-pointer">
						<div className="flex items-center justify-start gap-x-2" onClick={() => navigate('/')}>
							<img src="./logo.svg" alt="#" height={40} width={40}/>
							<p className='text-2xl font-bold'>Rocket Type</p>
						</div>
						<p className="text-lg cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</p>
					</div>
					{
						accessToken === null ? (
							<button
								onClick={() => navigate("/login")}
								className="text-white bg-indigo-900 block mx-2 px-3 py-2 rounded-md font-medium">
								SignIn
							</button>
						) : (
							<button onClick={() => {
								removeToken();
								navigate("/login");
							}} className="text-white bg-indigo-900 block mx-2 px-3 py-2 rounded-md font-medium">
									Logout
								{/*<FaUserCircle/>*/}
							</button>
						)
					}
					<div className="mr-2 flex md:hidden justify-end">
						<button
							onClick={() => toggleMenu()}
							type="button"
							className={styles.butt_menu}
							aria-expanded="false"
						>
							<AiOutlineMenu className={`${isOpen ? 'hidden' : 'block'}`}/>
							<AiOutlineClose className={`${isOpen ? 'block' : 'hidden'}`}/>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
