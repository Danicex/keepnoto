import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import logo from '../assets/keepnotodark.png';
import { AuthContext } from '../Auth/AuthContext';
import './All.css'
import './EventPage.css';
import { useNavigate } from 'react-router-dom';

export default function ViewTodo() {
  const location = useLocation();
  const { id, type } = location.state || {};
  const { userId } = useContext(AuthContext);
  const [noteData, setNoteData] = useState([]);
  const [task, setTask] = useState([]);
  const [completed, setCompleted] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(response => {
        setNoteData([response.data]);
        setTask(response.data.task);
        setCompleted(response.data.completed);
        console.log(response.data);
      })
      .catch(err => console.log('Error:', err));
  }, [id, type, userId]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(() => navigate('/homepage'))
      .catch(err => console.log(err));
  };

  const handleEdit = (noteId) => {
    // Implement the edit function
    console.log(`Editing note with ID: ${noteId}`);
  };

  return (
    <div>
      {noteData.map((item) => (
        <div key={item.id}>
          <div className="first-wrap">
            <div className="header2">
              <Link to="/homepage" className="createpage-header-link">
                <img src={logo} alt="Home" className="home-link" />
              </Link>
            </div>
            <button className="delete" onClick={handleDelete}>Delete</button>
            <button className="editnotes">
              <Link to="/edit" onClick={() => handleEdit(item.id)}>
                Edit
              </Link>
            </button>
          </div>
          <div className="view-layout">
            <br />
            <h1>{item.title}</h1>
            <div className="line" style={{ background: item.theme }}></div>
            <br />
            <ul className='todo-list'>
              {task.map((data, index) => (
                <li key={index}> <div className='todo-hash'>
                  {data}
                  <input type="checkbox" readOnly checked={completed[index]} />
                </div>
                </li>

              ))}

            </ul>

          </div>
        </div>
      ))}
    </div>
  );
}
