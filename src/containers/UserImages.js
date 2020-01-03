import React, { useEffect, useState } from 'react';
import Axios from 'axios'

import { getUserImages } from '../constants/api'


const UserImages = ({ userId }) => {
    const [userImagesData, setUserImagesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        Axios.get(getUserImages(userId)).then(response => {
            setUserImagesData(response.data)
            setIsLoading(false)
        })
    }, [])


if (isLoading === true) {
    return (
    <p>Loading...</p>
    )
}
    return (
        <>
            {userImagesData.map(img => (
            <img height={200} src={img.url} />
            ))}
        </>
    )
}

export default UserImages