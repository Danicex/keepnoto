import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './Auth/AuthContext';
import { Navigate} from 'react-router-dom';

export default function Protected({children}) {
    
   const isAuthenticated = useContext(AuthContext);


    return  isAuthenticated ? children : <Navigate to='/login'/>
    ;
}
