import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import logo from '../assets/keepnotodark.png';
import './All.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function EditNotes() {
  const { userId } = useContext(AuthContext);
  const location = useLocation();
  const { id } = location.state || {};
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/users/${userId}/notes/${id}`)
      .then(response => {
        setData(response.data);
        setTitle(response.data.title);  // Setting the title from the response
        setBody(response.data.body);    // Setting the body from the response
      })
      .catch(error => console.log(error));
  }, [userId, id]);

  const handleUpdate = () => {
    const formData = {
      title,
      body
    };

    axios.put(`http://127.0.0.1:3000/users/${userId}/notes/${id}`, formData)
      .then(() => {
        navigate('/homepage');
      })
      .catch(error => console.log(error));
  };

  return (
    <div>
      <div className="header2">
        <Link to="/homepage" className="createpage-header-link">
          <img src={logo} alt="Home" className="home-link" />
        </Link>
      </div>

      <div className="content-section">
        <div className="content">
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
          <div className="line" style={{ background: data.theme }}></div>
          <ReactQuill 
            value={body}
            onChange={setBody} 
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
}
