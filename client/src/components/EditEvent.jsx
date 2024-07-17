import React,{useContext} from 'react'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../assets/keepnotodark.png';
import './All.css';
import axios from 'axios';

export default function EditEvent() {
  const { userId } = useContext(AuthContext);
  const location = useLocation();
  const { id, type } = location.state || {};
  
  return (
    <div>
      <div className="heder">
      <div className="header2">
        <Link to="/homepage" className="createpage-header-link">
          <img src={logo} alt="Home" className="home-link" />
        </Link>
      </div>
      </div>
    </div>
  )
}
