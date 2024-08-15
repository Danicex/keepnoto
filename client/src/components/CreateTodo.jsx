import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/b700df99-e5ea-43e3-b0c8-f9edba8e0edc.png';
import { MdAdd } from "react-icons/md";
import './All.css';

export default function CreateTodo() {

  const { userId } = useContext(AuthContext);
  const { userRefreshToken } = useContext(AuthContext);
  const colours = ['#ff2727', '#47b2fe', '#fee45b', '#9ff258', '#9253e3', '#fe842e'];
  const [selectedColour, setSelectedColour] = useState(null);
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState([{ id: 1, value: '' }]);
  const [completed, setCompleted] = useState([{ id: 1, value: false }]);
  const navigate = useNavigate()


  const handleSelectedColor = (color) => {
    setSelectedColour(color);
    console.log(`Selected color: ${color}`);
  };

  const addTask = () => {
    const newTaskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    setTasks([...tasks, { id: newTaskId, value: '' }]);
    setCompleted([...completed, { id: newTaskId, value: false }]);
  };

  const handleInputChange = (id, event) => {
    const newTasks = tasks.map(task =>
      task.id === id ? { ...task, value: event.target.value } : task
    );
    setTasks(newTasks);
  };

  const handleCheckboxChange = (id, event) => {
    const newCompleted = completed.map(input =>
      input.id === id ? { ...input, value: event.target.checked } : input
    );
    setCompleted(newCompleted);
  };

  const handleRemoveInput = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setCompleted(completed.filter(input => input.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      todo: {
        title: title,
        task: tasks.map(task => task.value),
        completed: completed.map(input => input.value),
        theme: selectedColour
      }
    };

    axios.post(`http://localhost:3000/users/${userId}/todos`, formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userRefreshToken}`,
      }
    })
      .then(response => {console.log(response.status)
        navigate('/homepage')
      }
    )
      .catch(error => console.log(error, 'an error occurred'));
  };

  return (
    <div className='todo-layout'>
      <div className="header2">
        <Link to="/homepage" className="createpage-header-link">
          <img src={logo} alt="Home" className="home-link" />
        </Link>
      </div>
      <div className="second1">
        <h4>Select a Theme:</h4>
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
<br />
      <div className="todo-section">
        <div className="first">
          <input
            className='todo-title'
            type="text"
            placeholder='Untitled file'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{width:'50%'}}
          />
          <button onClick={addTask} ><MdAdd style={{fontSize: '2vw'}} /></button>
        </div>
          <br />
        <div className="content-area" style={{ backgroundColor: selectedColour, margin: '10px 0' }} />

        <div className='todo'>
          {tasks.map((task, index) => (
            <div className="todo-wrap" key={task.id}>
              <div className="jp">
                <input
                  type="text"
                  placeholder='task'
                  value={task.value}
                  onChange={(e) => handleInputChange(task.id, e)}
                  style={{width:'90%'}}
                />
                <input
                  type="checkbox"
                  checked={completed.find(input => input.id === task.id)?.value || false}
                  onChange={(e) => handleCheckboxChange(task.id, e)}
                  style={{padding:'10px'}}
                />
              </div>
              <button onClick={() => handleRemoveInput(task.id)} id='remove'>✖</button>
            </div>
          ))}
        </div>

        <button onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
}
