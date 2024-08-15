import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import logo from '../assets/b700df99-e5ea-43e3-b0c8-f9edba8e0edc.png';
import './EventPage.css';
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function ViewEvent() {
  const location = useLocation();
  const { id, type } = location.state || {};
  const { userId } = useContext(AuthContext);
  const [noteData, setNoteData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(response => {
        setNoteData([response.data])
        axios.get(`http://127.0.0.1:3000/users/${userId}/events/${response.data.id}/schedules`)
          .then(res => setScheduleData(res.data))
          .catch(err => console.log(err, 'an error occured'))
      })
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
    <div className='view-event-layout'>
      {noteData.map((item) => (
        <div key={item.id}  >
          <div className="first-wrap">


            <div className="header2">
              <Link to="/homepage" className="createpage-header-link">
                <img src={logo} alt="Home" className="home-link" />
              </Link>
            </div>
            <div className="con">
            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
            <button className="editnotes">

              <Link to="/edit" onClick={() => handleEdit(item.id)}>Edit
              </Link>
            </button>

            </div>
          </div>
          <br />
          
          <div className="event-section">
          <MdEvent id="event-icon-view" />
          <br />
            <div className="j" >

              <h1>{item.title}</h1>   
              <h4 style={{ background: item.theme, padding: '10px', borderRadius: '5px 5px 0 0' }}>{item.date}</h4>
            </div>

            <div className="line" style={{ background: item.theme }}></div>

            <p className='e'>
              {item.description}
            </p>
          </div>


        </div>
      ))}

      <div className="schedule-section">
        <h2 style={{ textAlign: 'center' }}>Schedules</h2>
        <div className="o">
          {scheduleData.map((data) => (
            <div className="scedule-wrap" key={data.id}>
              <ul>
                <div className='todo-hash' >
                  <h5>{data.name}</h5>
                  <h5>{data.time}</h5>
                </div>
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
