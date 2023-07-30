import React from 'react'
import { useState} from 'react'
import { API } from '../../services/api';
import { useNavigate } from 'react-router';
import Login from './Login';
import SignUp from './SignUp';
import {useGlobalState} from "../../store/index.js";


const signupInitialVlaue = {
  email:'',
  username:'',
  password:''
}


const loginInitialVlaue = {
  username:'',
  password:''
}


const Toggleaccount = () => {

  const {setAccount, accessToken, setAccessToken} = useGlobalState();
  const[account,toggleaccount] = useState('login');
  const[signup,setSignup]= useState(signupInitialVlaue);
  const[login,setLogin]= useState(loginInitialVlaue);
  const[error,setError] = useState('');

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


  const signupUser = async() => {
    let response = await API.userSignup(signup);
    if(response.isSuccess){
      setSignup(signupInitialVlaue);
      toggleaccount('login');
    }else if(response.isFailure){
      setError('Something went wrong please try again!')
    }
  }

  const loginUser = async() => {
    let response = await API.userLogin(login);
    if(response.data.msg !== null){
      console.log(response.data.data.accessToken);
      setAccessToken(response.data.data.accessToken);
      localStorage.setItem('accessToken', `Bearer ${response.data.data.accessToken}`);
      localStorage.setItem('refreshToken', `Bearer ${response.data.data.refreshToken}`);
      localStorage.setItem('_rocket_type_user', JSON.stringify({ email: response.data.data.email, username: response.data.data.username }));
      setAccount({ email: response.data.data.email, username: response.data.data.username });
      setError('');
      navigate('/');
    }else
    {
      setError('Something went wrong please try again!')
    }
  }


  return (
    <div>
      { account==='login' ? (
        <Login
          onValueChange={onValueChange}
          login={login}
          error={error}
          loginUser={loginUser}
          toggle={toggle}
        />
      )  : (
        <SignUp
          onInputChange={onInputChange}
          signupUser={signupUser}
          error={error}
          toggle={toggle}
        />
      )
      }
    </div>
  )
}

export default Toggleaccount
