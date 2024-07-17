import React, { useState, useContext} from 'react';
import axios from 'axios';
import './EventPage.css';
import logo from '../assets/keepnotodark.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './All.css';

export default function CreateEvent() {
  // Credentials
  const { userRefreshToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  //location co-ordinate 

  // Event state
  const colours = ['#ff2727', '#47b2fe', '#fee45b', '#9ff258', '#9253e3', '#fe842e'];
  const [selectedColour, setSelectedColour] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateValue, setDateValue] = useState('');

  // Schedule state
  const [scheduleName, setScheduleName] = useState([{ id: 1, value: '' }]);
  const [scheduleTime, setScheduleTime] = useState([{ id: 1, value: '' }]);

  //

  const handleAddInput = () => {
    const newId = scheduleName.length > 0 ? scheduleName[scheduleName.length - 1].id + 1 : 1;
    setScheduleName([...scheduleName, { id: newId, value: '' }]);
    setScheduleTime([...scheduleTime, { id: newId, value: '' }]);
  };

  const handleNameChange = (id, event) => {
    const newScheduleName = scheduleName.map(input => 
      input.id === id ? { ...input, value: event.target.value } : input
    );
    setScheduleName(newScheduleName);
  };

  const handleTimeChange = (id, event) => {
    const newScheduleTime = scheduleTime.map(input => 
      input.id === id ? { ...input, value: event.target.value } : input
    );
    setScheduleTime(newScheduleTime);
  };

  const handleRemove = (id) => {
    setScheduleName(scheduleName.filter(input => input.id !== id));
    setScheduleTime(scheduleTime.filter(input => input.id !== id));
  };

  const handleSelectedColor = (color) => {
    setSelectedColour(color);
    console.log(`Selected color: ${color}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
        title: title,
        'date': dateValue,
        "description": description,
        'theme': selectedColour,
  
    };
    const scheduleFormData = {
      schedules: scheduleName.map((name, index) => ({
        'name': name.value,
        'time': scheduleTime[index].value
      }))
    };

    axios.post(`http://127.0.0.1:3000/users/${userId}/events/`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userRefreshToken}`,
      },
    })
    .then(response => {
      const eventId = response.data.id;

      return axios.post(`http://localhost:3000/users/${userId}/events/${eventId}/schedules`, scheduleFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userRefreshToken}`,
        },
      });
    })
    .then(scheduleResponse => {
      console.log(scheduleResponse.status);
      navigate('/homepage');
    })
    .catch(error => {
      console.log(error, 'an error occurred');
    });
  };

  const addLocation =(input)=>{
    const  x = input.id
    navigate('/location',  {state: {x}})
  }

  return (
    <div className="cre-event-layout">
      <div className="header2">
        <Link to="/homepage" className="createpage-header-link">
          <img src={logo} alt="Home" className="home-link" />
        </Link>
      </div>
      <div className="create-event-layout">
        <div className="second1">
          <h5>Select a Theme:</h5>
          <div className="select-colours">
            {colours.map((color, index) => (
              <div
                key={index}
                className="color-box"
                style={{ backgroundColor: color }}
                onClick={() => handleSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="calendar-area">
          <div className="x">
            <input
              type="date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className="date-input"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title-field"
            />
          </div>
          <textarea
            name="description"
            id="des"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="des"
            placeholder="Enter description..."
          />
        </div>
        <div className="content-area" style={{ backgroundColor: selectedColour, margin: '10px 0' }} />

        <div className="schedule">
          <h4 className="heading">Schedules</h4>
          <button onClick={handleAddInput} style={{ maxWidth: '20%' }}>Add Schedule</button>
          <div className="wrap">
            {scheduleName.map((input, index) => (
              <div key={input.id} className="schedule_wrap">
                <input
                  type="text"
                  placeholder="Schedule Name"
                  value={input.value}
                  onChange={(event) => handleNameChange(input.id, event)}
                  id='schedule-name'
                />
                <input
                  type="time"
                  placeholder="Schedule Time"
                  value={scheduleTime[index].value}
                  onChange={(event) => handleTimeChange(scheduleTime[index].id, event)}
                   id='schedule-time'
                />
                <Link to={'/location'}>
                <button id='location-btn'>add loction</button></Link>
                <button onClick={() => handleRemove(input.id)} id='remove'>×</button>
              </div>
            ))}
          </div>
        </div>
       
        <div className="submit-btn">
          <button onClick={handleSubmit} style={{ backgroundColor: selectedColour }}>Save</button>
        </div>
      </div>
    </div>
  );
}
