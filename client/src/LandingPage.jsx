import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/keepnotodark.png'
import  heroimag from './assets/keepnotohomeimg.png';
import { GrDocumentNotes } from "react-icons/gr";
import { MdEvent } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import './App.css'

export default function LandingPage() {
  return (
    <div className='landing-page-layout'>
      <div className="landing-header">
        <img src={logo} alt="logo" className='header-logo' />
        <nav>
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
        <img src={heroimag} alt="" className="hero-img" />
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