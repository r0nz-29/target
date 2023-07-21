import React from 'react'
import { useState,useContext} from 'react'
import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router';
import Login from './Login';
import SignUp from './SignUp';



const signupInitialVlaue = {
  email:'',
  username:'',
  password:''
}

const loginInitialVlaue = {
  username:'',
  password:''
}


const Toggleaccount = ({ isUserAuthenticated }) => {
           
    const[account,toggleaccount] = useState('login');
    const[signup,setSignup]= useState(signupInitialVlaue);
    const[login,setLogin]= useState(loginInitialVlaue);
    const[error,setError] = useState('');

    const { setAccount } = useContext(DataContext);
    
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
    if(response.isSuccess){
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({ email: response.data.email, username: response.data.username });
        isUserAuthenticated(true);
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