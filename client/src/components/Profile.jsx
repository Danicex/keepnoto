import axios from 'axios';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [picture, setPicture] = useState(null);
    const { userRefreshToken, userId } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImageUrl(previewUrl);
            setPicture(file);
        }
    };

    const handleFileUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profile[image]', picture); // Corrected key name for the form data

        axios.put(`http://localhost:3000/users/${userId}/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Set the correct content type
                Authorization: `Bearer ${userRefreshToken}`,
            },
        })
        .then(res => {
            console.log(res.status);
            navigate('/homepage');
        })
        .catch(err => console.log(err));
    };

    return (
        <div>
            <h3>Add your profile picture</h3>
            <br/>
            {imageUrl && <img src={imageUrl} style={{width: '40%'}} alt="Profile preview" />}  
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
}
