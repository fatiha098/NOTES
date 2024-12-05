import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/notes.css';
import Nav from "./Nav";
import Header from "./Header";
import success from '../../assets/success.svg';


function Notes() {

  const [notes, setNotes] = useState([]);
  const [searchNote, setSearchNote] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState([]);
  const [noteColor, setNotecolor] = useState("");
  const [shared_with, setSharedWithArray] = useState([])


  


  async function getAllNotes() {
    try {

      const token = localStorage.getItem('token');

      const resp = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotes(resp.data);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllNotes()

  }, [])

  async function btnAdd(e){
    try{

      e.preventDefault();
      
      let noteTitle = document.getElementById('inputTitle');
      let noteContent = document.getElementById('inputContent');
      let warning = document.querySelectorAll('.warning');


      if(noteTitle.value == '' && noteContent.value == ''){

          warning[0].style.display = "block";
          warning[1].style.display = "block";
          noteTitle.style.border = '1.9px solid red'
          noteContent.parentNode.style.border = '1.9px solid red'

      }else{
        console.log('shared with list : ',shared_with)
        setNotes(n => [...n, {title, content, shared_with}])

        const token = localStorage.getItem('token');

        const resp = await axios.post("https://notes.devlop.tech/api/notes",{title: title, content: content, shared_with: shared_with },
        {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        )

        console.log(resp.data)
        

        setSharedWithArray([]);

        document.getElementById('pop-up-add-note').style.visibility = "hidden";
        noteTitle.value = ''
        noteContent.value = '';
        warning[0].style.display = "none";
        warning[1].style.display = "none";
        noteTitle.style.border = '1.9px solid pink'
        noteContent.parentNode.style.border = '1.9px solid pink'

        const succussPopup = document.getElementById('created-success');
        succussPopup.style.visibility = 'visible'
        succussPopup.style.top = '2%';

        setTimeout(() => {
          succussPopup.style.visibility = 'hidden'
          succussPopup.style.top = '-10%';
        }, 3000);

        
      }
      

      
      
      
  }catch(error){
    console.log(error.message)
  }

}

  function addNote(){
    document.getElementById('pop-up-add-note').style.visibility = "visible";
    getUsers()
  }

  function btnCancel(){
    document.getElementById('pop-up-add-note').style.visibility = "hidden";
  }

  // get all users function Users() {
  async function getUsers() {
    try {
      const token = localStorage.getItem("token");

      const resp = await axios.get("https://notes.devlop.tech/api/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(resp.data);

    } catch (error) {
      console.log("====================================");
      console.log(error.message);
      console.log("====================================");
    }
  };


  function getColor(e){
    const color = e.target.getAttribute("value")

    setNotecolor(color)

  }

  function searchNot(noteSearch){

    setSearchNote(noteSearch)
    setTimeout(() => {
      console.log(searchNote)
      
    }, 3000);

  }
  
  

  async function deleteNote(e){
    try {
      const token = localStorage.getItem("token");

      const id = e.target.getAttribute('id');
      const elem = document.getElementById(`${id}`);

      elem.parentNode.parentNode.parentNode.remove()
      

      const resp = await axios.delete(`https://notes.devlop.tech/api/notes/${id}`, {
  
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })

      const succussPopup = document.getElementById('deleted-success');
      succussPopup.style.visibility = 'visible'
      succussPopup.style.top = '2%';

      setTimeout(() => {
        succussPopup.style.visibility = 'hidden'
        succussPopup.style.top = '-10%';
      }, 3000);

    }catch(error){
      console.log(error.message);
    }
  }


  function handleSharedWith(e){
    
//     const ids = users.map(user => user.id)
// console.log('ids----',ids)
//     for(let i = 0 ; i < shared_with.length ; i++){
//       if(shared_with[i].id != e.target.id){
//         const user = users.filter(u => u.d == e.target.id);
//         console.log('-----user shared with',user);
//         setSharedWithArray(s => [...s, user])
//       }
//     }

      const user = users.filter(u => u.id == e.target.value);

      if(!shared_with.includes(user[0].id))
      setSharedWithArray(s => [...s, user[0].id])

      console.log(shared_with)

  }

  function handleSharedWithIcon(e){

      e.target.parentNode.previousElementSibling.classList.toggle('show')
    

  }



  return (
    

      <div className="body">
          <div id="created-success">
            <img src={success} alt="not found" className='success-img' />
            <p>Created successfully</p>
        </div>
        <div id="deleted-success">
            <img src={success} alt="not found" className='success-img' />
            <p>Deleted successfully</p>
        </div>
        <div id="updated-success">
            <img src={success} alt="not found" className='success-img' />
            <p>Updated successfully</p>
        </div>

        <Nav/>
        <Header AllNotes = {notes} func = {searchNot}/>
        <div className="notes-container">
          <h3>Recent Folders</h3>
          <ul className="list-times ">
            <li>Today</li>
            <li>This Week</li>
            <li>This Month</li>
          </ul>
          <div className="notes-content">
          <div className="notes" >
          {/* style={{ background: index == notes.length -1 ? noteColor : '' }} */}
          {/* style={{background: searchNote[index].id == note.id ? 'red' : ''}} */}
            {searchNote.length != 0 && notes? (
              notes.map((note, index) => {

                  {

                    const s = (searchNote[0].title == note.title) ? (document.getElementById(`${index}`).style.background = '#ffffa3') : ''  
                  
                  }
                  return <div className="note" id={index} key={index}>
                    
                            {note.date &&  <p className="note-date">{note.date.slice(0, 10).replaceAll('-', '/')}</p>}
                            <div className="note-title">
                              <p>{note.title}</p>
                              <div>
                                <i className="fa-solid fa-square-pen edit-icon"></i>
                                <i className="fa-regular fa-trash-can" value="kkk" id={note.id} onClick={deleteNote}></i>
                              </div>
                            </div>
                            <p className="note-content">{note.content}</p>
                            <div className="list-shared-with-users">
                              <p>Shared with</p>
                                
                              {note.shared_with.map((user, index) => <p key={index}>{user.first_name} {user.last_name}</p>)}
                          
                            </div>
                            <div className="listUsers" onClick={handleSharedWithIcon}>
                              <i className="fa-regular fa-share-from-square share-icon"></i>
                            </div>
                          </div>
              }
              )
            
            )
              : (
                notes.map((note, index) => {
                  
                  return <div className="note" id={index} key={index}  >
                            {note.date &&  <p className="note-date">{note.date.slice(0, 10).replaceAll('-', '/')}</p>}
                            <div className="note-title">
                              <p>{note.title}</p>
                              <div>
                                <i className="fa-solid fa-square-pen edit-icon"></i>
                                <i className="fa-regular fa-trash-can" value="kkk" id={note.id} onClick={deleteNote}></i>
                              </div>
                            </div>
                            <p className="note-content">{note.content}</p>
                            <div className="list-shared-with-users">
                              <p>Shared with</p>
                                
                              {note.shared_with.map((user, index) => <p key={index}>{user.first_name} {user.last_name}</p>)}
                          
                            </div>
                            <div className="listUsers" onClick={handleSharedWithIcon}>

                              <i className="fa-regular fa-share-from-square share-icon"></i>

                            </div>
                          </div>
                })
              )
}

          </div>
          <div className="new-note" onClick={addNote}>
                <div>
                  <i className="fa-solid fa-square-pen edit-icon"></i>
                  <p>Add Note</p>
                </div>
            </div>

          <form className="pop-up-add-note" id="pop-up-add-note">
                  <h2>Add You Note</h2>
                  <input type="text" id='inputTitle' placeholder="title" onChange={e => setTitle(e.target.value)}/>
                  <p className="warning">Please enter a note's title</p>
                  <label >
                    <textarea name="" id='inputContent'  placeholder="Note Content" onChange={e => setContent(e.target.value)}/>
                    
                  </label>
                  <p className="warning">Please enter a note's title</p>
                  <label>Shared With
                  <div name="" id="selectUsers" size="1" multiple>
                  {users.map((user, index) => 
                              {return <option value={user.id} key={index} className='optionUser' onClick={handleSharedWith}>
                                            {user.first_name} {user.last_name}
                                      </option> 
                    })}
                  </div>

                  </label>
                  
          
                  <label className="label-color">
                    <p>Personalize your note: </p>
                  <ul className='colors'>
                      <li><div className='color  yellow' value='#ffffa3'  onClick={getColor}></div></li>
                      <li><div className='color pink' value='#FFB2A6' onClick={getColor}></div></li>
                      <li><div className='color blue' value='#b8e6ff99' onClick={getColor}></div></li>
                      <li><div className='color green' value='#80ed99' onClick={getColor}></div></li>
                    </ul>
                  </label>
                  <input type="button" value="Add" className="add-btn" onClick={btnAdd}  />
                  <input type="button" value="Cancel" className="cancel-btn" onClick={btnCancel}  />
          </form>
          </div>
          
        </div>
      </div>

  );
}

export default Notes;
