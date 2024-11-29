import React from 'react'
import { NavLink } from 'react-router-dom';
import logoutImg from "../assets/logout.svg"
import note from "../assets/note.svg"

function Nav(){

  return(
        <div className='nav-container'>
          <div className='cont-top'>
            <div className='logo'>
              <p>Notes <img src={note} alt="not found" className='note' /></p>
            </div>
              <nav>
                <NavLink to="/Overview">Overview</NavLink>
                <NavLink to="/users">Users</NavLink>
                <NavLink to="/notes">Notes</NavLink>
                <NavLink to="/account">Account</NavLink>
              </nav>
          </div>
          

            <div className='cont-bottom'>
              <img src={logoutImg} alt="not found"  className='logout'/>
              <NavLink to="/logout" id='logout'>logout</NavLink>
            </div>
        </div>
        


  );

}

export default Nav;