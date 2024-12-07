import "./App.css";
import React from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
// import Users from './components/Users';
import Notes from "./components/pages/Notes";
import UpdatePassword from "./components/pages/UpdatePassword";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Notes" element={<Notes />}></Route>
          <Route path="/UpdatePassword" element={<UpdatePassword />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
