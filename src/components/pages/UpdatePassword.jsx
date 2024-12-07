import axios from 'axios';
import React, { useState } from 'react'
import '../styles/updatePassword.css'
import { useNavigate } from 'react-router-dom';
import success from '../../assets/success.svg'

function UpdatePassword() {

  const [current_password, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const navigate = useNavigate();

  async function handleUpdatePassword(e){
   

    try{

        e.preventDefault();

        if (newPassword.trim(' ') != confirmNewPassword.trim(' ')) {
          console.log(newPassword)
          document.getElementById('newConfirm').style.visibility = "visible";
          document.getElementById('newConfirm').style.top = "6%";

          setTimeout(() => {
            document.getElementById('newConfirm').style.visibility = "hidden";
            document.getElementById('newConfirm').style.top = "-12%";
          }, 2000);

          return
        }
      
        if (newPassword.length != 6) {
          console.log(newPassword)
          document.getElementById('unequelPass').style.visibility = "visible";
          document.getElementById('unequelPass').style.top = "6%";

          setTimeout(() => {
            document.getElementById('unequelPass').style.visibility = "hidden";
            document.getElementById('unequelPass').style.top = "-12%";
          }, 2000);
          return 
        }
        
        const token = localStorage.getItem('token')

        // if(newPassword.trim('').length == 6 ){

        // }

        const resp = await axios.put("https://notes.devlop.tech/api/update-password", 
        {
          current_password: current_password,
          new_password: newPassword,
          new_password_confirmation: confirmNewPassword
        },
                    
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
        )
        
        console.log(resp.data)
        
        
        document.getElementById('passUpdated').style.visibility = "visible";
        document.getElementById('passUpdated').style.top = "6%";


        setTimeout(() => {
          document.getElementById('passUpdated').style.visibility = "hidden";
          document.getElementById('passUpdated').style.top = "-12%";
        }, 2000);

        
    }

    catch(error){
      
    }

}

function handleBackToLogin(){
  navigate('/')
}

function showPassword(e){
  e.target.previousElementSibling.previousElementSibling.setAttribute('type','text' );
  e.target.style.display = 'none'
  e.target.previousElementSibling.style.display = 'block'
}

function hidePassword(e){
  e.target.previousElementSibling.setAttribute('type','password' );
  e.target.style.display = 'none'
  e.target.nextElementSibling.style.display = 'block'
}


  return (
    <div className='container-c-p'>

      <div id="passUpdated">
            <img src={success} alt="not found" className='success-img' />
            <p>Updated successfully</p>
        </div>
      <div id="unequelPass">
      <i className='fa-solid fa-xmark'></i>
            <p>New Password must contain 6 caracters</p>
        </div>
      <div id="newConfirm">
            <i className='fa-solid fa-xmark'></i>
            <p>Password doesn't match</p>
        </div>
      <div className="container-change-password">

        <form className='form'>

          <h3>Change Password</h3>
          
          <input type="text" 
                  placeholder='Old Password' required   
                  value={current_password} 
                  onChange={(e) => setOldPassword(e.target.value)} />
          <div>
            <input type="password" 
                  placeholder='New Password' required    
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
            />
            <i className="fa-regular fa-eye showPassword" onClick={hidePassword}></i>
            <i class="fa-regular fa-eye-slash hidePassword " onClick={showPassword}></i>
          </div>
          <div>
            <input type="password" 
                  placeholder='Confirm Password' required  
                  value={confirmNewPassword}  
                  onChange={(e) => setConfirmNewPassword(e.target.value)} 
          />
          <i className="fa-regular fa-eye showPassword"  onClick={hidePassword}></i> 
          <i class="fa-regular fa-eye-slash hidePassword" onClick={showPassword}></i>

          </div>

          <input  type="submit" value="Updade Password" onClick={handleUpdatePassword}/> 
          <input   className="backLogin" value="< Back to login" onClick={handleBackToLogin}/> 

        </form>

        
      </div>

      </div>


    
  )
}

export default UpdatePassword;
