import React, { useEffect, useState } from 'react'
import "../styles/header.css";
import person from '../../assets/person.svg'


function Header(props){
  const [titleSearched, setTitleSearch] = useState('')
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  function searchNote(){
    // console.log(props.AllNotes);
    let searchNote = props.AllNotes.filter(note => note.title == titleSearched)
 
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
        </div>

        

    </div>
        


  );

}

export default Header;