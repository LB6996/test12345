import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import {
    Card,
    Button,
    CardHeader,
    CardFooter,
    CardBody,
    CardImg,
    CardText,
    Container
} from 'reactstrap';
import styled from 'styled-components';

import UserImages from '../containers/UserImages';
import { getUsers } from '../constants/api';
import MainCarousel from '../components/Carousel'

const StyledContainer = styled(Container)`
margin: 50px auto;
`
const StyledCardHeader = styled(CardHeader)`
background-color: white;
img {
    width: 50px;
    border-radius: 50%;
}
h1 {
    font-size: 1.1em;
    display: inline;
    margin: 0 20px;
}
`
const CardMain = styled(Card)`
margin: 30px 30vw 30px 5vw;
`
const StyledCardBody = styled(CardBody)`
padding: 0;
`
const StyledCardImg = styled(CardImg)`
width: 100%;
height: 100vh;
object-fit: cover;
`
const StyledCardText = styled(CardText)`
padding: 20px;
`
const StyledCardFooter = styled(CardFooter)`
background: none;
`




const Content = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        Axios.get(getUsers).then(response => {
            setUserData(response.data)
        })
    }, [])
    console.log(userData)

    return (
        <StyledContainer>
            {userData.map(user => (
                <>
                    <CardMain>
                        <StyledCardHeader>
                            <img src={user.profileImage} />
                            <h1>{user.username}</h1>
                        </StyledCardHeader>
                        <StyledCardBody>
                            {/* <StyledCardImg src="https://picsum.photos/200/300" alt="Card image cap" /> */}
                            {/* <MainCarousel */}
                            <UserImages userId={user.id} />

                            <StyledCardText>Comments</StyledCardText>
                        </StyledCardBody>
                        <StyledCardFooter>**CommentInput**</StyledCardFooter>
                    </CardMain>
                </>
            ))}
        </StyledContainer>
    )
}

export default Content