import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="logout">
      <p >are you sure you want to logout?</p>
      <button onClick={logout} id='logout-btn-x'>Logout</button>

    </div>
);
};

export default Logout;
