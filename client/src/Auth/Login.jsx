import React, { useContext, useState } from 'react'
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    
  };

  return (
    <div className="auth-layout">
      <form onSubmit={handleSubmit} className='auth-container'>
        <h2 className='h'>Login</h2>
        <div className="form-group">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </div>
        <div className="form-group">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </div>
        <div className="form-group">
          <p className='span'>or <Link to={'/signup'} className='l'>sign up</Link></p> <br />
          <button type="submit" className='btn'>Login</button>
        </div>
      </form>
    </div>
  )
}
