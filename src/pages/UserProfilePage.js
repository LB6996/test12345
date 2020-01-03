import React, { useState, useEffect } from 'react';
import { getUsers } from '../constants/api';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

const UserProfilePage = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        Axios.get(getUsers).then(response => {
            setUserData(response.data)
        })
    }, [])
    console.log(userData)

    const { id } = useParams()
    return (
        <>
        {userData(user=>(
            <>
            <img src={user.profileImage} />
            <h1>{user.username}</h1>
            </>
        ))}
        </>        
    )
}

export default UserProfilePage