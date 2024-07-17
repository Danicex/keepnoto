import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { AuthContext } from '../Auth/AuthContext';

export default function View() {
  const [data, setData] = useState([]);
  const { userId } = useContext(AuthContext);
  const location = useLocation();
  const { id, type } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === 'events') {
          const urls = [
            `http://127.0.0.1:3000/users/${userId}/${type}/${id}`,
            `http://127.0.0.1:3000/users/${userId}/${type}/${id}/schedules`,
          ];

          const [response1, response2] = await Promise.all(urls.map(url => axios.get(url)));
          setData({ event: response1.data, schedules: response2.data });
        } else {
          const response = await axios.get(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`);
          setData(Array.isArray(response.data) ? response.data : [response.data]); // Ensure data is an array
        }
      } catch (error) {
        console.log(error, 'an error occurred');
      }
    };

    fetchData();
  }, [userId, type, id]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:3000/users/${userId}/${type}/${id}`)
      .then(() => {
        navigate('/homepage');
      })
      .catch(error => console.log(error, 'an error occurred'));
  };

  const handleEdit = (id, type) => {
    navigate('/edit', { state: { id, type } });
  };

  return (
    <div>
      {Array.isArray(data) && data.map((item) => (
        <div key={id}>
          {type === 'notes' && (
            <div className="render-note-layout">
              <div className="delete">
                <button onClick={() => handleEdit(item.id, type)}>Edit</button>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Delete</button>
              </div>
              <p>{item.title}</p>
              <ReactQuill value={item.body} readOnly={true} theme="bubble" />
            </div>
          )}
          {type === 'events' && (
            <div className="render-event-layout">
              <div className="event-first">
                <p>{item.title}</p>
                <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Delete</button>
              </div>
              <p>{item.date}</p>
              <p>{item.description}</p>
              <div className="event-schedule">
                <ul>
                  <li>{item.name}</li>
                  <li>{item.time}</li>
                </ul>
              </div>
            </div>
          )}
          {type === 'user_todos' && (
            <div className="render-todo-layout">
              <button onClick={() => handleDelete(item.id)} style={{ color: 'red' }}>Delete</button>
              <p>{item.title}</p>
              <ul>
                <div>
                  <li>{item.task}</li>
                  <li>{item.completed}</li>
                </div>
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
