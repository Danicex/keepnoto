import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/b700df99-e5ea-43e3-b0c8-f9edba8e0edc.png'
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import  heroimage from './assets/keepnotohomeimg.png';
import { GrDocumentNotes } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import './App.css';
import { AuthContext } from './Auth/AuthContext';


export default function LandingPage() {
  const { theme, setTheme} =useContext(AuthContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
};

  return (
    <div id='landing-page-layout'  className={theme}>
      <div className="landing-header">
        <img src={logo} alt="logo" className='header-logo' />
        <nav>
          {theme === 'light' ? (<FaToggleOff id='theme-icon' onClick={toggleTheme}/>) : (<FaToggleOn onClick={toggleTheme} id='theme-icon'/>)}
        
           
            
          <button><Link to={'/login'}>Login</Link></button>
        </nav>
      </div>
      <div className="hero">
        <div className="main-txt">
          <h1>Keep <span style={{ color: '#7715f8' }}>N</span>oto<span style={{ color: '#7715f8' }}>.</span></h1>
          <h4>A one solution for cloud notes and scheduling app</h4>
          <p>with keepnoto, you can schedule <br />events with ease</p>
          <Link to={'/signup'}><button>Start Now</button></Link>
        </div>
        <img src={heroimage} alt="" className="hero-img" />
      </div>
      <div className="third">
        <div id="cards">
          <GrDocumentNotes  id='icons-hompage'/>
          <h4>Create Notes</h4>
        </div>
        <div id="cards">
          <MdEvent id='icons-hompage'/>
          <h4>Create Events</h4>
        </div>
        <div id="cards">
          <LuListTodo id='icons-hompage'/>
          <h4>Create Todos</h4>
        </div>
      </div>
      <div className="last"></div>
    </div>
  )
}