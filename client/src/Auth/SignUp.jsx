import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import './Auth.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { signup } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password !==  passwordConfirmation){
      alert("password  don't match")
    }
    return signup(email, password, passwordConfirmation)
  }

  return (
    <div className="auth-layout">
    <form onSubmit={handleSubmit} className='auth-container'>
      <h2 className='h'>Sign up</h2>
      <div className="form-group">
      <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} /> 
      </div>
      <div className="form-group">
      <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} /> 
      </div>
      <div className="form-group">
      <input type="password" placeholder='confirm Password' value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
      </div>
      <div className="form-group">
      <button type='submit' className='btn'>Sign up</button> <br />
      <p style={{textAlign:'center'}}>or <Link to={'/login'} style={{color:'blue'}}>login</Link></p>
      </div>
    </form>
    </div>
  )
}
