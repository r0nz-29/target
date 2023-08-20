import React from 'react'
import {useState} from 'react'
import {API} from '../../services/api';
import {useNavigate} from 'react-router';
import Login from './Login';
import SignUp from './SignUp';
import {useGlobalState} from "../../store/index.js";
import LottieModal from "../Modal/LottieModal.jsx";
import authAnimation from "../../assets/auth_animation.json";

const signupInitialVlaue = {
	email: '',
	username: '',
	password: ''
}


const loginInitialVlaue = {
	username: '',
	password: ''
}


const Toggleaccount = () => {

	const {setAccount, accessToken, setAccessToken} = useGlobalState();
	const [account, toggleaccount] = useState('login');
	const [signup, setSignup] = useState(signupInitialVlaue);
	const [login, setLogin] = useState(loginInitialVlaue);
	const [error, setError] = useState('');
	const [processing, setProcessing] = useState(false);

	const navigate = useNavigate();

	const toggle = () => {
		account === 'signup' ? toggleaccount('login') : toggleaccount('signup');
	}

	const onInputChange = (e) => {
		setSignup({...signup, [e.target.name]: e.target.value});
	}


	const onValueChange = (e) => {
		setLogin({...login, [e.target.name]: e.target.value});
	}


	const signupUser = async () => {
		setProcessing(true);
		try {
			let response = await API.userSignup(signup);
			if (response.isSuccess) {
				setSignup(signupInitialVlaue);
				toggleaccount('login');
			}
		} catch (e) {
			setError('Something went wrong please try again!' + e);
		} finally {
			setProcessing(false);
		}
	}

	const loginUser = async () => {
		setProcessing(true);
		try {
			let response = await API.userLogin(login);
			if (response.data.msg !== null) {
				console.log(response.data.data.accessToken);
				setAccessToken(response.data.data.accessToken);
				localStorage.setItem('accessToken', `Bearer ${response.data.data.accessToken}`);
				localStorage.setItem('refreshToken', `Bearer ${response.data.data.refreshToken}`);
				localStorage.setItem('_rocket_type_user', JSON.stringify({
					email: response.data.data.email,
					username: response.data.data.username
				}));
				setAccount({email: response.data.data.email, username: response.data.data.username});
				setError('');
				navigate('/');
			}
		} catch (e) {
			setError('Something went wrong please try again!' + e);
		} finally {
			setProcessing(false);
		}
	}


	return (
		<div>
			{account === 'login' ? (
				<Login
					onValueChange={onValueChange}
					login={login}
					error={error}
					loginUser={loginUser}
					toggle={toggle}
				/>
			) : (
				<SignUp
					onInputChange={onInputChange}
					signupUser={signupUser}
					error={error}
					toggle={toggle}
				/>
			)
			}
			{processing && (
				<div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
					<LottieModal animation={authAnimation} />
				</div>
			)}
		</div>
	)
}

export default Toggleaccount
