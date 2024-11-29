import './App.css';
import React from 'react';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Overview from './components/Overview';
import Users from './components/Users';
import Notes from './components/Notes';



function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Overview" element={<Overview/>}></Route>
          <Route path="/Users" element={<Users/>}></Route>
          <Route path="/Notes" element={<Notes/>}></Route>
        </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
