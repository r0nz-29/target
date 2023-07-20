import React from 'react'
import { API } from '../../../services/api';



const SignUp = () => {

    const sign = async() =>{
      let response = await API.userSignUp("login");
      console.log(response.data);
    }

  return (
    <div>
        <button
        onClick={() => sign()}>
            SignUp
        </button>
    </div>
  )
}

export default SignUp