import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import ReactQuill from 'react-quill';
import './EventPage.css';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/keepnotodark.png';


export default function ViewNote() {
  const location = useLocation();
  const { id, type } = location.state || {};
  const { userId } = useContext(AuthContext);
  const [noteData, setNoteData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(response => setNoteData([response.data]))
      .catch(err => console.log('Error:', err));
  }, [id, type, userId]);

  const handleDelete = (noteId) => {
    axios.delete(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(navigate('/homepage'))
      .catch(err => console.log(err))
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
            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>

            <Link to="/edit" onClick={() => handleEdit(item.id)}>
              <button className="editnotes">Edit</button>
            </Link>
          </div>


          <br />

          <h1>{item.title}</h1>

          <div className="line" style={{ background: item.theme }}></div>

          <ReactQuill readOnly={true} value={item.body} className='read-notes' />
        </div>
      ))}
    </div>
  );
}
