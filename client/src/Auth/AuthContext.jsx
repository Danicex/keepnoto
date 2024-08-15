import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const [userId, setUserId]  =  useState(localStorage.getItem('user_id') || '');
    const [resorceOwner, setResourceOwner]  =  useState(localStorage.getItem('user_email') || '');
    const [userRefreshToken, setUserRefreshToken] =  useState(null)
    const [client, setClient] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user'));
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme; // Apply theme to the body
    }, [theme]);

    useEffect(() => {
        

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const prasedUserData = JSON.parse(storedUser)
            setClient(prasedUserData);
            setIsAuthenticated(true);
        }
        if (setIsAuthenticated(false)){
            navigate('/')
        }

    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3000/users/tokens/sign_in', {
                    email: email,
                    password: password,
            });
            const userData = response.data;
           
            setClient(userData);

            localStorage.setItem('user_id',userData.resource_owner.id)
            setUserId(userData.resource_owner.id)
            console.log(userData.resource_owner.id)

            setUserRefreshToken(userData.refresh_token)
            setResourceOwner(userData.resource_owner.email)
            localStorage.setItem('user_email', userData.resource_owner.email)
            console.log(userData.resource_owner.email)
            
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthenticated(true);
            navigate('/homepage');
            console.log(response.status)
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const signup = async (email, password) => {
        try {
            const credencials = {
                'email': email,
                'password': password
            }
            const response = await axios.post('http://localhost:3000/users/tokens/sign_up', JSON.stringify(credencials),
                { 
                 headers: {"Content-Type" : "application/json"},
                }
             );
            const userData = response.data;
            setClient(userData);
            setUserId(userData.resource_owner.id)
            console.log(userData.resource_owner.id)
            localStorage.setItem('user_id',  userData.resource_owner.id)

            localStorage.setItem('user_email', userData.resource_owner.email)
            setResourceOwner(response.data.resource_owner.email)
            
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthenticated(true);
           if (response.status = 422){
            navigate('/homepage')
           }
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    const logout = () => {
        setClient(null);
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        navigate('/')
    };
 
    const changeTheme = (dark)=>{
        localStorage.setItem('theme', dark)
        setTheme(dark)
        console.log('theme has been changed')
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, client, login, signup, logout, userId, userRefreshToken, changeTheme, theme, setTheme, resorceOwner}}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
