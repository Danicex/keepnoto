import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/keepnotodark.png';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';


import './All.css';


export default function CreateNotes() {
  const { userId } = useContext(AuthContext);
  const { userRefreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const colours = ['#ff2727', '#47b2fe', '#fee45b', '#9ff258', '#9253e3', '#fe842e'];
  const [title, setTitle] = useState('Untitled Document');
  const [selectedColour, setSelectedColour] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const getTextValue = (content) => {
    setNoteContent(content);
  };

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectedColor = (color) => {
    setSelectedColour(color);
    console.log(`Selected color: ${color}`);
  };

  useEffect(() => {
    const date = new Date().toLocaleDateString();
    setCurrentDate(date);
  }, []);

  const handleFiles = (e)=>{
    e.preventDefault()
    const formData = {
      'title':title,
      'body': noteContent,
      'theme': selectedColour,
    }
    axios.post(`http://localhost:3000/users/${userId}/notes`, formData)
    .then(response => {console.log(response.status)
      navigate('/homepage')
    })
    .catch(err => console.log('this is the fxxking error',err))
  }

  return (
    <div className='create-note-layout'>
      <div className="header">
        <Link to={'/homepage'} className='createpage-header-link'>
          <img src={logo} alt="Home" className='home-link' />
        </Link>
      </div>

      <div className="second1">
        <div className="select-colours">
          {colours.map((color, index) => (
            <div
              key={index}
              className='color-box'
              style={{ backgroundColor: color }}
              onClick={() => handleSelectedColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="title">
        <input
          type="text"
          value={title}
          onChange={titleChange}
          placeholder={title}
          className='title-field'
        />
        <div className="date-display">
          <p>Date: {currentDate}</p>
        </div>
      </div>

      <div className="content-area" style={{ backgroundColor: selectedColour, margin: '10px 0' }} />

      <ReactQuill value={noteContent} onChange={getTextValue} className='third1' />

      <div className="save-btn">
        <button onClick={handleFiles} className='save-btn' style={{ backgroundColor: selectedColour }}>Save</button>
      </div>
    </div>
  );
}
