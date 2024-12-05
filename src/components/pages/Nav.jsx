import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import logoutMan from '../../assets/'
import "../styles/nav.css";
import {useNavigate } from 'react-router-dom';
import notesLogo from '../../assets/notesLogo.svg'


function Nav(){
  const navigate = useNavigate()

  function handleLogout(){

    try{
      
      localStorage.removeItem('token');
      console.log('log out suucess');
      navigate('/')

    }catch(error){
      console.log(error.message)
    }

  }



  return(

        <div className='nav-container'>
          <div className='cont-top'>
            <div className='logo'>
              <img src={notesLogo} alt="not found" className='notesLogo' />
              <p>BookNote</p>
            </div>
                <ul className="ul-nav">
                  <li><i className="fa-regular fa-square-plus"></i>Add New 
                    <ul className='ul-colors'>
                      <li><div className='color  yellow'></div></li>
                      <li><div className='color pink'></div></li>
                      <li><div className='color blue'></div></li>

                    </ul>
                  </li>
                  <li><i className="fa-regular fa-calendar"></i>Calendar</li>
                  <li><i className="fa-regular fa-folder"></i>Archive</li>
                  <li><i className="fa-regular fa-trash-can"></i>Trash</li>
                </ul>
          </div>
          

            <div className='cont-bottom'>
              <img src="https://img.freepik.com/premium-photo/3d-illustration-smiling-happy-man-with-laptop-sitting-armchair-cartoon-businessman-working_1022026-48039.jpg" alt="not found"  className='logout'/>
              <button to="/logout" id='logout' onClick={handleLogout}>logout</button>
            </div>


        </div>

        // </div>
        


  );

}

export default Nav;