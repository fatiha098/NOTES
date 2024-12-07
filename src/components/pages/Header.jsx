import React, { useEffect, useState } from 'react'
import "../styles/header.css";
import person from '../../assets/person.svg'
import { useNavigate } from 'react-router-dom';



function Header(props){
  const [titleSearched, setTitleSearch] = useState('')
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');


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

  function searchNote(){
    // console.log(props.AllNotes);
    let searchNote = props.AllNotes.filter(note => note.title.includes(titleSearched) || note.content.includes(titleSearched))
 
    console.log('serach note',searchNote)


    props.func(searchNote)

    document.getElementById('idS').value = '';

    setTitleSearch('00000')
  }

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'))
    setFirstName(user.first_name)
    setLastName(user.last_name)
 
  
  }, [first_name, last_name])

  //change password

    function handleClickUpdatePassword(){
      console.log(localStorage.getItem('token'))
    navigate('/UpdatePassword');
    
  }

  function showUserSettings(){
    document.querySelector(".user-settings").classList.toggle('show')
    // console.log(document.querySelector(".user-settings"))
  }
  

  return(
    <div className='header'>
        <h3>MY NOTES</h3>
        <div className='form'>
          <input type="text" placeholder='search'  id='idS' onChange={e => setTitleSearch(e.target.value)}></input>
          
          <div className="searchBtn" onClick={searchNote}>
            <input type="submit"  value='' onClick={searchNote} />
            <i className="fas fa-search search-icon"></i>
          </div>
          
        </div>

        <div className='user'>
          <p>{first_name+' '+last_name}</p>
            <img src={person} alt="not found" />
            <i className="fa-solid fa-bars" onClick={showUserSettings}></i>
            <div className="user-settings">
              <p className="first-p" onClick={handleClickUpdatePassword}>Update Password</p>
              <p onClick={handleLogout}>Log out</p>
              
            </div>                      
        </div>

    </div>
        


  );

}

export default Header;