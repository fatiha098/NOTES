import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css"

function Login(){

  // const [CIN, setCin] = useState('J573531');
  // const [password, setPassword] = useState('123456');
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
            navigate('/Notes')
          }

      }

      catch(error){
        console.log(error.response.data)
      }
      

      

    
  }

  return(

    <div className='logout-container'>

    
    </div>




  );

}

export default Login;