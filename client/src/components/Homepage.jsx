import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/keepnotodark.png';
import { GrDocumentNotes } from "react-icons/gr";
import { LuListTodo } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import { MdEvent } from "react-icons/md";
import { Link } from 'react-router-dom';
import { MdAdd } from "react-icons/md";
import { AuthContext } from '../Auth/AuthContext';
import RenderAll from './RenderAll';
import axios from 'axios';
import './All.css';




export default function Homepage() {
  const [openNav, setOpenNav] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [greeting, setGreeting] = useState('');

  const { userId, resourceOwner } = useContext(AuthContext);
  const [query,  setQuery]  = useState('')
  const [result,  setResult]  = useState([])
  const [error,  setError]  = useState(null)
  const [loadingS,setLoadingS] = useState(false)

  const handlsearch = async (e) =>{
    e.preventDefault()
    setError(null)
    try{
      const endpoints = [
        `http://localhost:3000/users/${userId}/notes`,
        `http://localhost:3000/users/${userId}/events`,
        `http://localhost:3000/users/${userId}/todos`
      ];
      const promise = endpoints.map((endpoint)=>
      axios.get(endpoint,{
        params: {
          q: query
        }
      }))

      const response = await  Promise.all(promise);

     const combinedResults = response.flatMap(response => response.data.results);

      setResult(combinedResults)
      setLoadingS(true)
    }catch (error){ 
      setError('error fetching data')
      console.log(error)
        }
  }

  useEffect(() => {
    

    const updateGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour < 18) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateGreeting();
  }, [userId]);


  const navbar = () => {
    setOpenNav(!openNav);
  };
  const addOptions = () => {
    setOpenAdd(!openAdd);
  };
  const closeTab =()=>{
    setOpenNav(null)
  }

 

  return (
    <div className='home-layout'>
      <div className="header-home">
        <div className="logo1">
          <img src={logo} alt="" id='logo-homepage' onClick={navbar} />
          <ul className={openNav ? 'open' : 'close'} id='nav-links'>
            <button onClick={closeTab} className='close-navbar'>✖</button>
            <li><Link to={'/events'}>Events</Link></li>
            <li><Link to={'/deletenotes'}>Delete notes</Link></li>
            <li><Link to={'/updatenotes'}>Edit Notes</Link></li>
            <li><Link to={'/profile'}>profile</Link></li>
            <li><Link to={'/'}>Logout</Link></li>
          </ul>
        </div>
        <div className="search-bar">
          <input type="text" placeholder='search..' className='search-field'
          value={query} 
          onChange={(e)=>setQuery(e.target.value)}/>
          <button className='search-btn'onClick={handlsearch}>Search</button>
        </div>
        <div className="profile"></div>
      </div>

      <div className="mid">
        <div className="first">
          <h4>{greeting} {resourceOwner} </h4>
        
        </div>

        {loadingS ? (
  <div>
    {result.map((item) => (
      <div key={item.id} className='card' onClick={() => handleItemClick(item.id, item.type)}>
        <div className="card-section1">
          <h1>{item.title}</h1>
        </div>
        <div className="line" style={{ background: item.theme }}></div>
        <div className="card-section2">
          <p>{new Date(item.created_at).toLocaleString()}</p>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="second">
    <RenderAll />
  </div>
)}

      </div>
      <div className="btn">
        <div className={openAdd ? 'open1' : 'close1'}>
          <Link to="/createnote">
            <GrDocumentNotes id="add-icons" />
          </Link>
          <Link to="/createevent">
            <MdEvent id="add-icons" />
          </Link>
          <Link to="/createtodo">
          <LuListTodo  id="add-icons"/>
          </Link>
          
        </div>
        <button onClick={addOptions} className='add-btn'>
          {openAdd ? <IoMdClose className="add" /> : <MdAdd className="add" />}
        </button>
      </div>
    </div>
  );
}
