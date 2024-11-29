import React, { useState } from 'react'
import loginImage from '../assets/login-img.svg'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(){

  const [CIN, setCin] = useState('J573531');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

//https://notes.devlop.tech/api

    async function handleClick(e){
      try{

          e.preventDefault();
          
          console.log(CIN, password)
          
          const resp = await axios.post("https://notes.devlop.tech/api/login", { cin: CIN, password: password })
          
          const token = resp.data.token;

          if(token){
            localStorage.setItem('token', token);
            console.log("logain success")
            navigate('/overview')
          }

      }

      catch(error){
        console.log(error.response.data)
      }
      

      

    
  }

  return(

    <div className='login-container'>

      <img src={loginImage} alt="not found" className="loginImg" />

      <form className='form'>
        <h3>Login</h3>
        <input type="text" placeholder="CIN"  required value={CIN} onChange={(e) => setCin(e.target.value)}/>
        <input type="password" placeholder='Password' required  value={password}  onChange={(e) => setPassword(e.target.value)} />
        <input type='submit'  value="Login" onClick={(e) => handleClick(e)}/>
        <NavLink to="">Update Password</NavLink>
      </form>
    </div>




  );

}

export default Login;