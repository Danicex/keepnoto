import axios from 'axios';
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [picture, setPicture] = useState(null)
    const { userRefreshToken, userId } = useContext(AuthContext);
    const navigate  = useNavigate()

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]);
      };
    const handleFile =(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', picture)

        axios.post(`http://localhost:3000/users/${userId}/profiles`, formData,{
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userRefreshToken}`,
              },
        })
        .then(res => {console.log(res.status)
            navigate('/homepage')
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
      <h3>Add your profile picture</h3>
      <br/>
      <input type="file" accept='image/*' onChange={handleFileChange}/>
      <button onClick={handleFile}>upload</button>
    </div>
  )
}
