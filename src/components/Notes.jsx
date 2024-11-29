import React, { useEffect, useState } from 'react'
import Nav from './Nav.jsx'
import axios from 'axios';

function Notes(e){

    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState([]);
    const [id, setId] = useState('');
    const [active1, setActive1] = useState(false)
    const [active2, setActive2] = useState(false)
    const [display, setDisplay] = useState(false)

    async function getAllNotes(e){
      try{

        setActive2(false);
        setActive1(true);

        const token = localStorage.getItem('token');

        const resp = await axios.get("https://notes.devlop.tech/api/notes",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        setNotes(resp.data)

        
      }
      catch(error){
        console.log(error.message);
      }
    }


    async function searchBtn() {
    

      const token = localStorage.getItem('token');

        const resp = await axios.get("https://notes.devlop.tech/api/notes",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })


        setNote(resp.data.filter(notes => notes.id == id))

        setDisplay(true)
    }
    function getNoteById(e){

      e.target.classList.toggle('active-span');
      setActive2(true)
      setActive1(false)
      
      

    }

  return(

    <div className='notes-container'>
        <Nav />

        <div className="content">
          <div className="operations">
            <span onClick={getAllNotes}>Get all notes</span>
            <span onClick={getNoteById}>Get note by id</span>
            <span>Creact Note</span>
            <span>Update Note</span>
            <span>Delete Note</span>
          </div>
          
        {active1 &&
          <table className="table table-stripped table-hover text-center">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Content</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>is owner</th>
                    <th>shared with</th>
                  </tr>
                </thead>
                <tbody>
                  
                  
                    {notes.map((note, index) => <tr key={index}> 
                                                <td>{note.id}</td>
                                                <td>{note.title}</td>
                                                <td>{note.content}</td>
                                                <td>{(note.date)}</td>
                                                <td>{(note.is_owner)}</td>
                                                <td>{(note.shared_with)}</td>
                                            </tr>)}
                </tbody>
            </table>
          }


                        {active2 && 
                                <>
                                <div>
                                  <input type="text" onChange={e => setId(e.target.value)} />
                                  <input type="submit"  value="search" onClick = {() => searchBtn()}/>
                                </div>

                                {display && 
                                <table className="table table-stripped table-hover text-center">
                                      <thead>
                                        <tr>
                                          <th>id</th>
                                          <th>Content</th>
                                          <th>Title</th>
                                          <th>Date</th>
                                          <th>owner</th>
                                          <th>shared_with</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      
                                          {note.map((n, index) => 
                                                      <tr key={index}> 
                                                          <td>{n.id}</td>
                                                          <td>{n.title}</td>
                                                          <td>{n.content}</td>
                                                          <td>{(n.date)}</td>
                                                          <td>{(n.is_owner)}</td>
                                                          <td>{(n.shared_with)}</td>
                                                      </tr> 
                                                      )}
                                      </tbody>
                                  </table>
                                  }
                                
    
                                </>

                  } 
        </div>
    </div>

  );

}

export default Notes;