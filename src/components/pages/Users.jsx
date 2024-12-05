import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [spin, setSpin] = useState();

  const getData = async () => {
    try {
      const anim = { animation: "spin 1s linear infinite" };

      setSpin(anim);
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

  useEffect(() => {
    getData();
    setSpin({ display: "none" });
  }, []);

  return (
    <>
      <div className="spin" style={spin}></div>
      <div className="users-container">
        <Nav />
        <div className="content">
          <h3>Users Table</h3>
          <table className="table table-stripped table-hover text-center">
            <thead>
              <tr>
                <th>id</th>
                <th>Prenom</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              ))}
            </tbody>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Users;
