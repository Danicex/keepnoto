import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { MdStickyNote2 } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { MdEvent } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import './All.css';


export default function RenderAll() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noteResponse, scheduleResponse, todoResponse] = await Promise.all([
          axios.get(`http://localhost:3000/users/${userId}/notes`),
          axios.get(`http://localhost:3000/users/${userId}/events`),
          axios.get(`http://localhost:3000/users/${userId}/todos`)
        ]);

        let combinedData = [
          ...noteResponse.data.map(item => ({ ...item, type: 'notes' })),
          ...scheduleResponse.data.map(item => ({ ...item, type: 'events' })),
          ...todoResponse.data.map(item => ({ ...item, type: 'todos' })),
        ];


        combinedData = combinedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        setData(combinedData);
        console.log()
        setLoading(false);
      } catch (err) {
        console.log('this is the error', err);
        setLoading(false);
      }
    };

    fetchData(setData);
  }, [userId]);

  const handleItemClick = (id, type) => {
    navigate('/viewnote', { state: { id, type } });
  }
  const handleItemClick2 = (id, type) => {
    navigate('/viewevent', { state: { id, type } });
  }
  const handleItemClick3 = (id, type) => {
    navigate('/viewtodo', { state: { id, type } });
  }

  if (loading) return <div className='loading'>data is loading...</div>;

  return (
    <div className='wrap-all-notes' key={1}>
     

      {data.map((item) => (
        <>
          {item.type === 'notes' && (
            <div className='card' key={item.id} onClick={() => handleItemClick(item.id, item.type)}>
              <div className="card-section1">
                <h1>{item.title}</h1>
                <MdStickyNote2 id='note-icon' />
              </div>
              <div className="line" style={{ background: item.theme }}></div>
              <div className="card-section2">
                <p>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
          {item.type === 'events' && (
            <div className='card' key={item.id} onClick={() => handleItemClick2(item.id, item.type)}>
              <div className="card-section1">
                <h1>{item.title}</h1>
                <MdEvent id='note-icon' />
              </div>
              <div className="line" style={{ background: item.theme }}></div>
              <div className="card-section2">
                <p>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
          {item.type === 'todos' && (
            <div className='card' key={item.id} onClick={() => handleItemClick3(item.id, item.type)}>
              <div className="card-section1">
                <h1>{item.title}</h1>
                <LuListTodo id='note-icon' />
              </div>
              <div className="line" style={{ background: item.theme }}></div>
              <div className="card-section2">
                <p>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </>
      ))}
    </div>
  );
}
