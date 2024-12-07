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
  const [idNoteEdited, setIdNoteEdited] = useState(0);
  const [loading, setLoading] = useState(false);
  const [titleEdited, setTitleEdited] = useState('');
  const [contentEdited, setContentEdited] = useState('');


  


  async function getAllNotes() {

    setLoading(true);

    try {

      const token = localStorage.getItem('token');

      const resp = await axios.get("https://notes.devlop.tech/api/notes", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setNotes(resp.data);

      setLoading(false);

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


      if(noteTitle.value === '' && noteContent.value === ''){

          warning[0].style.display = "block";
          warning[1].style.display = "block";
          noteTitle.style.border = '1.9px solid red'
          noteContent.parentNode.style.border = '1.9px solid red'

      }else{
        console.log('shared with list : ',shared_with)
        setNotes(n => [...n, {title, content, shared_with}])

        const token = localStorage.getItem('token');
        console.log('shared wiithhh: ', shared_with)
        const resp = await axios.post("https://notes.devlop.tech/api/notes",{title: title, content: content, shared_with: shared_with },
        {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        )

        console.log(resp.data)
        getAllNotes()
        

        setSharedWithArray([]);

        document.getElementById('pop-up-add-note').style.visibility = "hidden";
        document.getElementById('selectUsers').style.visibility = "hidden";
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
    document.getElementById('selectUsers').style.visibility = "hidden";
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


  // function getColor(e){
  //   const color = e.target.getAttribute("value")

  //   setNotecolor(color)

  // }

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
      console.log(resp.data);
      setTimeout(() => {
        succussPopup.style.visibility = 'hidden'
        succussPopup.style.top = '-10%';
      }, 3000);

    }catch(error){
      console.log(error.message);
    }
  }


  function handleSharedWith(e){
    
      const user = users.filter(u => u.id == e.target.getAttribute('value'));
    // console.log(e.target.getAttribute('value'))
      if(!shared_with.includes(user[0].id))
      setSharedWithArray(s => [...s, user[0].id])

      console.log(shared_with)

  }

  function handleSharedWithIcon(e){

      e.target.parentNode.previousElementSibling.classList.toggle('show')
  }
// handle edit
  async function handleEditNote(e){
    console.log('hhhhh')
    try{

      e.preventDefault();
      
      let noteTitle = document.getElementById('inputTitle');
      let noteContent = document.getElementById('inputContent');
      let warning = document.querySelectorAll('.warning');

      console.log('id --> ', idNoteEdited)
      
      console.log("title efidted: ",titleEdited);

        console.log('shared with list : ',shared_with)
        setNotes(n => [...n, {titleEdited, contentEdited, shared_with}])

        const token = localStorage.getItem('token');
        

        const resp = await axios.put(`https://notes.devlop.tech/api/notes/${idNoteEdited}`,{title: titleEdited, content: contentEdited, shared_with: shared_with },
        {
          headers: {
          'Authorization': `Bearer ${token}`
          }
        }
        )
        getAllNotes()
        console.log(resp.data)
        
        setSharedWithArray([]);

        document.getElementById('pop-up-edit-note').style.visibility = "hidden";
        document.getElementById('selectUsers').style.visibility = "hidden";
        noteTitle.value = ''
        noteContent.value = '';
        warning[0].style.display = "none";
        warning[1].style.display = "none";
        noteTitle.style.border = '1.9px solid pink'
        noteContent.parentNode.style.border = '1.9px solid pink'

        const succussPopup = document.getElementById('updated-success');
        succussPopup.style.visibility = 'visible'
        succussPopup.style.top = '2%';

        setTimeout(() => {
          succussPopup.style.visibility = 'hidden'
          succussPopup.style.top = '-10%';
        }, 3000);
      
      
  }catch(error){
    console.log(error.request)
  }

  }

  function EditNote(e){
    document.getElementById('pop-up-edit-note').style.visibility = "visible";
    document.getElementById('inputTitle').readOnly = false;
    getUsers()
    console.log(e.target.getAttribute('value'))
    setIdNoteEdited(e.target.getAttribute('value'))

    const title = e.target.parentNode.previousElementSibling.innerHTML
    const content = e.target.parentNode.parentNode.nextElementSibling.innerText
    setTitleEdited(title)
    setContentEdited(content)
    
  
  }

  function btnCancelEdit(){
    document.getElementById('pop-up-edit-note').style.visibility = "hidden";
    document.getElementById('selectUsers').style.visibility = "hidden";
  }

  function showSelectUsers(){
    document.getElementById('selectUsers').style.visibility = 'visible'
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
      
        <div>
            {loading && <div className="spinner"></div>} 
          
    </div>
          <h3>My Notes</h3>
          <div className="notes-content">
          <div className="notes" >
            {searchNote.length !== 0 && notes ? (
              notes.map((note, index) => {

                  {
                    

                    // const s = (searchNote[0].title === note.title) ? (document.getElementById(`${index}`).style.background = 'green') : ''  
                    const s = searchNote.map(ser => {
                      if(ser.title == note.title){
                        return document.getElementById(`${index}`).style.border = '1.9px solid #000'
                      } else{
                        return '';
                      }
                      })
                    
                    setTimeout(() => {

                      searchNote.map(ser => {
                        if(ser.title == note.title){
                          return document.getElementById(`${index}`).style.border = '1.9px solid transparent'
                        } else{
                          return '';
                        }
                        })
                      
                      

                    }, 1500);
                  }
                  return <div className="note" id={index} key={index} style={{background: index % 3 === 0 ? '#dff2ff': index % 2 === 0 ? '#ffd7d5' : '#fff6ca'}} >
                          
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
                  
                  return <div className="note" id={index} key={index} style={{background: index % 3 === 0 ? '#dff2ff': index % 2 === 0 ? '#ffd7d5' : '#fff6ca'}} >
                            {note.date &&  <p className="note-date">{note.date.slice(0, 10).replaceAll('-', '/')}</p>}
                            <div className="note-title">
                              <p>{note.title}</p>
                              <div>
                                <i className="fa-solid fa-square-pen edit-icon" value={note.id} onClick={EditNote}></i>
                                <i className="fa-regular fa-trash-can" value="" id={note.id} onClick={deleteNote}></i>
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
                  <label onClick={showSelectUsers}>Shared With</label>
                  <div name="" id="selectUsers" size="1" multiple>
                  {users.map((user, index) => 
                              {return <option value={user.id} key={index} className='optionUser' onClick={handleSharedWith}>
                                            {user.first_name} {user.last_name}
                                      </option> 
                    })}
                  </div>
                  <input type="button" value="Add" className="add-btn" onClick={btnAdd}  />
                  <input type="button" value="Cancel" className="cancel-btn" onClick={btnCancel}  />
          </form>

          <form className="pop-up-add-note" id="pop-up-edit-note">
                  <h2>Edit You Note</h2>
                  <input type="text" id='inputTitle' placeholder="title" value={titleEdited} onChange={e => setTitleEdited(e.target.value)}/>
                  <p className="warning">Please enter a note's title</p>
                  <label >
                    <textarea name="" id='inputContent'  placeholder="Note Content" value={contentEdited}  onChange={e => setContentEdited(e.target.value)}/>
                    
                  </label>
                  <p className="warning">Please enter a note's title</p>
                  <label onClick={showSelectUsers}>Shared With </label>
                  <div name="" id="selectUsers" size="1" multiple>
                  {users.map((user, index) => 
                              {return <option value={user.id} key={index} className='optionUser' onClick={handleSharedWith}>
                                            {user.first_name} {user.last_name}
                                      </option> 
                    })}
                  </div>
                  
                  <input type="button" value="Edit" className="add-btn" onClick={handleEditNote}  />
                  <input type="button" value="Cancel" className="cancel-btn" onClick={btnCancelEdit}  />
          </form>
          </div>
          
        </div>
      </div>

  );
}

export default Notes;
